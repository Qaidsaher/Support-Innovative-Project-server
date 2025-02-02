// backend/controllers/authController.js
const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");
const Innovator = require("../models/Innovator");
const Investor = require("../models/Investor");

// توليد رمز JWT
const generateToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

// تسجيل Admin
exports.registerAdmin = async (req, res) => {
  try {
    const { Admin_ID, Name, Email, password } = req.body;

    const adminExists = await Admin.findOne({ Email });
    if (adminExists) {
      return res
        .status(400)
        .json({ success: false, message: "Admin already exists" });
    }

    const admin = await Admin.create({
      Admin_ID,
      Name,
      Email,
      password,
    });

    res.status(201).json({
      success: true,
      data: {
        _id: admin._id,
        Admin_ID: admin.Admin_ID,
        Name: admin.Name,
        Email: admin.Email,
        token: generateToken(admin._id, "admin"),
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// تسجيل الدخول
exports.login = async (req, res) => {
  try {
    const { Email, password, role } = req.body;

    let user;

    if (role === "admin") {
      user = await Admin.findOne({ Email });
    } else if (role === "innovator") {
      user = await Innovator.findOne({ Email });
    } else if (role === "investor") {
      user = await Investor.findOne({ Email });
    }

    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials" });
    }

    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials" });
    }

    res.status(200).json({
      success: true,
      data: {
        _id: user._id,
        Email: user.Email,
        role: role,
        token: generateToken(user._id, role),
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// تحديد المستخدم
exports.me = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });

    req.user = user;
    next();
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
