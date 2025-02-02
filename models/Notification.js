 
// backend/models/Notification.js
const mongoose = require('mongoose');

const NotificationSchema = new mongoose.Schema({
  notification_ID: {
    type: String,
    required: true,
    unique: true,
  },
  content_noti: {
    type: String,
    required: true,
  },
  Name_notification: {
    type: String,
    required: true,
  },
  Type: {
    type: String,
    required: true,
  },
  Receive: {
    type: String, // يمكن تحديد نوع المتلقي أو استخدام مرجع لجدول آخر
  },
});

module.exports = mongoose.model('Notification', NotificationSchema);
