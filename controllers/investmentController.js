 
// backend/controllers/investmentController.js
const Investment = require('../models/Investment');
const Innovation = require('../models/Innovation');
const Commitment = require('../models/Commitment');

// إضافة استثمار جديد
exports.addInvestment = async (req, res) => {
  try {
    const { Investment_ID, innovation_ID, commitment_ID } = req.body;

    // التحقق من وجود الابتكار والالتزام
    const innovation = await Innovation.findOne({ ID: innovation_ID });
    const commitment = await Commitment.findOne({ Commitment_ID: commitment_ID });

    if (!innovation || !commitment) {
      return res.status(404).json({ success: false, message: 'Innovation or Commitment not found' });
    }

    // التحقق من وجود الاستثمار مسبقًا
    const existingInvestment = await Investment.findOne({ Investment_ID });
    if (existingInvestment) {
      return res.status(400).json({ success: false, message: 'Investment already exists' });
    }

    const investment = new Investment({
      Investment_ID,
      innovation: innovation._id,
      commitment: commitment._id,
    });

    await investment.save();
    res.status(201).json({ success: true, data: investment });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// تعديل استثمار
exports.editInvestment = async (req, res) => {
  try {
    const { Investment_ID } = req.params;
    const updates = req.body;

    const investment = await Investment.findOneAndUpdate(
      { Investment_ID },
      updates,
      { new: true }
    );

    if (!investment) {
      return res.status(404).json({ success: false, message: 'Investment not found' });
    }

    res.status(200).json({ success: true, data: investment });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// عرض استثمار
exports.displayInvestment = async (req, res) => {
  try {
    const { Investment_ID } = req.params;

    const investment = await Investment.findOne({ Investment_ID })
      .populate('innovation')
      .populate('commitment');

    if (!investment) {
      return res.status(404).json({ success: false, message: 'Investment not found' });
    }

    res.status(200).json({ success: true, data: investment });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// حذف استثمار
exports.deleteInvestment = async (req, res) => {
  try {
    const { Investment_ID } = req.params;

    const investment = await Investment.findOneAndDelete({ Investment_ID });

    if (!investment) {
      return res.status(404).json({ success: false, message: 'Investment not found' });
    }

    res.status(200).json({ success: true, message: 'Investment deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
