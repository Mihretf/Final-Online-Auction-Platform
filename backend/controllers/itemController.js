const itemService = require('../services/itemService');
const Item = require('../models/itemsModel');
const Auction = require('../models/AuctionsModel');

// Create a new item
async function createItem(req, res) {
    try {
        const sellerId = req.user.id; // Authenticated user ID

        const newItemData = {
            ...req.body,
            sellerId,
            image: req.files?.image?.[0]?.filename || "",
            document: req.files?.document?.[0]?.filename || ""
        };

        const newItem = await itemService.createItem(newItemData, sellerId);
        res.status(201).json({ message: 'Item added successfully', item: newItem });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

// Get all items
async function getAllItems(req, res) {
    try {
        const items = await itemService.getAllItems(req.query); // Optional query filters
        res.status(200).json(items);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

// Get single item by ID
async function getItemById(req, res) {
    try {
        const item = await itemService.getItemById(req.params.id);
        res.status(200).json(item);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

// Update an item
async function updateItem(req, res) {
    try {
        const updatedItem = await itemService.updateItem(req.params.id, req.user.id, req.body);
        res.status(200).json(updatedItem);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

// Delete an item
async function deleteItem(req, res) {
    try {
        const result = await itemService.deleteItem(req.params.id, req.user);
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

// GET /api/items/mine
async function getMyItems(req, res) {
    try {
        const sellerId = req.user.id;
        const items = await Item.find({ sellerId });
        res.status(200).json(items);
    } catch (err) {
        console.error("Error fetching seller items:", err);
        res.status(500).json({ message: err.message });
    }
}

// async function approveItems(req, res) {
//   try {
//     const item = await Item.findByIdAndUpdate(
//       req.params.id,
//       { status: 'approved' },
//       { new: true }
//     );
//     if (!item) throw new Error('Item not found');
//     res.status(200).json(item);
//   } catch (error) {
//     res.status(404).json({ message: error.message });
//   }
// }

// Reject an item
async function rejectItem(req, res) {
  try {
    const item = await Item.findByIdAndUpdate(
      req.params.id,
      { status: 'rejected' },
      { new: true }
    );
    if (!item) throw new Error('Item not found');
    res.status(200).json(item);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}

// Approve item and create auction automatically
async function approveItem(req, res) {
    try {
        const item = await Item.findById(req.params.id);
        if (!item) return res.status(404).json({ message: "Item not found" });

        // Set item to approved
        item.status = "approved";
        await item.save();

        // Create auction
        const now = new Date();
        const auctionDurationHours = 1; // Customize as needed
        const newAuction = await Auction.create({
            itemId: item._id,
            startTime: now,
            endTime: new Date(now.getTime() + auctionDurationHours * 60 * 60 * 1000),
            status: "ongoing",
            finalPrice: 0
        });

        console.log("Auction created:", newAuction);
        res.status(200).json({ message: "Item approved and auction created", item, auction: newAuction });

    } catch (err) {
        console.error("Error approving item:", err);
        res.status(500).json({ message: err.message });
    }
}

module.exports = {
    createItem,
    getAllItems,
    getItemById,
    updateItem,
    deleteItem,
    getMyItems,
    approveItem,
    rejectItem,
};
