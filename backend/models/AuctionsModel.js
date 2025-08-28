const mongoose = require("mongoose");

// define the schema for the auctions
const auctionSchema = new mongoose.Schema({
    //reference to the item being auctioned
    itemId:{
        type: mongoose.Schema.Types.ObjectId, // object id pointing to the items model
        ref: 'Item',
        required: true,
    },
    //auction start time
    startTime:{
        type: Date, 
        required: true, 
    },
    //auction end time
    endTime:{
        type: Date,
        required: true, 
    },
    //status of the auction: scheduled, ongoing, completed
    status:{
        type: String,
        enum: ['scheduled', 'ongoing', 'completed'],
        default: 'scheduled',
    },
    //reference to the user who won the auction (optional)
    winnerId:{
        type: mongoose.Schema.Types.ObjectId, //object id pointing to the user model
        ref: 'User',
        default: null
    },
    //final price when the auction is completed
    finalPrice:{
        type: Number, 
        default: 0, 
    },
}, {timestamps: true}
);

module.exports = mongoose.model('Auction', auctionSchema)

