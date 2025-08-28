const mongoose = require("mongoose");

const bidSchema = new mongoose.Schema(
  {
    auctionId: { type: mongoose.Schema.Types.ObjectId, ref: "Auction", required: true },
    bidderId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    amount: { type: Number, required: true },
    type: { type: String, enum: ["manual", "proxy"], default: "manual" },
    maxBid: { type: Number },
    status: { type: String, enum: ["pending", "approved", "rejected"], default: "pending" }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Bid", bidSchema);
