const User = require("../models/users.model");
const { Post } = require("../models/posts.model");
const { Recipe } = require("../models/recipe.model");
const { Follower } = require("../models/follower.model");
const bcrypt = require("bcryptjs");
const { PostComment } = require("../models/comment.model");

// get dashboard stats
exports.dashboard = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user || user.userType !== "admin") {
      return res.status(401).json({
        code: 401,
        success: false,
        message: "Unauthorized",
      });
    }

    const totalPosts = await Post.countDocuments();
    const totalUsers = await User.countDocuments();
    const totalRecipes = await Recipe.countDocuments();
    const totalFollower = await Follower.countDocuments();

    //find recently added recipes
    const recentRecipes = await Recipe.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select({ __v: 0 });
    const recentPosts = await Post.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select({ __v: 0 });

    return res.status(200).json({
      code: 200,
      success: true,
      message: "Dashboard data retrieved successfully",
      data: {
        totalPosts,
        totalUsers,
        totalRecipes,
        totalFollower: totalFollower + totalPosts,
        recentRecipes,
        recentPosts,
      },
    });
  } catch (error) {
    return res.status(500).json({
      code: 500,
      success: false,
      message: "Internal server error",
    });
  }
};

// Admin get all users
exports.getUsersByAdmin = async (req, res) => {
  try {
    if (req.user.userType !== "admin") {
      return res.status(401).json({
        code: 401,
        success: false,
        message: "Unauthorized",
      });
    }

    const users = await User.find().sort({ createdAt: -1 });

    const newUsers = await Promise.all(
      users.map(async (user) => ({
        ...user.toObject(),
        totalRecipes: await Recipe.countDocuments({ user: user._id }),
      }))
    );

    return res.status(200).json({
      code: 200,
      success: true,
      message: "Users retrieved successfully",
      data: newUsers,
    });
  } catch (error) {
    return res.status(500).json({
      code: 500,
      success: false,
      message: "Internal server error",
    });
  }
};

// Admin get all posts
exports.getPostsByAdmin = async (req, res) => {
  try {
    if (req.user.userType !== "admin") {
      return res.status(401).json({
        code: 401,
        success: false,
        message: "Unauthorized",
      });
    }
    const posts = await Post.find().sort({ createdAt: -1 }).populate("user");
    return res.status(200).json({
      code: 200,
      success: true,
      message: "Posts retrieved successfully",
      data: posts,
    });
  } catch (error) {
    return res.status(500).json({
      code: 500,
      success: false,
      message: "Internal server error",
    });
  }
};

// Admin get all recipes
exports.getRecipesByAdmin = async (req, res) => {
  try {
    if (req.user.userType !== "admin") {
      return res.status(401).json({
        code: 401,
        success: false,
        message: "Unauthorized",
      });
    }
    const recipes = await Recipe.find()
      .sort({ createdAt: -1 })
      .populate("user");
    return res.status(200).json({
      code: 200,
      success: true,
      message: "Recipes retrieved successfully",
      data: recipes,
    });
  } catch (error) {
    return res.status(500).json({
      code: 500,
      success: false,
      message: "Internal server error",
    });
  }
};

// Admin block user
exports.blockAndUnblockUserByAdmin = async (req, res) => {
  try {
    if (req.user.userType !== "admin") {
      return res.status(401).json({
        code: 401,
        success: false,
        message: "Unauthorized",
      });
    }
    const userId = req.body.userId;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        code: 404,
        success: false,
        message: "User not found",
      });
    }
    user.is_active = !user.is_active;
    await user.save();
    return res.status(200).json({
      code: 200,
      success: true,
      message: "User status updated successfully",
      data: user,
    });
  } catch (error) {
    return res.status(500).json({
      code: 500,
      success: false,
      message: "Internal server error",
    });
  }
};

