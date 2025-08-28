// services/auctionCron.js
const Auction = require('../models/AuctionsModel');
const { finalizeAuction } = require('./auctionService');

async function checkAuctions() {
    const now = new Date();

    const auctionsToComplete = await Auction.find({
        status: 'ongoing',
        endTime: { $lte: now }
    }).populate('itemId');

    for (const auction of auctionsToComplete) {
        auction.status = 'completed';
        await finalizeAuction(auction);
    }
}

module.exports = checkAuctions;
