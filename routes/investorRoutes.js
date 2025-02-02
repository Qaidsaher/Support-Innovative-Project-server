 
// backend/routes/investorRoutes.js
const express = require('express');
const router = express.Router();
const {
  addInvestor,
  editInvestor,
  deleteInvestor,
  searchInvestor,
} = require('../controllers/investorController');
const { protect, admin } = require('../middleware/authMiddleware');

// إضافة مستثمر جديد (يحتاج إلى حماية Admin)
router.post('/', protect, admin, addInvestor);

// تعديل مستثمر (يحتاج إلى حماية Admin)
router.put('/:investor_ID', protect, admin, editInvestor);

// حذف مستثمر (يحتاج إلى حماية Admin)
router.delete('/:investor_ID', protect, admin, deleteInvestor);

// البحث عن مستثمر (مفتوح)
router.get('/search', searchInvestor);

module.exports = router;
