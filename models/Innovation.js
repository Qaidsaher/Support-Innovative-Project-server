 
// backend/models/Innovation.js
const mongoose = require('mongoose');

const InnovationSchema = new mongoose.Schema({
  ID: {
    type: String,
    required: true,
    unique: true,
  },
  name_innovation: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  cost: {
    type: Number,
    required: true,
  },
  details_innovation: {
    type: String,
  },
  image: {
    type: String, // يمكن استخدام مكتبة لتحميل الصور
  },
  video: {
    type: String, // يمكن استخدام مكتبة لتحميل الفيديوهات
  },
  publish_Date: {
    type: Date,
    default: Date.now,
  },
  Create_by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Innovator',
    required: true,
  },
  plain: {
    type: String,
  },
});

module.exports = mongoose.model('Innovation', InnovationSchema);
