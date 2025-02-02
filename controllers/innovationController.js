// backend/controllers/innovationController.js
const Innovation = require('../models/Innovation');
const Category = require('../models/Category');

// إضافة ابتكار جديد
exports.addInnovation = async (req, res) => {
  try {
    const {
      ID,
      name_innovation,
      description,
      cost,
      details_innovation,
      plain,
      Create_by,
      cate_ID,
    } = req.body;

    // التحقق من وجود الفئة
    const category = await Category.findOne({ Category_ID: cate_ID });
    if (!category) {
      return res.status(404).json({ success: false, message: 'Category not found' });
    }

    // التحقق من وجود الابتكار مسبقًا
    const existingInnovation = await Innovation.findOne({ ID });
    if (existingInnovation) {
      return res.status(400).json({ success: false, message: 'Innovation already exists' });
    }

    const innovation = new Innovation({
      ID,
      name_innovation,
      description,
      cost,
      details_innovation,
      plain,
      Create_by,
      category: category._id,
    });

    await innovation.save();
    res.status(201).json({ success: true, data: innovation });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// تعديل ابتكار
exports.editInnovation = async (req, res) => {
  try {
    const { ID } = req.params;
    const updates = req.body;

    const innovation = await Innovation.findOneAndUpdate({ ID }, updates, { new: true });

    if (!innovation) {
      return res.status(404).json({ success: false, message: 'Innovation not found' });
    }

    res.status(200).json({ success: true, data: innovation });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// حذف ابتكار
exports.deleteInnovation = async (req, res) => {
  try {
    const { ID } = req.params;

    const innovation = await Innovation.findOneAndDelete({ ID });

    if (!innovation) {
      return res.status(404).json({ success: false, message: 'Innovation not found' });
    }

    res.status(200).json({ success: true, message: 'Innovation deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// عرض ابتكار
exports.displayInnovation = async (req, res) => {
  try {
    const { ID } = req.params;

    const innovation = await Innovation.findOne({ ID }).populate('Create_by', 'first_name last_name');

    if (!innovation) {
      return res.status(404).json({ success: false, message: 'Innovation not found' });
    }

    res.status(200).json({ success: true, data: innovation });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// البحث عن ابتكار
exports.searchInnovation = async (req, res) => {
  try {
    const { name_inn } = req.query;

    const innovations = await Innovation.find({
      name_innovation: { $regex: name_inn, $options: 'i' },
    });

    res.status(200).json({ success: true, data: innovations });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
