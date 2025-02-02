// backend/models/Investment.js
const mongoose = require('mongoose');

const InvestmentSchema = new mongoose.Schema({
  Investment_ID: {
    type: String,
    required: true,
    unique: true,
  },
  innovation_ID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Innovation',
    required: true,
  },
  commitment_ID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Commitment',
    // required: true,
  },
  Publish_Date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Investment', InvestmentSchema);
