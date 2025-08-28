require("dotenv").config();
const mongoose = require("mongoose");
const connectDB = require("../config/db");
const User = require("../models/userModel");
const Item = require("../models/itemModel");
const Auction = require("../models/auctionModel");

(async () => {
  await connectDB();

  // Find or create user
  let user = await User.findOne({ email: "bidder@example.com" });
  if (!user) {
    user = await User.create({ role: "bidder", email: "bidder@example.com", verified: true });
    console.log("✅ Created new user");
  } else {
    console.log("✅ Using existing user");
  }

  // Create new item with timestamp to avoid duplicates
  const timestamp = Date.now();
  const item = await Item.create({ 
    sellerId: user._id, 
    title: `Test Car ${timestamp}`, 
    startingPrice: 9000, 
    status: "published" 
  });

  const now = new Date();
  const auction = await Auction.create({
    itemId: item._id,
    startTime: now,
    endTime: new Date(now.getTime() + 3600_000),
    status: "live",
    finalPrice: item.startingPrice
  });

  console.log("🎯 Test Data Created:");
  console.log(`   User ID: ${user._id.toString()}`);
  console.log(`   Item ID: ${item._id.toString()}`);
  console.log(`   Auction ID: ${auction._id.toString()}`);
  console.log(`\n📡 Test this endpoint in Postman:`);
  console.log(`   GET http://localhost:5000/api/bids/highest/${item._id.toString()}`);
  
  await mongoose.connection.close();
  process.exit(0);
})();


auction.status = "closed";
auction.winnerId = user._id; // seeded user
auction.finalPrice = 10000;
await auction.save();
