// services/auctionService.js
const Auction = require('../models/AuctionsModel');
const Item = require('../models/itemsModel');
const Bid = require('../models/bidModel');
const { sendWinnerEmail } = require('./mailer'); // your email module

// Helper: finalize auction when completed
async function finalizeAuction(auction) {
    if (auction.status !== 'completed') return auction;

    const topBid = await Bid.findOne({ auctionId: auction._id })
        .sort({ amount: -1 })
        .populate('bidderId');

    if (topBid) {
        auction.finalPrice = topBid.amount;
        auction.winnerId = topBid.bidderId._id;

        // Send email to winner
        try {
            await sendWinnerEmail(
                topBid.bidderId.email,
                topBid.bidderId.username,
                auction.itemId.title,
                topBid.amount
            );
            console.log("Winner email sent to:", topBid.bidderId.email);
        } catch (err) {
            console.error("Failed to send winner email:", err);
        }
    }

    await auction.save();
    return auction;
}

// Create a new auction
async function createAuction(auctionData) {
    const item = await Item.findById(auctionData.itemId);
    if (!item) throw new Error('Item not found');
    if (item.status !== 'approved') throw new Error('Item not approved');

    if (!auctionData.startTime || !auctionData.endTime)
        throw new Error('Auction must have startTime and endTime');
    if (new Date(auctionData.startTime) >= new Date(auctionData.endTime))
        throw new Error('startTime must be before endTime');

    const newAuction = await Auction.create({
        itemId: auctionData.itemId,
        startTime: new Date(auctionData.startTime),
        endTime: new Date(auctionData.endTime),
        status: new Date() >= new Date(auctionData.startTime) ? 'ongoing' : 'scheduled'
    });

    return newAuction;
}

// Get all ongoing and scheduled auctions
async function getAllAuctions() {
    const auctions = await Auction.find({
        status: { $in: ['ongoing', 'scheduled'] }
    }).populate('itemId');

    // Attach highestBid and highestBidder
    const auctionsWithBids = await Promise.all(
        auctions.map(async auction => {
            const topBid = await Bid.findOne({ auctionId: auction._id })
                .sort({ amount: -1 })
                .populate('bidderId');

            const highestBid = topBid ? topBid.amount : 0;
            const highestBidder = topBid ? topBid.bidderId : null;

            return { 
                ...auction.toObject(),
                highestBid,
                highestBidder
            };
        })
    );

    return auctionsWithBids;
}

// Get single auction by ID
async function getAuctionById(id) {
    const auction = await Auction.findById(id).populate('itemId');
    if (!auction) throw new Error('Auction not found');

    const topBid = await Bid.findOne({ auctionId: id })
        .sort({ amount: -1 })
        .populate('bidderId');

    const highestBid = topBid ? topBid.amount : auction.finalPrice || 0;
    const winnerId = auction.status === 'completed' && topBid ? topBid.bidderId._id : null;

    return { ...auction.toObject(), highestBid, winnerId };
}

// Update auction
async function updateAuction(id, updateData) {
    const auction = await Auction.findById(id).populate('itemId');
    if (!auction) throw new Error('Auction not found');

    Object.assign(auction, updateData);
    await auction.save();

    // Finalize if completed
    return finalizeAuction(auction);
}

// Delete auction
async function deleteAuction(id) {
    const auction = await Auction.findById(id);
    if (!auction) throw new Error('Auction not found');

    await Auction.deleteOne({ _id: id });
    return { message: 'Auction deleted' };
}

async function getAuctionsByBidder(userId) {
  // Get all bids by the user
  const bids = await Bid.find({ bidder: userId }).populate("auctionId");

  // Remove duplicates if the user has multiple bids on the same auction
  const auctions = [...new Map(bids.map(b => [b.auctionId._id.toString(), b.auctionId])).values()];

  return auctions; // just return the array
}

module.exports = {
    createAuction,
    getAuctionsByBidder,
    getAllAuctions,
    getAuctionById,
    updateAuction,
    deleteAuction,
    finalizeAuction, // exported so a cron job can call it
};
