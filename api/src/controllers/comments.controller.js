const { PostComment, RecipeComment } = require("../models/comment.model");
const { Notification } = require("../models/notifications.model");
const { Post } = require("../models/posts.model");
const { Recipe } = require("../models/recipe.model");
const {
  checkNotificationIsEnabled,
} = require("../utils/check.notifcation.enable");
// add new comment for recipe
exports.addRecipeComment = async (req, res) => {
  const { comment, rating, recipe } = req.body;

  try {
    const recipeExists = await Recipe.findById(recipe);

    if (!recipeExists) {
      return res.status(404).json({
        code: 404,
        success: false,
        message: "Recipe not found",
      });
    }

    const newComment = await RecipeComment.create({
      comment,
      rating,
      user: req.user.id,
      recipe,
    });

    //toggle notification  for the comments
    const enable = await checkNotificationIsEnabled(recipeExists.user);
    if (enable) {
      await Notification.create({
        user: req.user.id,
        reciever: recipeExists.user,
        product: recipe,
        title: "Commented",
        body: `${req.user.full_name} commented on your recipe`,
        type: "comment",
      });
    }

    res.status(200).json({
      success: true,
      code: 200,
      message: "Comment added successfully",
      data: newComment,
    });
  } catch (error) {
    res.status(500).json({
      code: 500,
      success: false,
      message: "Failed to add comment",
      error: error.message,
    });
  }
};

// add new comment for post
exports.addPostComment = async (req, res) => {
  const { comment, rating, post } = req.body;

  try {
    const postExists = await Post.findById(post);

    if (!postExists) {
      return res.status(404).json({
        code: 404,
        success: false,
        message: "Post not found",
      });
    }

    const newComment = await PostComment.create({
      comment,
      rating,
      user: req.user.id,
      post,
    });

    if (!newComment) {
      return res.status(404).json({
        code: 404,
        success: false,
        message: "Comment not added",
      });
    }
    await postExists.updateOne({ $inc: { number_of_comments: 1 } });

    const enable = await checkNotificationIsEnabled(postExists.user);
    if (enable) {
      await Notification.create({
        user: req.user.id,
        reciever: postExists.user,
        product: newComment.post,
        title: "Commented",
        body: `${req.user.full_name} commented on your recipe`,
        type: "comment",
      });
    }

    res.status(200).json({
      success: true,
      code: 200,
      message: "Comment added successfully",
      data: newComment,
    });
  } catch (error) {
    res.status(500).json({
      code: 500,
      success: false,
      message: "Failed to add comment",
      error: error.message,
    });
  }
};

// get all comments for recipe
exports.getRecipeComments = async (req, res) => {
  try {
    const comments = await RecipeComment.find({ recipe: req.params.recipeId })
      .sort({ createdAt: -1 })
      .populate("user")
      .select({ __v: 0, _id: 0 })
      .lean();
    if (!comments) {
      return res.status(404).json({
        message: "Comments not found",
      });
    }
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({
      code: 500,
      success: false,
      message: "Failed to retrieve comments",
      error: error.message,
    });
  }
};

// get all comments for post
exports.getPostComments = async (req, res) => {
  try {
    const comments = await PostComment.find({ post: req.params.postId })
      .sort({
        createdAt: -1,
      })
      .populate("user")
      .select({ __v: 0, _id: 0 })
      .lean();
    if (!comments) {
      return res.status(404).json({
        message: "Comments not found",
      });
    }
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({
      code: 500,
      success: false,
      message: "Failed to retrieve comments",
      error: error.message,
    });
  }
};
