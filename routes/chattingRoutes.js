 
// backend/routes/chattingRoutes.js
const express = require('express');
const router = express.Router();
const {
  addChat,
  editChat,
  deleteChat,
  searchChat,
} = require('../controllers/chattingController');
const { protect } = require('../middleware/authMiddleware');

// إضافة رسالة دردشة جديدة (يحتاج إلى حماية المستخدم)
router.post('/', protect, addChat);

// تعديل رسالة دردشة (يحتاج إلى حماية المستخدم)
router.put('/:ID', protect, editChat);

// حذف رسالة دردشة (يحتاج إلى حماية المستخدم)
router.delete('/:ID', protect, deleteChat);

// البحث عن رسالة دردشة (يحتاج إلى حماية المستخدم)
router.get('/search', protect, searchChat);

module.exports = router;
