 
// backend/routes/notificationRoutes.js
const express = require('express');
const router = express.Router();
const {
  addNotification,
  sendNotification,
  deleteNotification,
} = require('../controllers/notificationController');
const { protect, admin } = require('../middleware/authMiddleware');

// إضافة إشعار جديد (يحتاج إلى حماية Admin)
router.post('/', protect, admin, addNotification);

// إرسال إشعار (يحتاج إلى حماية Admin)
router.post('/send', protect, admin, sendNotification);

// حذف إشعار (يحتاج إلى حماية Admin)
router.delete('/:notification_ID', protect, admin, deleteNotification);

module.exports = router;
