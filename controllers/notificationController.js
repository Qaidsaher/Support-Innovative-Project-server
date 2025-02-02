 
// backend/controllers/notificationController.js
const Notification = require('../models/Notification');

// إضافة إشعار جديد
exports.addNotification = async (req, res) => {
  try {
    const { notification_ID, content_noti, Name_notification, Type, Receive } = req.body;

    // التحقق من وجود الإشعار مسبقًا
    const existingNotification = await Notification.findOne({ notification_ID });
    if (existingNotification) {
      return res.status(400).json({ success: false, message: 'Notification already exists' });
    }

    const notification = new Notification({
      notification_ID,
      content_noti,
      Name_notification,
      Type,
      Receive,
    });

    await notification.save();
    res.status(201).json({ success: true, data: notification });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// إرسال إشعار (قد يشمل إرسال البريد الإلكتروني أو غيره)
exports.sendNotification = async (req, res) => {
  try {
    const { Name_notification, content_noti } = req.body;

    // منطق إرسال الإشعار هنا (مثل إرسال بريد إلكتروني)
    // يمكنك استخدام خدمات مثل SendGrid أو Nodemailer

    // مثال بسيط:
    // console.log(`Sending Notification: ${Name_notification} - ${content_noti}`);

    res.status(200).json({ success: true, message: 'Notification sent successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// حذف إشعار
exports.deleteNotification = async (req, res) => {
  try {
    const { notification_ID } = req.params;

    const notification = await Notification.findOneAndDelete({ notification_ID });

    if (!notification) {
      return res.status(404).json({ success: false, message: 'Notification not found' });
    }

    res.status(200).json({ success: true, message: 'Notification deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
