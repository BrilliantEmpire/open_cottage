const router = require("express").Router();

const {
  getMyNotifications,
  getNotifications,
  markAsRead,
  markAllAsRead,
  getNotification,
} = require("../controllers/notification.controllers");
const { authProtect, isAdmin } = require("../middlewares/auth.middleware");

router.route("/getMyNotifications").get(authProtect, getMyNotifications);
router.route("/getNotifications").get(authProtect, isAdmin, getNotifications);
router.route("/markAsRead").post(authProtect, markAsRead);
router.route("/markAllAsRead").post(authProtect, markAllAsRead);
router.route("/getNotification/:id").get(authProtect, getNotification);

module.exports = {
  notificationRoutes: router,
};
