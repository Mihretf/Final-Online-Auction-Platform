const express = require("express");
const router = express.Router();

router.get("/", (req, res) => res.json({ ok: true, time: new Date().toISOString() }));

// Test endpoint to check if server is working
router.get("/health", (req, res) => {
  res.json({ 
    status: "healthy", 
    timestamp: new Date().toISOString(),
    message: "Auction API is running properly"
  });
});

module.exports = router;
