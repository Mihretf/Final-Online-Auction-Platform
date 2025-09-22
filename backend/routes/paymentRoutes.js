const express = require("express");
const router = express.Router();
const {authMiddleware}= require("../middleware/authMiddleware");
const { initiatePayment} = require("../controllers/paymentController");

// Start payment (Chapa)
router.post("/initiate", authMiddleware, initiatePayment);

// Chapa callback
// router.get("/chapa/callback", chapaCallback);

// // Check payment status
// router.get("/:id/status", authMiddleware, getPaymentStatus);

// // Payment history
// router.get("/history", authMiddleware, getPaymentHistory);

module.exports = router;
