const express = require('express');
const router = express.Router();
const itemController = require('../controllers/itemController');
const {authMiddleware} = require('../middleware/authMiddleware');
const multer = require("multer");
const path = require("path")

// Multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage });

// All item routes are protected by authentication
router.use(authMiddleware);

// Create a new item
router.post('/', upload.fields([
  { name: "image", maxCount: 1 },
  { name: "document", maxCount: 1 }
]), itemController.createItem);

// Get all items
router.get('/', itemController.getAllItems);
router.get('/mine', itemController.getMyItems)

// Get a single item by ID
router.get('/:id', itemController.getItemById);

// Update an item
router.patch('/:id', itemController.updateItem);


// Approve an item
router.patch('/:id/approve', itemController.approveItem);

// Reject an item
router.patch('/:id/reject', itemController.rejectItem);

// Delete an item
router.delete('/:id', itemController.deleteItem);

module.exports = router;
