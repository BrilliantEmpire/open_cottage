const router = require("express").Router();

const {
  getUserProfile,
  getSocialMediaLinks,
  createSocialMediaLink,
  updateSocialMediaLinks,
  deleteSocialMediaLink,
  updateUserProfile,
} = require("../controllers/user.controller");
const { authProtect } = require("../middlewares/auth.middleware");

//This route for the user-profile
router.route("/getUserProfile").get(authProtect, getUserProfile);
router.route("/updateUserProfile").patch(authProtect, updateUserProfile);

//This route is for user links to be inserted
router.route("/getSocialMediaLinks").get(authProtect, getSocialMediaLinks);
router.route("/createSocialMediaLink").post(authProtect, createSocialMediaLink);
router
  .route("/updateSocialMediaLink")
  .patch(authProtect, updateSocialMediaLinks);
router
  .route("/deleteSocialMediaLink")
  .delete(authProtect, deleteSocialMediaLink);

module.exports = {
  userRoutes: router,
};
