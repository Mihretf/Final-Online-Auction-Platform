const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema(
  {
    auctionId: { type: mongoose.Schema.Types.ObjectId, ref: "Auction", required: true },
    payerId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    amount: { type: Number, required: true },
    status: {
      type: String,
      enum: ["pending", "completed", "failed"],
      default: "pending"
    },
    method: {
      type: String,
      enum: ["card", "bank_transfer", "paypal"],
      required: true
    },
    transactionId: { type: String } // returned from payment gateway
  },
  { timestamps: true }
);

module.exports = mongoose.model("Payment", paymentSchema);
