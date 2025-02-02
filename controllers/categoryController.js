 
// backend/controllers/categoryController.js
const Category = require('../models/Category');

// إضافة فئة جديدة
exports.addCategory = async (req, res) => {
  try {
    const { Category_ID, Name_Category, Create_by } = req.body;

    // التحقق من وجود الفئة مسبقًا
    const existingCategory = await Category.findOne({ Category_ID });
    if (existingCategory) {
      return res.status(400).json({ success: false, message: 'Category already exists' });
    }

    const category = new Category({
      Category_ID,
      Name_Category,
      Create_by,
    });

    await category.save();
    res.status(201).json({ success: true, data: category });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// تعديل فئة
exports.editCategory = async (req, res) => {
  try {
    const { Cate_ID } = req.params;
    const updates = req.body;

    const category = await Category.findOneAndUpdate(
      { Category_ID: Cate_ID },
      updates,
      { new: true }
    );

    if (!category) {
      return res.status(404).json({ success: false, message: 'Category not found' });
    }

    res.status(200).json({ success: true, data: category });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// حذف فئة
exports.deleteCategory = async (req, res) => {
  try {
    const { Cate_ID } = req.params;

    const category = await Category.findOneAndDelete({ Category_ID: Cate_ID });

    if (!category) {
      return res.status(404).json({ success: false, message: 'Category not found' });
    }

    res.status(200).json({ success: true, message: 'Category deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// البحث عن فئة
exports.searchCategory = async (req, res) => {
  try {
    const { query } = req.query;

    const categories = await Category.find({
      $or: [
        { Name_Category: { $regex: query, $options: 'i' } },
        { Category_ID: { $regex: query, $options: 'i' } },
      ],
    });

    res.status(200).json({ success: true, data: categories });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
