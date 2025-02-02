 
// backend/controllers/adminController.js
const Admin = require('../models/Admin');

// إضافة Admin جديد
exports.addAdmin = async (req, res) => {
  try {
    const { Admin_ID, Name, Email, password } = req.body;

    // التحقق من وجود Admin مسبقًا
    const existingAdmin = await Admin.findOne({ Email });
    if (existingAdmin) {
      return res.status(400).json({ success: false, message: 'Admin already exists' });
    }

    const admin = new Admin({
      Admin_ID,
      Name,
      Email,
      password,
    });

    await admin.save();
    res.status(201).json({ success: true, data: admin });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// تعديل Admin
exports.editAdmin = async (req, res) => {
  try {
    const { Admin_ID } = req.params;
    const updates = req.body;

    // منع تعديل كلمة المرور مباشرة
    if (updates.password) {
      delete updates.password;
    }

    const admin = await Admin.findOneAndUpdate(
      { Admin_ID },
      updates,
      { new: true }
    );

    if (!admin) {
      return res.status(404).json({ success: false, message: 'Admin not found' });
    }

    res.status(200).json({ success: true, data: admin });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// حذف Admin
exports.deleteAdmin = async (req, res) => {
  try {
    const { Admin_ID } = req.params;

    const admin = await Admin.findOneAndDelete({ Admin_ID });

    if (!admin) {
      return res.status(404).json({ success: false, message: 'Admin not found' });
    }

    res.status(200).json({ success: true, message: 'Admin deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// البحث عن Admin
exports.searchAdmin = async (req, res) => {
  try {
    const { query } = req.query;

    const admins = await Admin.find({
      $or: [
        { Name: { $regex: query, $options: 'i' } },
        { Email: { $regex: query, $options: 'i' } },
        { Admin_ID: { $regex: query, $options: 'i' } },
      ],
    });

    res.status(200).json({ success: true, data: admins });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// التحكم في Admins (مثلاً تغيير حالة Admin)
exports.controlAdmin = async (req, res) => {
  try {
    const { Admin_ID } = req.params;
    const { state } = req.body;

    const admin = await Admin.findOneAndUpdate(
      { Admin_ID },
      { State: state },
      { new: true }
    );

    if (!admin) {
      return res.status(404).json({ success: false, message: 'Admin not found' });
    }

    res.status(200).json({ success: true, data: admin });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
