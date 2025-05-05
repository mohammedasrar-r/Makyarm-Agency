const Notification = require('../models/notification.model');

exports.sendRequest = async (req, res) => {
  const { fromUserId, toUserId, message } = req.body;
  const notification = new Notification({ fromUserId, toUserId, message });
  await notification.save();
  req.io.to(toUserId).emit('newNotification', notification);
  res.status(200).json({ success: true });
};

exports.getNotifications = async (req, res) => {
  const notifications = await Notification.find({ toUserId: req.params.userId }).sort({ createdAt: -1 });
  res.json(notifications);
};