// const axios = require("axios");
// async function sendOutbidNotification({ userId, itemId }) {
//   if (!process.env.NOTIFICATIONS_URL) return;
//   try {
//     await axios.post(process.env.NOTIFICATIONS_URL, {
//       userId,
//       type: "bid_outbid",
//       message: `You were outbid on item ${itemId}`
//     });
//   } catch (err) {
//     console.warn("[notify] failed:", err.message);
//   }
// }

// module.exports = { sendOutbidNotification };
const Notification = require('../models/notificationsModel');

async function createNotification({ userId, type, message }) {
  return await Notification.create({ userId, type, message });
}

async function getUserNotifications(userId) {
  return await Notification.find({ userId }).sort({ createdAt: -1 });
}

async function markNotificationAsRead(id) {
  const notification = await Notification.findById(id);
  if (!notification) throw new Error('Notification not found');

  notification.read = true;
  await notification.save();
  return notification;
}

async function deleteNotification(id) {
  const notification = await Notification.findById(id);
  if (!notification) throw new Error('Notification not found');

  await Notification.deleteOne({ _id: id });
  return { message: 'Notification deleted' };
}

module.exports = {
  createNotification,
  getUserNotifications,
  markNotificationAsRead,
  deleteNotification,
};
