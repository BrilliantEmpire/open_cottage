const { Follower } = require("../models/follower.model");
const { Post } = require("../models/posts.model");
const User = require("../models/users.model");

exports.getUserProfile = async (req, res) => {
  const userId = req.user.id;
  try {
    // Find user by userId (assuming userId is the MongoDB ObjectId)
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    // Remove password from user object
    delete user.password;

    const postCount = await Post.countDocuments({ user: userId });

    const followerCount = await Follower.countDocuments({ user: userId });

    const followingCount = await Follower.countDocuments({ follower: userId });

    // Return user profile data
    res.status(200).json({
      code: 200,
      success: true,
      message: "User profile retrieved successfully.",
      user: {
        ...user.toJSON(),
        postCount,
        followerCount,
        followingCount,
      },
    });
  } catch (error) {
    console.error("Error retrieving user profile:", error);
    res.status(500).json({
      code: 500,
      success: false,
      message: "Failed to retrieve user profile.",
      error: error.message.toString(),
    });
  }
};

exports.updateUserProfile = async (req, res) => {
  const userId = req.user.id; 
  const updates = req.body; 

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    Object.keys(updates).forEach((key) => {
      if (key in user) {
        user[key] = updates[key];
      }
    });

    await user.save();

    res.status(200).json({
      success: true,
      message: "User profile updated successfully.",
      user: {
        _id: user._id,
        email: user.email,
        full_name: user.full_name,
        image: user.image,
      },
    });
  } catch (error) {
    console.error("Error updating user profile:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update user profile.",
      error: error.message.toString(),
    });
  }
};

//This all method will be for the social user social media account
exports.getSocialMediaLinks = async (req, res) => {
  const userId = req.user.id;
  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    res.status(200).json({
      success: true,
      social_links: user.social_links,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to retrieve social media links.",
      error: error.message.toString(),
    });
  }
};

//create social media links
exports.createSocialMediaLink = async (req, res) => {
  const userId = req.user.id;
  const socialMediaData = req.body.socialMediaData;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    if (!Array.isArray(socialMediaData)) {
      return res.status(400).json({
        success: false,
        message: "Invalid data format. Expected an array.",
      });
    }

    socialMediaData.forEach(({ platform, link }) => {
      user.social_links.push({ platform, link });
    });

    await user.save();

    res.status(201).json({
      success: true,
      message: "Social media links added successfully.",
      social_links: user.social_links,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create social media links.",
      error: error.message.toString(),
    });
  }
};

exports.updateSocialMediaLinks = async (req, res) => {
  const userId = req.user.id;
  const updates = req.body;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    // Iterate through each update
    updates.forEach((update) => {
      const { _id, platform, link } = update;
      const socialLink = user.social_links.id(_id);

      if (!socialLink) {
        return;
      }

      if (platform) {
        socialLink.platform = platform;
      }

      if (link) {
        socialLink.link = link;
      }
    });

    await user.save();

    res.status(200).json({
      success: true,
      message: "Social media links updated successfully.",
      social_links: user.social_links,
    });
  } catch (error) {
    console.error("Error updating social media links:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update social media links.",
      error: error.message.toString(),
    });
  }
};

exports.deleteSocialMediaLink = async (req, res) => {
  const userId = req.user.id;
  const { postId } = req.body;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    // Filter out the social link to delete based on platform ID
    user.social_links = user.social_links.filter(
      (socialLink) => socialLink._id.toString() !== postId
    );

    await user.save();

    res.status(200).json({
      success: true,
      message: "Social media link deleted successfully.",
      social_links: user.social_links,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete social media link.",
      error: error.message.toString(),
    });
  }
};
