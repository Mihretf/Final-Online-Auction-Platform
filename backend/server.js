// server.js

// 1. Load environment variables
const dotenv = require('dotenv');
dotenv.config(); // Reads .env file

// 2. Import dependencies
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db'); // Your db.js file
const itemRoutes = require('./routes/itemRoutes'); // Item API routes
const auctionRoutes = require('./routes/auctionRoutes'); // Auction API routes
const notificationsRoute = require('./routes/notification');
const path = require("path");
const checkAuctions = require('./services/auctionCron');
const http = require('http'); // Needed to attach WebSocket server
const { WebSocketServer } = require('ws');

// 3. Initialize Express app
const app = express();

// 4. Middleware
app.use(cors({
  origin: "http://localhost:3000", // React dev server
  credentials: true,
}));
app.use(express.json()); // Parse JSON request bodies

// 5. Optional: simple request logger
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// 6. Connect to MongoDB
connectDB(); // logs success or exits if fails

// 7. Mount API routes
app.use("/api/items", itemRoutes);
app.use("/api/auctions", auctionRoutes);
app.use("/api/bids", require("./routes/bidRoutes"));
app.use("/api/payments", require("./routes/paymentRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/test", require("./routes/testRoutes"));
app.use("/api/auth", require("./routes/authRoutes"));
app.use('/api/admin' , require("./routes/adminRoutes"));
app.use('/api/notifications' , notificationsRoute);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
setInterval(checkAuctions, 60 * 1000);

// 8. Default route
app.get("/", (req, res) => {
  res.status(200).json({ message: "Auction API is running..." });
});

// ---------------- WebSocket Chat ----------------

// Wrap Express app in an HTTP server so WS can share the port
const server = http.createServer(app);
const wss = new WebSocketServer({ server });

const faq = {
  bid: `💡 Bidding: To place a bid, go to the item's page, enter your amount, and confirm. Make sure your bid is higher than the current highest. All bids are binding and final once submitted.`,
  
  payment: `💳 Payments: We accept Telebirr, Chapa, or Bank Transfer. Payments should be completed within 24 hours of winning. Late payments may result in account suspension.`,
  
  telebirr: `📲 Telebirr: A mobile payment service. Instant processing and confirmation. Enter your Telebirr number and amount, then follow the app prompts to complete the payment.`,
  
  chapa: `💸 Chapa: Online payment platform for local businesses. Works with your card or mobile wallet. Confirm your payment and you'll get instant confirmation.`,
  
  bank: `🏦 Bank Transfer: You can transfer your funds to our bank account. Processing takes up to 24 hours. Make sure to include your auction ID for reference.`,
  
  car: `🚗 Cars under $10k: We have a curated list of cars like Toyota Corolla, Honda Civic, and Ford Focus. Check the listings for detailed specs and images.`,
  
  reminder: `⏰ Reminders: You can set alerts for when auctions are closing soon or when someone outbids you. Never miss a chance to win your favorite items!`,
  
  rules: `📜 Auction rules: Highest bid wins. Payments must be made within 24 hours. No bid withdrawals are allowed. Ensure you understand the rules before participating.`,
  
  outbid: `⚠️ Outbid alert: You will be notified immediately if someone places a higher bid than yours. This way, you can decide if you want to increase your bid.`,
  
  closing: `⌛ Closing soon: Some auctions are about to close. Place your final bids now to secure your items. Don't wait until the last second!`,
  
  help: `🙋 Ask me about: 'How do I bid?', 'Payment options', 'Auction rules', 'Cars under 10k', 'Reminders', 'Outbid alerts'. I can guide you step by step.`,
};


wss.on("connection", (ws) => {
  console.log("🔌 Client connected to chatbot!");
  ws.send("Welcome to Auction Buddy! 🤖 Ask about bidding, payments, cars, rules, or reminders.");

ws.on("message", (msg) => {
  const userMsg = msg.toString().toLowerCase().trim();
  let response = "🤔 I'm not sure, try asking about bidding, payments, reminders, cars, or auction rules.";

  // Match any FAQ keyword
  for (let key in faq) {
    if (userMsg.includes(key.toLowerCase())) {
      response = faq[key];
      break; // stop at first match
    }
  }

  // Always send a response
  setTimeout(() => ws.send(response), 400);
});

  ws.on("close", () => console.log("❌ Chatbot client disconnected"));
});

// 9. Global error handler
app.use((err, req, res, next) => {
  console.error("Error stack:", err.stack);
  res.status(err.status || 500).json({
    message: err.message || "Something went wrong!",
    error: process.env.NODE_ENV === "production" ? {} : err.stack,
  });
});

// 10. Start the server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
