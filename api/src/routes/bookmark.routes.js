const router = require("express").Router();
const {
  bookmarkAndUnbookmarkPost,
  bookmarkAndUnbookmarkRecipe,
  getMyBookmarkPosts,
  getMyBookmarkRecipes,
  checkIfBookmarkedPost,
  checkIfBookmarkedRecipe,
} = require("../controllers/bookmark.controller");
const { authProtect } = require("../middlewares/auth.middleware");

router
  .route("/bookmarkAndUnbookmarkPost")
  .post(authProtect, bookmarkAndUnbookmarkPost);
router
  .route("/bookmarkAndUnbookmarkRecipe")
  .post(authProtect, bookmarkAndUnbookmarkRecipe);
router.route("/getMyBookmarkPosts").get(authProtect, getMyBookmarkPosts);
router.route("/getMyBookmarkRecipes").get(authProtect, getMyBookmarkRecipes);
router.route("/checkIfBookmarkedPost").post(authProtect, checkIfBookmarkedPost);
router
  .route("/checkIfBookmarkedRecipe")
  .post(authProtect, checkIfBookmarkedRecipe);

module.exports = {
  bookmarkRoutes: router,
};
