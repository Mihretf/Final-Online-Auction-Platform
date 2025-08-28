const notificationService = require('../services/notificationService');

// Create new notification
async function createNotification(req, res) {
  try {
    const notification = await notificationService.createNotification(req.body);
    res.status(201).json(notification);
  } catch (err) {
    res.status(400).json({ error: 'Bad Request', message: err.message });
  }
}

// Get notifications for a specific user
async function getUserNotifications(req, res) {
  try {
    const notifications = await notificationService.getUserNotifications(req.params.userId);
    res.json(notifications);
  } catch (err) {
    res.status(500).json({ error: 'Server Error', message: err.message });
  }
}

// Mark notification as read
async function markAsRead(req, res) {
  try {
    const notification = await notificationService.markNotificationAsRead(req.params.id);
    res.json(notification);
  } catch (err) {
    res.status(404).json({ error: 'Not Found', message: err.message });
  }
}

// Delete notification
async function deleteNotification(req, res) {
  try {
    const result = await notificationService.deleteNotification(req.params.id);
    res.json(result);
  } catch (err) {
    res.status(404).json({ error: 'Not Found', message: err.message });
  }
}

module.exports = {
  createNotification,
  getUserNotifications,
  markAsRead,
  deleteNotification,
};
