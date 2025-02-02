 
// backend/controllers/investorController.js
const Investor = require('../models/Investor');

// إضافة مستثمر جديد
exports.addInvestor = async (req, res) => {
  try {
    const {
      investor_ID,
      first_name,
      last_name,
      Email,
      City,
      Education,
      password,
      photo,
      phone,
      birthday,
    } = req.body;

    // التحقق من وجود المستثمر مسبقًا
    const existingInvestor = await Investor.findOne({ Email });
    if (existingInvestor) {
      return res.status(400).json({ success: false, message: 'Investor already exists' });
    }

    const investor = new Investor({
      investor_ID,
      first_name,
      last_name,
      Email,
      City,
      Education,
      password,
      photo,
      phone,
      birthday,
    });

    await investor.save();
    res.status(201).json({ success: true, data: investor });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// تعديل مستثمر
exports.editInvestor = async (req, res) => {
  try {
    const { investor_ID } = req.params;
    const updates = req.body;

    // منع تعديل كلمة المرور مباشرة
    if (updates.password) {
      delete updates.password;
    }

    const investor = await Investor.findOneAndUpdate(
      { investor_ID },
      updates,
      { new: true }
    );

    if (!investor) {
      return res.status(404).json({ success: false, message: 'Investor not found' });
    }

    res.status(200).json({ success: true, data: investor });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// حذف مستثمر
exports.deleteInvestor = async (req, res) => {
  try {
    const { investor_ID } = req.params;

    const investor = await Investor.findOneAndDelete({ investor_ID });

    if (!investor) {
      return res.status(404).json({ success: false, message: 'Investor not found' });
    }

    res.status(200).json({ success: true, message: 'Investor deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// البحث عن مستثمر
exports.searchInvestor = async (req, res) => {
  try {
    const { query } = req.query;

    const investors = await Investor.find({
      $or: [
        { first_name: { $regex: query, $options: 'i' } },
        { last_name: { $regex: query, $options: 'i' } },
        { Email: { $regex: query, $options: 'i' } },
        { phone: { $regex: query, $options: 'i' } },
      ],
    });

    res.status(200).json({ success: true, data: investors });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
