// controllers/auctionController.js
const auctionService = require('../services/auctionService');

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
    const auction = await auctionService.getAuctionById(req.params.id);
    res.json(auction);
  } catch (error) {
    console.error("Error fetching auction:", error);
    res.status(404).json({ message: error.message });
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


