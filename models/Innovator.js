 
// backend/models/Innovator.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const InnovatorSchema = new mongoose.Schema({
  innovator_ID: {
    type: String,
    required: true,
    unique: true,
  },
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
  },
  Email: {
    type: String,
    required: true,
    unique: true,
  },
  City: {
    type: String,
  },
  Education: {
    type: String,
  },
  password: {
    type: String,
    required: true,
  },
  photo: {
    type: String, // يمكن استخدام مكتبة لتحميل الصور
  },
  phone: {
    type: String,
  },
  birthday: {
    type: Date,
  },
  account_x: {
    type: String,
  },
  Publish_Date: {
    type: Date,
    default: Date.now,
  },
});

// تشفير كلمة المرور قبل الحفظ
InnovatorSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// مقارنة كلمة المرور
InnovatorSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('Innovator', InnovatorSchema);
