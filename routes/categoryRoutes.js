// backend/routes/categoryRoutes.js
const express = require('express');
const router = express.Router();
const {
  addCategory,
  editCategory,
  deleteCategory,
  searchCategory,
} = require('../controllers/categoryController');
const { protect, admin } = require('../middleware/authMiddleware');

// إضافة فئة جديدة (يحتاج إلى حماية Admin)
router.post('/', protect, admin, addCategory);

// تعديل فئة (يحتاج إلى حماية Admin)
router.put('/:Cate_ID', protect, admin, editCategory);

// حذف فئة (يحتاج إلى حماية Admin)
router.delete('/:Cate_ID', protect, admin, deleteCategory);

// البحث عن فئة (مفتوح)
router.get('/search', searchCategory);

module.exports = router;
