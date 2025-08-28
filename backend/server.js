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
const checkAuctions = require('./services/auctionCron')


// 3. Initialize Express app
const app = express();

// 4. Middleware
app.use(cors({
  origin: "http://localhost:3000", // React dev server
  credentials: true, // if you want cookies
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
app.use('/api/admin' , require("./routes/adminRoutes"))
app.use('/api/notifications' , notificationsRoute);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
setInterval(checkAuctions, 60 * 1000);


// 8. Default route
app.get("/", (req, res) => {
  res.status(200).json({ message: "Auction API is running..." });
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
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
