// backend/models/Chatting.js
const mongoose = require('mongoose');

const ChattingSchema = new mongoose.Schema({
  ID: {
    type: String,
    required: true,
    unique: true,
  },
  Sender_ID: {
    type: mongoose.Schema.Types.ObjectId,
    refPath: 'senderModel',
    required: true,
  },
  Receiver_ID: {
    type: mongoose.Schema.Types.ObjectId,
    refPath: 'receiverModel',
    required: true,
  },
  senderModel: {
    type: String,
    enum: ['Investor', 'Innovator'],
    required: true,
  },
  receiverModel: {
    type: String,
    enum: ['Investor', 'Innovator'],
    required: true,
  },
  Message: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: 'sent',
  },
  Publish_date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Chatting', ChattingSchema);
