const express = require('express');
const { 
  getAllUsers, 
  getUserById,
  updateUser,
  deleteUser,
  updateUserStatus
} = require('../controllers/userController'); // Only management functions
const { authMiddleware, adminMiddleware } = require('../middleware/authMiddleware');

const router = express.Router();

// @route   GET /api/users
// @desc    Get all users (admin only)
router.get('/', authMiddleware, adminMiddleware, getAllUsers);

// @route   GET /api/users/:id
// @desc    Get user by ID (admin or self)
router.get('/:id', authMiddleware, getUserById);

// @route   PUT /api/users/:id
// @desc    Update user (admin or self)
router.put('/:id', authMiddleware, updateUser);

// @route   DELETE /api/users/:id
// @desc    Delete user (admin only)

router.patch("/:id/status" , authMiddleware,adminMiddleware ,updateUserStatus)
router.delete('/:id', authMiddleware, adminMiddleware, deleteUser);

module.exports = router;
