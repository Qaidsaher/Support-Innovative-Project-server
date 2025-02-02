 
// backend/controllers/commitmentController.js
const Commitment = require('../models/Commitment');
const Investor = require('../models/Investor');
const Innovator = require('../models/Innovator');
const Investment = require('../models/Investment');

// إضافة التزام جديد
exports.addCommitment = async (req, res) => {
  try {
    const {
      Commitment_ID,
      Conditions,
      investor_ID,
      innovator_ID,
      investment_ID,
    } = req.body;

    // التحقق من وجود المستثمر والمبتكر والاستثمار
    const investor = await Investor.findOne({ investor_ID });
    const innovator = await Innovator.findOne({ innovator_ID });
    const investment = await Investment.findOne({ Investment_ID: investment_ID });

    if (!investor || !innovator || !investment) {
      return res.status(404).json({ success: false, message: 'Investor, Innovator, or Investment not found' });
    }

    // التحقق من وجود الالتزام مسبقًا
    const existingCommitment = await Commitment.findOne({ Commitment_ID });
    if (existingCommitment) {
      return res.status(400).json({ success: false, message: 'Commitment already exists' });
    }

    const commitment = new Commitment({
      Commitment_ID,
      Conditions,
      investor: investor._id,
      innovator: innovator._id,
      investment: investment._id,
    });

    await commitment.save();
    res.status(201).json({ success: true, data: commitment });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// تعديل التزام
exports.editCommitment = async (req, res) => {
  try {
    const { Commitment_ID } = req.params;
    const updates = req.body;

    const commitment = await Commitment.findOneAndUpdate(
      { Commitment_ID },
      updates,
      { new: true }
    );

    if (!commitment) {
      return res.status(404).json({ success: false, message: 'Commitment not found' });
    }

    res.status(200).json({ success: true, data: commitment });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// عرض التزام
exports.displayCommitment = async (req, res) => {
  try {
    const { Commitment_ID } = req.params;

    const commitment = await Commitment.findOne({ Commitment_ID })
      .populate('investor', 'first_name last_name Email')
      .populate('innovator', 'first_name last_name Email')
      .populate('investment');

    if (!commitment) {
      return res.status(404).json({ success: false, message: 'Commitment not found' });
    }

    res.status(200).json({ success: true, data: commitment });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
