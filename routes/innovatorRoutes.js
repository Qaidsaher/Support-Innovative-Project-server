// backend/routes/innovatorRoutes.js
const express = require('express');
const router = express.Router();
const {
  addInnovator,
  editInnovator,
  deleteInnovator,
  searchInnovator,
} = require('../controllers/innovatorController');
const { protect, admin } = require('../middleware/authMiddleware');

// إضافة مبتكر جديد (يحتاج إلى حماية Admin)
router.post('/', protect, admin, addInnovator);

// تعديل مبتكر (يحتاج إلى حماية Admin)
router.put('/:innovator_ID', protect, admin, editInnovator);

// حذف مبتكر (يحتاج إلى حماية Admin)
router.delete('/:innovator_ID', protect, admin, deleteInnovator);

// البحث عن مبتكر (مفتوح)
router.get('/search', searchInnovator);

module.exports = router;
