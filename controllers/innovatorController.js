// backend/controllers/innovatorController.js
const Innovator = require('../models/Innovator');

// إضافة مبتكر جديد
exports.addInnovator = async (req, res) => {
  try {
    const {
      innovator_ID,
      first_name,
      last_name,
      Email,
      City,
      Education,
      password,
      photo,
      phone,
      birthday,
      account_x,
    } = req.body;

    // التحقق من وجود المبتكر مسبقًا
    const existingInnovator = await Innovator.findOne({ Email });
    if (existingInnovator) {
      return res.status(400).json({ success: false, message: 'Innovator already exists' });
    }

    const innovator = new Innovator({
      innovator_ID,
      first_name,
      last_name,
      Email,
      City,
      Education,
      password,
      photo,
      phone,
      birthday,
      account_x,
    });

    await innovator.save();
    res.status(201).json({ success: true, data: innovator });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// تعديل مبتكر
exports.editInnovator = async (req, res) => {
  try {
    const { innovator_ID } = req.params;
    const updates = req.body;

    // منع تعديل كلمة المرور مباشرة
    if (updates.password) {
      delete updates.password;
    }

    const innovator = await Innovator.findOneAndUpdate(
      { innovator_ID },
      updates,
      { new: true }
    );

    if (!innovator) {
      return res.status(404).json({ success: false, message: 'Innovator not found' });
    }

    res.status(200).json({ success: true, data: innovator });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// حذف مبتكر
exports.deleteInnovator = async (req, res) => {
  try {
    const { innovator_ID } = req.params;

    const innovator = await Innovator.findOneAndDelete({ innovator_ID });

    if (!innovator) {
      return res.status(404).json({ success: false, message: 'Innovator not found' });
    }

    res.status(200).json({ success: true, message: 'Innovator deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// البحث عن مبتكر
exports.searchInnovator = async (req, res) => {
  try {
    const { query } = req.query;

    const innovators = await Innovator.find({
      $or: [
        { first_name: { $regex: query, $options: 'i' } },
        { last_name: { $regex: query, $options: 'i' } },
        { Email: { $regex: query, $options: 'i' } },
        { phone: { $regex: query, $options: 'i' } },
      ],
    });

    res.status(200).json({ success: true, data: innovators });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
