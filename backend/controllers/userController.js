// * Overview:
// * Handles user management actions: fetching users, updating, deleting. It does not handle password hashing or login—that’s in authController.

const User = require('../models/User'); // Import the User model
const {sendApprovalEmail} = require('../services/mailer')

// Get all users (for admin)
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password').sort({ username: 1 }); 
    // Fetch all users, exclude passwords, sort alphabetically by username
    res.status(200).json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ 
      message: 'Error fetching users',
      error: error.message 
    });
  }
};

// Get a single user by ID
exports.getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id).select('-password'); 
    // Exclude password from returned data
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ 
      message: 'Error fetching user',
      error: error.message 
    });
  }
};

// Update user (admin or user can update certain fields)
exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    // Prevent updating password here; password changes go through authController
    if (updates.password) delete updates.password;

    const updatedUser = await User.findByIdAndUpdate(
      id,
      { $set: updates },
      { new: true }
    ).select('-password'); // Exclude password in response

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({
      message: 'User updated successfully',
      user: updatedUser
    });
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ 
      message: 'Error updating user',
      error: error.message 
    });
  }
};

// Delete a user (admin only)
exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ 
      message: 'Error deleting user',
      error: error.message 
    });
  }
};
// Update user status: approve/reject
exports.updateUserStatus = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const { status } = req.body; // "approved" or "rejected"
    user.status = status;
    await user.save();

    // Send email if approved
    if (status === 'approved') {
      await sendApprovalEmail(user.email, user.username);
    }

    res.json({ message: `User status updated to ${status}`, user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
