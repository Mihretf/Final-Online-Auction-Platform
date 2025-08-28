const express = require("express");
const router = express.Router();
const { getAllUsers, getPendingItems, getAllAuctions } = require("../controllers/adminController");
const { adminMiddleware } = require("../middleware/authMiddleware");

// Admin routes (all protected)
router.get("/users", adminMiddleware, getAllUsers);
router.get("/items/pending", adminMiddleware,getPendingItems);
router.get("/auctions", adminMiddleware, getAllAuctions);

module.exports = router;
