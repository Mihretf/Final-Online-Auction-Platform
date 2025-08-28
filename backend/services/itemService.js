const Item = require('../models/itemsModel');
const Auction = require('../models/AuctionsModel');

// Create a new item
async function createItem(itemData, sellerId) {
    if (!itemData.title || !itemData.startingPrice || !itemData.category) {
        throw new Error('title, startingPrice, and category are required');
    }
    const newItem = await Item.create({ ...itemData, sellerId });
    return newItem;
}

// Get all items with optional filters
async function getAllItems(filters) {
    const query = {};
    if (filters && (filters.price || filters.maxPrice || filters.startingPrice)) {
        const max = Number(filters.price || filters.maxPrice || filters.startingPrice);
        if (!Number.isNaN(max)) {
            query.startingPrice = { $lte: max };
        }
    }
    if (filters && filters.category) {
        query.category = filters.category;
    }
    const items = await Item.find(query);
    return items;
}

// Get single item by ID and include auction info
async function getItemById(id) {
    const item = await Item.findById(id);
    if (!item) throw new Error('Item not found');
    const auction = await Auction.findOne({ itemId: id }).sort({ createdAt: -1 });
    const topCurrentPrice = item.topCurrentPrice || item.startingPrice;
    const auctionStatus = auction ? auction.status : 'No Auction';
    return { ...item.toObject(), topCurrentPrice, auctionStatus };
}

// Update an existing item
async function updateItem(id, sellerId, updateData) {
    const item = await Item.findById(id);
    if (!item) throw new Error('Item not found');
    if (item.sellerId.toString() !== sellerId) throw new Error('Unauthorized');
    const auction = await Auction.findOne({ itemId: id });
    if (auction && auction.status !== 'scheduled') {
        throw new Error('Cannot update after auction starts');
    }
    Object.assign(item, updateData);
    await item.save();
    return item;
}

// Delete an item
async function deleteItem(id, user) {
    const item = await Item.findById(id);
    if (!item) throw new Error('Item not found');
    if (item.sellerId.toString() !== user.id && user.role !== 'admin') {
        throw new Error('Unauthorized');
    }
    await Item.deleteOne({ _id: id });
    return { message: 'Item deleted' };
}

async function getMyItems(sellerId) {
    return await Item.find({ sellerId }).sort({ createdAt: -1 });
}


// Export all service functions for use in controllers
module.exports = {
    createItem,
    getAllItems,
    getItemById,
    updateItem,
    deleteItem,
    getMyItems,
};
