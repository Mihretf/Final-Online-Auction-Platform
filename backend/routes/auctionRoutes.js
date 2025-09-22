const express = require('express');
const {
  createAuction,
  getAllAuctions,
  getAuctionById,
  updateAuction,
  getMyBids,
  deleteAuction,
} = require('../controllers/auctionController');
const {authMiddleware} = require('../middleware/authMiddleware'); // fixed JWT auth

const router = express.Router();

// @route   POST /api/auctions
// @desc    Create a new auction
// @access  Protected
router.post('/', authMiddleware, createAuction);

// @route   GET /api/auctions
// @desc    Get all auctions
// @access  Protected
router.get('/', getAllAuctions);

// @route   GET /api/auctions/:id
// @desc    Get auction by ID
// @access  Protected
router.get('/:id', getAuctionById);

// @route   PATCH /api/auctions/:id
// @desc    Update auction
// @access  Protected
router.patch('/:id', authMiddleware, updateAuction);

// @route   DELETE /api/auctions/:id
// @desc    Delete auction
// @access  Protected
router.delete('/:id', authMiddleware, deleteAuction);

router.get("/my-bids" , authMiddleware, getMyBids
)
router.get("/:id" , authMiddleware, getAllAuctions)

module.exports = router;
