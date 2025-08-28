const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notificationsController');

// CRUD
router.post('/', notificationController.createNotification);
router.get('/:userId', notificationController.getUserNotifications);
router.patch('/:id/read', notificationController.markAsRead);
router.delete('/:id', notificationController.deleteNotification);

module.exports = router;
