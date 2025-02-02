 
// backend/models/Category.js
const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
  Category_ID: {
    type: String,
    required: true,
    unique: true,
  },
  Name_Category: {
    type: String,
    required: true,
  },
  Publish_Date: {
    type: Date,
    default: Date.now,
  },
  Create_by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Admin',
    required: true,
  },
});

module.exports = mongoose.model('Category', CategorySchema);
