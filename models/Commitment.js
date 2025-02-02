// backend/models/Commitment.js
const mongoose = require('mongoose');

const CommitmentSchema = new mongoose.Schema({
  Commitment_ID: {
    type: String,
    required: true,
    unique: true,
  },
  Conditions: {
    type: String,
    required: true,
  },
  investor_ID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Investor',
    required: true,
  },
  innovator_ID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Innovator',
    required: true,
  },
  investment_ID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Investment',
    required: true,
  },
  status: {
    type: String,
    default: 'pending',
  },
  investor_sign: {
    type: Boolean,
    default: false,
  },
  innovator_sign: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model('Commitment', CommitmentSchema);