// Admin block and unblock recipe
exports.blockAndUnblockRecipeByAdmin = async (req, res) => {
  try {
    if (req.user.userType !== "admin") {
      return res.status(401).json({
        code: 401,
        success: false,
        message: "Unauthorized",
      });
    }
    const recipeId = req.body.recipeId;
    const recipe = await Recipe.findById(recipeId);
    if (!recipe) {
      return res.status(404).json({
        code: 404,
        success: false,
        message: "Recipe not found",
      });
    }
    recipe.is_active = !recipe.is_active;
    await recipe.save();
    return res.status(200).json({
      code: 200,
      success: true,
      message: "Recipe status updated successfully",
      data: recipe,
    });
  } catch (error) {
    return res.status(500).json({
      code: 500,
      success: false,
      message: "Internal server error",
    });
  }
};

// Admin block and unblock post
exports.blockAndUnblockPostByAdmin = async (req, res) => {
  try {
    if (req.user.userType !== "admin") {
      return res.status(401).json({
        code: 401,
        success: false,
        message: "Unauthorized",
      });
    }
    const postId = req.body.postId;
    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({
        code: 404,
        success: false,
        message: "Post not found",
      });
    }

    post.is_active = !post.is_active;
    await post.save();
    return res.status(200).json({
      code: 200,
      success: true,
      message: "Post status updated successfully",
      data: post,
    });
  } catch (error) {
    return res.status(500).json({
      code: 500,
      success: false,
      message: "Internal server error",
    });
  }
};

// admin get user details by id
exports.getUserByIdByAdmin = async (req, res) => {
  try {
    if (req.user.userType !== "admin") {
      return res.status(401).json({
        code: 401,
        success: false,
        message: "Unauthorized",
      });
    }
    const userId = req.params.userId;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        code: 404,
        success: false,
        message: "User not found",
      });
    }

    // get user followers count
    const followersCount = await Follower.countDocuments({ user: userId });
    const followingCount = await Follower.countDocuments({ follower: userId });
    const posts = await Post.find({ user: userId });
    const recipes = await Recipe.find({ user: userId });

    return res.status(200).json({
      code: 200,
      success: true,
      message: "User retrieved successfully",
      data: {
        ...user.toJSON(),
        followersCount,
        followingCount,
        postsCount: posts.length,
        recipesCount: recipes.length,
        posts,
        recipes,
      },
    });
  } catch (error) {
    return res.status(500).json({
      code: 500,
      success: false,
      message: "Internal server error",
    });
  }
};

// admin get post details by id
exports.getPostByIdByAdmin = async (req, res) => {
  try {
    if (req.user.userType !== "admin") {
      return res.status(401).json({
        code: 401,
        success: false,
        message: "Unauthorized",
      });
    }
    const postId = req.params.postId;
    const post = await Post.findById(postId).populate("user");
    if (!post) {
      return res.status(404).json({
        code: 404,
        success: false,
        message: "Post not found",
      });
    }

    const comments = await PostComment.find({ post: postId }).populate("user");

    return res.status(200).json({
      code: 200,
      success: true,
      message: "Post retrieved successfully",
      data: {
        ...post.toJSON(),
        comments,
      },
    });
  } catch (error) {
    return res.status(500).json({
      code: 500,
      success: false,
      message: "Internal server error",
    });
  }
};

// set new password
exports.setNewPassword = async (req, res) => {
  try {
    if (req.user.userType !== "admin") {
      return res.status(401).json({
        code: 401,
        success: false,
        message: "Unauthorized",
      });
    }
    const { currentPassword, password } = req.body;

    if (!currentPassword || !password) {
      return res.status(400).json({
        code: 400,
        success: false,
        message: "Please provide current password and new password",
      });
    }

    if (currentPassword === password) {
      return res.status(400).json({
        code: 400,
        success: false,
        message: "Current password and new password cannot be same",
      });
    }

    const user = await User.findById(req.user._id);
    const isMatch = await bcrypt.compare(currentPassword, user.password);

    if (!isMatch) {
      return res.status(400).json({
        code: 400,
        success: false,
        message: "Current password is incorrect",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    user.password = hashedPassword;
    user.is_active = true;
    await user.save();

    return res.status(200).json({
      code: 200,
      success: true,
      message: "Password updated successfully",
    });
  } catch (error) {
    console.log("====================================");
    console.log(error);
    console.log("====================================");
    return res.status(500).json({
      code: 500,
      success: false,
      message: "Internal server error",
    });
  }
};
