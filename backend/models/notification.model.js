const mongoose = require('mongoose');

const NotificationSchema = new mongoose.Schema({
  toUserId: String,
  fromUserId: String,
  message: String,
  read: { type: Boolean, default: false },
}, { timestamps: true });

module.exports = mongoose.model('Notification', NotificationSchema);
