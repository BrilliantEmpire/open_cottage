const { Notification } = require("../models/notifications.model");
// const Preference = require("../models/preference.model");
const {
  checkNotificationIsEnabled,
} = require("../utils/check.notifcation.enable");
// get all notifications
exports.getMyNotifications = async (req, res) => {
  try {

    //disable main notification of the user 
    const enable = await checkNotificationIsEnabled(req.user._id);
    if (enable) {
      const notifications = await Notification.find({ reciever: req.user._id })
        .populate("product", "title images slug user id")
        .populate("user");
      return res.status(200).json(notifications);
    }

    res.status(401).json({
      code: 401,
      success: false,
      message: "notification is disable",
    });
  } catch (error) {
    res.status(500).json({
      code: 500,
      success: false,
      message: "Failed to retrieve notifications",
      error: error.message,
    });
  }
};

// get all notifications
exports.getNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find();
    res.status(200).json(notifications);
  } catch (error) {
    res.status(500).json({
      code: 500,
      success: false,
      message: "Failed to retrieve notifications",
      error: error.message,
    });
  }
};

// mark notification as read
exports.markAsRead = async (req, res) => {
  try {
    const notification = await Notification.findByIdAndUpdate(
      req.body.notification,
      {
        isRead: true,
      },
      {
        new: true,
        runValidators: true,
      }
    );
    res.status(200).json({
      code: 200,
      success: true,
      message: "Marked notification as read",
      notification,
    });
  } catch (error) {
    res.status(500).json({
      code: 500,
      success: false,
      message: "Failed to mark notification as read",
      error: error.message,
    });
  }
};

// mark all notifications as read
exports.markAllAsRead = async (req, res) => {
  try {
    const notifications = await Notification.updateMany(
      { $and: [{ reciever: req.user._id }, { isRead: false }] },
      {
        isRead: true,
      }
    );
    res.status(200).json({
      code: 200,
      success: true,
      message: "Marked all notifications as read",
      notifications,
    });
  } catch (error) {
    res.status(500).json({
      code: 500,
      success: false,
      message: "Failed to mark all notifications as read",
      error: error.message,
    });
  }
};

// get a single notification
exports.getNotification = async (req, res) => {
  try {
    const notification = await Notification.findById(req.params.id)
      .populate("product")
      .populate("user");

    return res.status(200).json({
      code: 200,
      success: true,
      message: "Notification retrieved successfully",
      notification,
    });
  } catch (error) {
    res.status(500).json({
      code: 500,
      success: false,
      message: "Failed to retrieve notification",
      error: error.message,
    });
  }
};
