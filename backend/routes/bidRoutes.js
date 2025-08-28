const express = require("express");
const router = express.Router();
const {authMiddleware} = require("../middleware/authMiddleware");
const { placeBid, getHighestForItem } = require("../controllers/bidController");

router.post("/place", authMiddleware, placeBid);
router.get("/highest/:itemId", getHighestForItem);

module.exports = router;
