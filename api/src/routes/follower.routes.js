const router = require("express").Router();

const {
  followAndUnfollower,
  getMyFollowers,
  checkIfFollowing,
  getMyFollowing,
  suggestUsers,
} = require("../controllers/followers.controllers");
const { authProtect } = require("../middlewares/auth.middleware");

router.route("/followAndUnfollower").post(authProtect, followAndUnfollower);
router.route("/getMyFollowers").get(authProtect, getMyFollowers);
router.route("/getMyFollowings").get(authProtect, getMyFollowing);
router.route("/checkIfFollowing").post(authProtect, checkIfFollowing);
router.route("/suggestUsers").get(authProtect, suggestUsers);

module.exports = {
  followerRoutes: router,
};
