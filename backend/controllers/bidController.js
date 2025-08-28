const mongoose = require("mongoose");
const Bid = require("../models/bidModel");
const Auction = require("../models/AuctionsModel");
const Item = require("../models/itemsModel");
const { sendOutbidNotification } = require("../services/notificationService");

const INCREMENT = Number(process.env.BID_INCREMENT || 1);

// Helper: get current highest bid for an auction
async function getHighestBid(auctionId, session = null) {
    return Bid.findOne({ auctionId }).sort({ amount: -1 }).session(session);
}

// Helper: create a bid & update auction finalPrice
async function placeAcceptedBid({ auctionId, bidderId, amount, type, maxBid, session }) {
    const bid = await Bid.create([{ auctionId, bidderId, amount, type, maxBid, status: "pending" }], { session });
    await Auction.findByIdAndUpdate(auctionId, { finalPrice: amount }, { session });
    return bid[0];
}

// Helper: resolve proxy bid conflicts
function computeProxyClash(aMax, bMax, aIsExisting) {
    if (aMax === bMax) return { winner: aIsExisting ? "A" : "B", clearingPrice: aMax };
    const winner = aMax > bMax ? "A" : "B";
    const high = Math.max(aMax, bMax);
    const low = Math.min(aMax, bMax);
    const clearingPrice = Math.min(high, low + INCREMENT);
    return { winner, clearingPrice };
}

exports.placeBid = async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const { itemId, amount, maxAutoBid } = req.body;
        const userId = req.user?.id;

        if (!itemId) return res.status(400).json({ error: "Bad Request", message: "itemId is required" });

        const auction = await Auction.findOne({ itemId, status: "ongoing" }).session(session);
        if (!auction) {
            await session.abortTransaction();
            return res.status(400).json({ error: "Bad Request", message: "Auction not ongoing for this item" });
        }

        const highest = await getHighestBid(auction._id, session);

        // ---------- MANUAL BID ----------
        if (!maxAutoBid) {
            if (typeof amount !== "number") {
                await session.abortTransaction();
                return res.status(400).json({ error: "Bad Request", message: "amount is required for manual bids" });
            }
            if (highest && amount <= highest.amount) {
                await session.abortTransaction();
                return res.status(400).json({ error: "Bad Request", message: "Bid must be higher than current bid" });
            }

            const manual = await placeAcceptedBid({ auctionId: auction._id, bidderId: userId, amount, type: "manual", session });

            if (highest && highest.type === "proxy" && highest.maxBid >= amount + INCREMENT) {
                const autoAmount = Math.min(highest.maxBid, amount + INCREMENT);
                const autobid = await placeAcceptedBid({
                    auctionId: auction._id,
                    bidderId: highest.bidderId,
                    amount: autoAmount,
                    type: "proxy",
                    maxBid: highest.maxBid,
                    session
                });
                sendOutbidNotification({ userId, itemId });
                await session.commitTransaction();
                return res.status(201).json({
                    message: "Bid placed, but immediately outbid by proxy",
                    yourBidId: manual._id,
                    outbidBy: autobid._id,
                    status: "outbid"
                });
            }

            await session.commitTransaction();
            return res.status(201).json({ message: "Bid placed successfully", bidId: manual._id, status: "accepted" });
        }

        // ---------- PROXY BID ----------
        if (typeof maxAutoBid !== "number") {
            await session.abortTransaction();
            return res.status(400).json({ error: "Bad Request", message: "maxAutoBid must be a number" });
        }

        const item = await Item.findById(itemId).session(session);
        if (!item) {
            await session.abortTransaction();
            return res.status(400).json({ error: "Bad Request", message: "Item not found" });
        }

        const startAmount = highest ? highest.amount + INCREMENT : item.startingPrice;
        if (startAmount > maxAutoBid) {
            await session.abortTransaction();
            return res.status(400).json({ error: "Bad Request", message: "maxAutoBid is below minimum next bid" });
        }

        if (!highest || highest.type === "manual") {
            const proxyBid = await placeAcceptedBid({ auctionId: auction._id, bidderId: userId, amount: startAmount, type: "proxy", maxBid: maxAutoBid, session });
            await session.commitTransaction();
            return res.status(201).json({ message: "Proxy bid placed", bidId: proxyBid._id, status: "accepted" });
        }

        if (highest.type === "proxy") {
            const { winner, clearingPrice } = computeProxyClash(highest.maxBid, maxAutoBid, true);

            if (winner === "A") {
                if (clearingPrice > highest.amount) {
                    await placeAcceptedBid({ auctionId: auction._id, bidderId: highest.bidderId, amount: clearingPrice, type: "proxy", maxBid: highest.maxBid, session });
                }
                await Bid.create([{ auctionId: auction._id, bidderId: userId, amount: startAmount, type: "proxy", maxBid: maxAutoBid, status: "rejected" }], { session });
                sendOutbidNotification({ userId, itemId });
                await session.commitTransaction();
                return res.status(201).json({ message: "Proxy entered but outmatched by existing proxy", status: "outbid" });
            } else {
                const loserMax = highest.maxBid;
                if (clearingPrice > highest.amount) {
                    await placeAcceptedBid({ auctionId: auction._id, bidderId: highest.bidderId, amount: Math.min(loserMax, startAmount), type: "proxy", maxBid: loserMax, session });
                }
                const winningBid = await placeAcceptedBid({ auctionId: auction._id, bidderId: userId, amount: clearingPrice, type: "proxy", maxBid: maxAutoBid, session });
                await session.commitTransaction();
                return res.status(201).json({ message: "Proxy bid placed and is now highest", bidId: winningBid._id, status: "accepted" });
            }
        }

        await session.commitTransaction();
        return res.status(201).json({ message: "Bid processed" });

    } catch (err) {
        await session.abortTransaction();
        console.error("[placeBid]", err);
        return res.status(500).json({ error: "Server Error", message: err.message });
    } finally {
        session.endSession();
    }
};

// Get highest bid for an item
exports.getHighestForItem = async (req, res) => {
    try {
        const { itemId } = req.params;
        const auction = await Auction.findOne({ itemId, status: "ongoing" });
        if (!auction) return res.status(404).json({ error: "Not Found", message: "Ongoing auction not found" });
        const highest = await getHighestBid(auction._id);
        return res.json({ auctionId: auction._id, highest });
    } catch (err) {
        return res.status(500).json({ error: "Server Error", message: err.message });
    }
};
