const router = require("express").Router();
const {
  createPost,
  getMyCreatedPosts,
  updatePostById,
  getPosts,
  likeAndUnlike,
  deletePost,
  sharePost,
} = require("../controllers/post.controller");
const { authProtect } = require("../middlewares/auth.middleware");

router.route("/createPost").post(authProtect, createPost);
router.route("/getMyCreatedPosts").get(authProtect, getMyCreatedPosts);
router.route("/getPosts").get(authProtect, getPosts);
router.route("/updatePostById/:postId").post(authProtect, updatePostById);
router.route("/likeAndUnlike").post(authProtect, likeAndUnlike);
router.route("/deletePost").post(authProtect, deletePost);
router.route("/sharePost").post(authProtect, sharePost);

module.exports = {
  postRoutes: router,
};
