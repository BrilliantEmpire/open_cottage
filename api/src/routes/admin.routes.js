const router = require("express").Router();

const { adminLogin } = require("../controllers/auth.controller");
const {
  dashboard,
  getPostsByAdmin,
  getRecipesByAdmin,
  getUsersByAdmin,
  blockAndUnblockUserByAdmin,
  blockAndUnblockPostByAdmin,
  blockAndUnblockRecipeByAdmin,
  getUserByIdByAdmin,
  getPostByIdByAdmin,
  setNewPassword,
} = require("../controllers/admin.controller");
const { authProtect, isAdmin } = require("../middlewares/auth.middleware");
const { getRecipeBySlug } = require("../controllers/recipe.controller");

router.route("/login").post(adminLogin);

// Admin dashboard
router.route("/dashboard").get(authProtect, isAdmin, dashboard);

// admin posts
router.route("/getPostsByAdmin").get(authProtect, isAdmin, getPostsByAdmin);
router
  .route("/getPostByIdByAdmin/:postId")
  .get(authProtect, isAdmin, getPostByIdByAdmin);
router
  .route("/blockAndUnblockPostByAdmin")
  .post(authProtect, isAdmin, blockAndUnblockPostByAdmin);

// admin recipes
router.route("/getRecipesByAdmin").get(authProtect, isAdmin, getRecipesByAdmin);
router
  .route("/getRecipeBySlugByAdmin/:slug")
  .get(authProtect, isAdmin, getRecipeBySlug);
router
  .route("/blockAndUnblockRecipeByAdmin")
  .post(authProtect, isAdmin, blockAndUnblockRecipeByAdmin);

// admin users
router.route("/getUsersByAdmin").get(authProtect, isAdmin, getUsersByAdmin);
router
  .route("/getUserByIdByAdmin/:userId")
  .get(authProtect, isAdmin, getUserByIdByAdmin);
router
  .route("/blockAndUnblockUserByAdmin")
  .post(authProtect, isAdmin, blockAndUnblockUserByAdmin);

router.route("/setNewPassword").put(authProtect, isAdmin, setNewPassword);

module.exports = {
  adminRoutes: router,
};
