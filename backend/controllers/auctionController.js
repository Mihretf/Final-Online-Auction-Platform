// controllers/auctionController.js
const auctionService = require('../services/auctionService');
const Auction = require('../models/AuctionsModel')
const Item = require("../models/itemsModel")

// Create a new auction
exports.createAuction = async (req, res) => {
  try {
    const auction = await auctionService.createAuction(req.body);
    res.status(201).json(auction);
  } catch (error) {
    console.error("Error creating auction:", error);
    res.status(400).json({ message: error.message });
  }
};

// Get all auctions
exports.getAllAuctions = async (req, res) => {
  try {
    const auctions = await auctionService.getAllAuctions();
    res.json(auctions);
  } catch (error) {
    console.error("Error fetching auctions:", error);
    res.status(400).json({ message: error.message });
  }
};

// Get single auction by ID
exports.getAuctionById = async (req, res) => {
  try {
    const auction = await Auction.findById(req.params.id)
      .populate("itemId")
      // .populate("highestBidder");
    if (!auction) return res.status(404).json({ message: "Auction not found" });
    res.json(auction);
  } catch (err) {
    console.error("Error fetching auction:", err);
    res.status(500).json({ message: "Server error" });
  }
};


// Update auction
exports.updateAuction = async (req, res) => {
  try {
    const updated = await auctionService.updateAuction(req.params.id, req.body);
    res.json(updated);
  } catch (error) {
    console.error("Error updating auction:", error);
    res.status(400).json({ message: error.message });
  }
};

exports.getMyBids = async (req, res) => {
  try {
    const userId = req.user._id; // from authMiddleware

    // Get all bids by this user, populate auction info
    const bids = await Bid.find({ bidderId: userId }).populate("auctionId");

    // Extract unique auctions
    const auctions = bids
      .map(bid => bid.auctionId)
      .filter((auction, index, self) => auction && self.findIndex(a => a._id.toString() === auction._id.toString()) === index);

    res.json(auctions);
  } catch (err) {
    console.error("Error fetching my bids:", err);
    res.status(500).json({ message: "Failed to fetch your bids." });
  }
};
// Delete auction
exports.deleteAuction = async (req, res) => {
  try {
    const result = await auctionService.deleteAuction(req.params.id);
    res.json(result);
  } catch (error) {
    console.error("Error deleting auction:", error);
    res.status(400).json({ message: error.message });
  }
};


