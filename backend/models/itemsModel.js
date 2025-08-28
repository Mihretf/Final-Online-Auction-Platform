const mongoose = require('mongoose');

// define the schema for the items
const itemsSchema = new mongoose.Schema({

    //reference to the user who is selling the item
    sellerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    // title of the item
    title:{
        type: String, 
        required: true //must provide a title
        },
        //description of the item
    description:{
        type: String, 
        required: true
    },
    category:{
        type: String, 
        required: true, 
    }, 
    //starting price of the auction
    startingPrice:{
        type: Number,
        required: true,
    },
    //minimum reserve price(optional)
    reservePrice:{
        type: Number, 
        default: 0,
    },
    //status of the item: pending, approved, rejected
    status:{
        type: String, 
        enum:["pending", "approved", "rejected", "ongoing"], //only these values are allowed
        default: "pending",
    },
    //current highest bid, updated from Bids module
    topCurrentPrice:{
        type: Number,
        default: 0,
    },
    image: {
        type: String,
        default: ""
    }, 
    document:{
        type: String, 
        default: ""
    }
}, {timestamps: true}
);

module.exports = mongoose.model('Item', itemsSchema);

