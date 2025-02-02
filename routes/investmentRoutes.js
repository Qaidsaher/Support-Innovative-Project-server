 
// backend/routes/investmentRoutes.js
const express = require('express');
const router = express.Router();
const {
  addInvestment,
  editInvestment,
  displayInvestment,
  deleteInvestment,
} = require('../controllers/investmentController');
const { protect, admin } = require('../middleware/authMiddleware');

// إضافة استثمار جديد (يحتاج إلى حماية Admin)
router.post('/', protect, admin, addInvestment);

// تعديل استثمار (يحتاج إلى حماية Admin)
router.put('/:Investment_ID', protect, admin, editInvestment);

// عرض استثمار (يحتاج إلى حماية Admin)
router.get('/:Investment_ID', protect, admin, displayInvestment);

// حذف استثمار (يحتاج إلى حماية Admin)
router.delete('/:Investment_ID', protect, admin, deleteInvestment);

module.exports = router;
