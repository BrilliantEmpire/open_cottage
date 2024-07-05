const { BookmarkPost, BookmarkRecipe } = require("../models/bookmark.model");
const { Notification } = require("../models/notifications.model");
const { Post } = require("../models/posts.model");
const { Recipe } = require("../models/recipe.model");
const {
  checkNotificationIsEnabled,
} = require("../utils/check.notifcation.enable");

// Bookmark or save Post

exports.bookmarkAndUnbookmarkPost = async (req, res) => {
  try {
    const userId = req.user.id;
    const postId = req.body.post;

    const existPost = await Post.findById(postId);
    if (!existPost) {
      return res.status(404).json({
        code: 404,
        success: false,
        message: "Post not found",
      });
    }

    const post = await BookmarkPost.findOne({ user: userId, post: postId });
    if (post) {
      await BookmarkPost.deleteOne({ user: userId, post: postId });

      await existPost.updateOne({ $inc: { number_of_saves: -1 } });

      return res.status(200).json({
        code: 200,
        success: true,
        message: "Post unbookmarked successfully",
      });
    }

    const newBookmark = await BookmarkPost.create({
      user: userId,
      post: postId,
    });

    if (!newBookmark) {
      return res.status(400).json({
        code: 400,
        success: false,
        message: "Post not bookmarked",
      });
    }

    await Notification.create({
      user: userId,
      reciever: existPost.user,
      title: "Post bookmarked",
      body: `${req.user.full_name} bookmarked your post`,
      type: "post",
    });

    await existPost.updateOne({ $inc: { number_of_saves: 1 } });

    return res.status(200).json({
      code: 200,
      success: true,
      message: "Post bookmarked successfully",
    });
  } catch (error) {
    return res.status(500).json({
      code: 500,
      success: false,
      message: error.message,
    });
  }
};

// Bookmark or save Recipe

exports.bookmarkAndUnbookmarkRecipe = async (req, res) => {
  try {
    const userId = req.user.id;

    const recipeId = req.body.recipe;

    const existingRecipe = await Recipe.findById(recipeId);
    if (!existingRecipe) {
      return res.status(404).json({
        code: 404,
        success: false,
        message: "Recipe not found",
      });
    }

    const recipe = await BookmarkRecipe.findOne({
      $and: [{ user: userId }, { recipe: recipeId }],
    }).populate("recipe");

    if (recipe) {
      await BookmarkRecipe.deleteOne({ user: userId, recipe: recipeId });

      await Notification.create({
        user: userId,
        reciever: existingRecipe.user,
        title: "Recipe deleted",
        body: `${req.user.full_name} deleted a saved recipe`,
        type: "recipe",
      });

      return res.status(200).json({
        code: 200,
        success: true,
        message: "Recipe unbookmarked successfully",
      });
    }

    const newBookmark = await BookmarkRecipe.create({
      user: userId,
      recipe: recipeId,
    });

    if (!newBookmark) {
      return res.status(400).json({
        code: 400,
        success: false,
        message: "Recipe not bookmarked",
      });
    }
    
    //disable notification on bookmark
    const enable = await checkNotificationIsEnabled(existingRecipe.user);
    if (enable) {
      await Notification.create({
        user: userId,
        reciever: existingRecipe.user,
        title: "Recipe saved",
        body: `${req.user.full_name} saved a recipe`,
        type: "recipe",
      });
    }

    return res.status(200).json({
      code: 200,
      success: true,
      message: "Recipe bookmarked successfully",
    });
  } catch (error) {
    return res.status(500).json({
      code: 500,
      success: false,
      message: error.message,
    });
  }
};

// Get Bookmark Posts
exports.getMyBookmarkPosts = async (req, res) => {
  try {
    const posts = await BookmarkPost.find({ user: req.user.id })
      .select({ __v: 0 })
      .populate({
        path: "post",
        select: { __v: 0 },
        populate: {
          path: "user",
          select: { __v: 0, password: 0 },
        },
      })
      .lean();

    if (!posts) {
      return res.status(404).json({
        code: 404,
        success: false,
        message: "Posts not found",
      });
    }

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
      message: error.message,
    });
  }
};

// Get Bookmark Recipes
exports.getMyBookmarkRecipes = async (req, res) => {
  try {
    const recipes = await BookmarkRecipe.find({ user: req.user.id })
      .select({ __v: 0 })
      .populate({
        path: "recipe",
        select: { __v: 0 },
        populate: {
          path: "user",
          select: { __v: 0, password: 0 },
        },
      })
      .lean();

    if (!recipes) {
      return res.status(404).json({
        code: 404,
        success: false,
        message: "Recipes not found",
      });
    }

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
      message: error.message,
    });
  }
};

// check if a recipe is bookmarked
exports.checkIfBookmarkedRecipe = async (req, res) => {
  const { recipe } = req.body;
  const userId = req.user.id;
  try {
    const isBookmarked = await BookmarkRecipe.findOne({
      $and: [{ user: userId }, { recipe }],
    });
    if (!isBookmarked) {
      return res.status(404).json({
        code: 404,
        success: false,
        isBookmarked: false,
        message: "Not bookmarked",
      });
    }
    return res.status(200).json({
      code: 200,
      success: true,
      isBookmarked: true,
      message: "Bookmarked",
    });
  } catch (error) {
    return res.status(500).json({
      code: 500,
      success: false,
      message: error.message,
    });
  }
};

// check if a post is bookmarked
exports.checkIfBookmarkedPost = async (req, res) => {
  const { post } = req.body;
  const userId = req.user.id;
  try {
    const isBookmarked = await BookmarkPost.findOne({
      $and: [{ user: userId }, { post }],
    });
    if (!isBookmarked) {
      return res.status(404).json({
        code: 404,
        success: false,
        isBookmarked: false,
        message: "Not bookmarked",
      });
    }
    return res.status(200).json({
      code: 200,
      success: true,
      isBookmarked: true,
      message: "Bookmarked",
    });
  } catch (error) {
    return res.status(500).json({
      code: 500,
      success: false,
      message: error.message,
    });
  }
};
