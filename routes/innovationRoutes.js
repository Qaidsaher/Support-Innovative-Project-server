// backend/routes/innovationRoutes.js
const express = require('express');
const router = express.Router();
const {
  addInnovation,
  editInnovation,
  deleteInnovation,
  displayInnovation,
  searchInnovation,
} = require('../controllers/innovationController');
const { protect, admin } = require('../middleware/authMiddleware');

// إضافة ابتكار جديد (يحتاج إلى حماية Innovator أو Admin)
router.post('/', protect, addInnovation);

// تعديل ابتكار (يحتاج إلى حماية Innovator أو Admin)
router.put('/:ID', protect, editInnovation);

// حذف ابتكار (يحتاج إلى حماية Admin)
router.delete('/:ID', protect, admin, deleteInnovation);

// عرض ابتكار (مفتوح)
router.get('/:ID', displayInnovation);

// البحث عن ابتكار (مفتوح)
router.get('/search', searchInnovation);

module.exports = router;
