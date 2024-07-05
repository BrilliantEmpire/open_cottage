const { Follower } = require("../models/follower.model");
const User = require("../models/users.model");
const { Notification } = require("../models/notifications.model");
const {
  checkNotificationIsEnabled,
} = require("../utils/check.notifcation.enable");

// follow and unfollow a user
exports.followAndUnfollower = async (req, res) => {
  const { user } = req.body;

  const follower = req.user.id;

  try {
    const existingFollower = await Follower.findOne({
      $and: [{ user }, { follower }],
    });
    if (existingFollower) {
      await Follower.deleteOne({ user, follower })
        .then(async () => {
          await User.updateOne({ _id: user }, { $inc: { followers: -1 } });
        })
        .then(async () => {

          //toggle notification for the followers 
          const enable = await checkNotificationIsEnabled(user);
          if (enable) {
            await Notification.create({
              user: follower,
              reciever: user,
              title: "Unfollowed",
              body: `${req.user.full_name} unfollowed you`,
              type: "unfollow",
            });
          }
        });
      return res.status(200).json({
        code: 200,
        success: true,
        message: "Unfollowed successfully",
      });
    }
    const newFollower = await Follower.create({ user, follower });
    if (!newFollower) {
      return res.status(400).json({
        code: 400,
        success: false,
        message: "Follower not created",
      });
    }

    await User.updateOne({ _id: user }, { $inc: { followers: 1 } });
    return res.status(200).json({
      code: 200,
      success: true,
      message: "Follower created successfully",
    });
  } catch (error) {
    res.status(500).json({
      code: 500,
      success: false,
      message: "Failed to create follower",
      error: error.message,
    });
  }
};

// get followers of a user
exports.getMyFollowers = async (req, res) => {
  const userId = req.user.id;
  try {
    const followers = await Follower.find({ user: userId }).populate(
      "follower"
    );
    if (!followers) {
      return res.status(404).json({
        code: 404,
        success: false,
        message: "No followers found",
      });
    }
    res.status(200).json({
      code: 200,
      success: true,
      message: "Followers retrieved successfully",
      data: followers,
    });
  } catch (error) {
    res.status(500).json({
      code: 500,
      success: false,
      message: "Failed to retrieve followers",
      error: error.message,
    });
  }
};

// get users who I am following
exports.getMyFollowing = async (req, res) => {
  const userId = req.user.id;
  try {
    const followers = await Follower.find({ follower: userId }).populate(
      "user"
    );
    // if (!followers) {
    //   return res.status(404).json({
    //     code: 404,
    //     success: false,
    //     message: "No followers found",
    //   });
    // }
    res.status(200).json({
      code: 200,
      success: true,
      message: "Followings retrieved successfully",
      data: followers,
    });
  } catch (error) {
    res.status(500).json({
      code: 500,
      success: false,
      message: "Failed to retrieve followings",
      error: error.message,
    });
  }
};

// check if a user is following another user
exports.checkIfFollowing = async (req, res) => {
  const { user } = req.body;
  const follower = req.user.id;
  try {
    const isFollowing = await Follower.findOne({
      $and: [{ user }, { follower }],
    });
    if (!isFollowing) {
      return res.status(404).json({
        code: 404,
        success: false,
        isFollowing: false,
        message: "Not following",
      });
    }
    res.status(200).json({
      code: 200,
      success: true,
      isFollowing: true,
      message: "Following",
    });
  } catch (error) {
    res.status(500).json({
      code: 500,
      success: false,
      message: "Failed to check if following",
      error: error.message,
    });
  }
};

// suggest users to follow
exports.suggestUsers = async (req, res) => {
  const userId = req.user.id;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        code: 404,
        success: false,
        message: "User not found",
      });
    }

    const followers = await Follower.find({ follower: userId }).populate(
      "user"
    );
    const following = await Follower.find({ user: userId }).populate(
      "follower"
    );

    const followerIds = followers
      .filter((f) => f.user && f.user._id)
      .map((f) => f.user._id);

    const followingIds = following
      .filter((f) => f.follower && f.follower._id)
      .map((f) => f.follower._id);

    const suggestedUsers = await User.aggregate([
      {
        $match: {
          _id: {
            $nin: [...followerIds, ...followingIds, userId],
          },
        },
      },
    ]);

    res.status(200).json({
      code: 200,
      success: true,
      message: "Suggested users retrieved successfully",
      data: suggestedUsers,
    });
  } catch (error) {
    console.error("Error retrieving suggested users:", error);
    res.status(500).json({
      code: 500,
      success: false,
      message: "Failed to retrieve suggested users",
      error: error.message,
    });
  }
};
