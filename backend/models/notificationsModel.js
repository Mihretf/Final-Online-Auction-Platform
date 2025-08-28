const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    type: {
      type: String,
      enum: ['bid_outbid', 'auction_winner', 'auction_seller', 'auction_loser'],
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    read: {
      type: Boolean,
      default: false, // for marking as read later
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Notification', notificationSchema);
