 
// backend/routes/adminRoutes.js
const express = require('express');
const router = express.Router();
const {
  addAdmin,
  editAdmin,
  deleteAdmin,
  searchAdmin,
  controlAdmin,
} = require('../controllers/adminController');
const { protect, admin } = require('../middleware/authMiddleware');

// إضافة Admin جديد (يحتاج إلى حماية Admin)
router.post('/', protect, admin, addAdmin);

// تعديل Admin (يحتاج إلى حماية Admin)
router.put('/:Admin_ID', protect, admin, editAdmin);

// حذف Admin (يحتاج إلى حماية Admin)
router.delete('/:Admin_ID', protect, admin, deleteAdmin);

// البحث عن Admin (مفتوح)
router.get('/search', searchAdmin);

// التحكم في Admin (تغيير الحالة، يحتاج إلى حماية Admin)
router.patch('/:Admin_ID/control', protect, admin, controlAdmin);

module.exports = router;
