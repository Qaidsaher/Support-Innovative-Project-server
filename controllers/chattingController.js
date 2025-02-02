 
// backend/controllers/chattingController.js
const Chatting = require('../models/Chatting');
const Investor = require('../models/Investor');
const Innovator = require('../models/Innovator');

// إضافة رسالة دردشة جديدة
exports.addChat = async (req, res) => {
  try {
    const { Sender_ID, Receiver_ID, Message } = req.body;

    // التحقق من وجود المرسل والمستقبل
    const sender = await Investor.findOne({ investor_ID: Sender_ID }) || await Innovator.findOne({ innovator_ID: Sender_ID });
    const receiver = await Investor.findOne({ investor_ID: Receiver_ID }) || await Innovator.findOne({ innovator_ID: Receiver_ID });

    if (!sender || !receiver) {
      return res.status(404).json({ success: false, message: 'Sender or Receiver not found' });
    }

    const chat = new Chatting({
      Sender: sender._id,
      Receiver: receiver._id,
      Message,
    });

    await chat.save();
    res.status(201).json({ success: true, data: chat });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// تعديل رسالة دردشة
exports.editChat = async (req, res) => {
  try {
    const { ID } = req.params;
    const updates = req.body;

    const chat = await Chatting.findOneAndUpdate({ _id: ID }, updates, { new: true });

    if (!chat) {
      return res.status(404).json({ success: false, message: 'Chat message not found' });
    }

    res.status(200).json({ success: true, data: chat });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// حذف رسالة دردشة
exports.deleteChat = async (req, res) => {
  try {
    const { ID } = req.params;

    const chat = await Chatting.findOneAndDelete({ _id: ID });

    if (!chat) {
      return res.status(404).json({ success: false, message: 'Chat message not found' });
    }

    res.status(200).json({ success: true, message: 'Chat message deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// البحث عن رسالة دردشة
exports.searchChat = async (req, res) => {
  try {
    const { query } = req.query;

    const chats = await Chatting.find({
      Message: { $regex: query, $options: 'i' },
    }).populate('Sender', 'first_name last_name Email')
      .populate('Receiver', 'first_name last_name Email');

    res.status(200).json({ success: true, data: chats });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
