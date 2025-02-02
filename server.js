// require("dotenv").config();
// const express = require("express");
// const cors = require("cors");
// const morgan = require("morgan");
// const connectDB = require("./config/db");

// const authRoutes = require("./routes/authRoutes");
// const processRoutes = require("./routes/processRoutes");

// const app = express();
// app.use(express.json());
// app.use(cors());
// app.use(morgan("dev"));

// connectDB();

// app.use("/api/auth", authRoutes); // ✅ Add Authentication Routes
// app.use("/api/processes", processRoutes);

// app.get("/", (req, res) => {
//   res.send("API is running...");
// });

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

// backend/server.js
const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const cors = require("cors");
const { errorHandler } = require("./middleware/errorMiddleware");

// تحميل متغيرات البيئة
dotenv.config();

// الاتصال بقاعدة البيانات
connectDB();

const app = express();

// تفعيل CORS
app.use(cors());

// تمكين تحليل JSON في الطلبات
app.use(express.json());

// تعريف المسارات
app.use("/api/categories", require("./routes/categoryRoutes"));
app.use("/api/innovations", require("./routes/innovationRoutes"));
app.use("/api/innovators", require("./routes/innovatorRoutes"));
app.use("/api/investors", require("./routes/investorRoutes"));
app.use("/api/admins", require("./routes/adminRoutes"));
app.use("/api/notifications", require("./routes/notificationRoutes"));
app.use("/api/commitments", require("./routes/commitmentRoutes"));
app.use("/api/investments", require("./routes/investmentRoutes"));
app.use("/api/chatting", require("./routes/chattingRoutes"));
app.use("/api/auth", require("./routes/authRoutes")); // إذا كنت تستخدم المصادقة

// التعامل مع الأخطاء
app.use(errorHandler);

// تشغيل الخادم
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
