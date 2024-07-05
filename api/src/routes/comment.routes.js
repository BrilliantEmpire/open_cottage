const router = require("express").Router();
const {
  addPostComment,
  addRecipeComment,
  getRecipeComments,
  getPostComments,
} = require("../controllers/comments.controller");
const { authProtect } = require("../middlewares/auth.middleware");

router.route("/addPostComment").post(authProtect, addPostComment);
router.route("/addRecipeComment").post(authProtect, addRecipeComment);
router.route("/getRecipeComments/:recipeId").get(getRecipeComments);
router.route("/getPostComments/:postId").get(getPostComments);

module.exports = {
  commentRoutes: router,
};
