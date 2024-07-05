const router = require("express").Router();
const {
  registerUser,
  forgotPassword,
  resetPassword,
  registerUserWithProvider,
  logInUser,
  setNewPassword,
} = require("../controllers/auth.controller");
const { authProtect } = require("../middlewares/auth.middleware");

// Register a new user
router.route("/provider").post(registerUserWithProvider);
router.route("/register").post(registerUser);
router.route("/login").post(logInUser);
router.route("/forgotPassword").post(forgotPassword);
router.route("/resetPassword").post(resetPassword);
router.route("/setNewPassword").post(authProtect, setNewPassword);

module.exports = {
  authRoutes: router,
};
