const User = require("../models/User");
const Item = require("../models/itemsModel");
const Auction = require("../models/AuctionsModel");

// Get all users
async function getAllUsers(req, res) {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

// Get all items (pending approval)
async function getPendingItems(req, res) {
  try {
    const items = await Item.find({ status: "pending" });
    res.status(200).json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

// Get all auctions
async function getAllAuctions(req, res) {
  try {
    const auctions = await Auction.find().populate("itemId");
    res.status(200).json(auctions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

module.exports = {
  getAllUsers,
  getPendingItems,
  getAllAuctions,
};
