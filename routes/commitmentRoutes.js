 
// backend/routes/commitmentRoutes.js
const express = require('express');
const router = express.Router();
const {
  addCommitment,
  editCommitment,
  displayCommitment,
} = require('../controllers/commitmentController');
const { protect, admin } = require('../middleware/authMiddleware');

// إضافة التزام جديد (يحتاج إلى حماية Admin)
router.post('/', protect, admin, addCommitment);

// تعديل التزام (يحتاج إلى حماية Admin)
router.put('/:Commitment_ID', protect, admin, editCommitment);

// عرض التزام (يحتاج إلى حماية Admin)
router.get('/:Commitment_ID', protect, admin, displayCommitment);

module.exports = router;
