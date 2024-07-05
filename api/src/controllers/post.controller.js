const { Follower } = require("../models/follower.model");
const { Post } = require("../models/posts.model");

exports.createPost = async (req, res) => {
  try {
    const userId = req.user.id;
    const postData = req.body;

    if (!postData.description && !postData.images) {
      return res.status(400).json({
        code: 400,
        success: false,
        message: "Post data not provided",
      });
    }

    const createdPost = await Post.create({
      user: userId,
      ...postData,
    });

    if (!createdPost) {
      return res.status(400).json({
        code: 400,
        success: false,
        message: "Post not created",
      });
    }

    return res.status(200).json({
      code: 200,
      success: true,
      message: "Post added successfully",
    });
  } catch (error) {
    res.status(500).json({
      code: 500,
      success: false,
      error: "Internal server error",
      message: error.message,
    });
  }
};

exports.getMyCreatedPosts = async (req, res) => {
  try {
    const posts = await Post.find({ user: req.user.id })
      .populate("user")
      .sort({ createdAt: -1 })
      .select({ __v: 0 })
      .lean();

    if (!posts) {
      return res.status(404).json({
        code: 404,
        success: false,
        message: "Posts not found",
      });
    }

    res.status(200).json({
      code: 200,
      success: true,
      message: "Posts retrieved successfully",
      data: posts,
    });
  } catch (error) {
    res.status(500).json({
      code: 500,
      success: false,
      message: "Failed to retrieve post",
      error: error.message,
    });
  }
};

exports.getPosts = async (req, res) => {
  try {
    const userId = req.user ? req.user.id : null; // Get the user ID from the request
    const userType = req.user ? req.user.userType : null; // Get the user type from the request

    let postsQuery = {}; // Initialize the posts query object

    if (userId && userType !== "admin") {
      // If the user is authenticated and not an admin
      const following = await Follower.find({ follower: userId }).populate(
        "user"
      ); // Get the users that the current user is following
      const followingIds = following.map((follower) => follower.user._id); // Get the IDs of the users that the current user is following

      postsQuery = {
        $or: [
          { isPublic: true }, // Include posts that are public
          { user: { $in: followingIds } }, // Include posts created by users that the current user is following
          { user: userId }, // Include posts created by the current user
        ],
      };
    } else if (userType === "admin") {
      // If the user is an admin
      postsQuery = {}; // Include all posts
    } else {
      // If the user is not authenticated
      postsQuery = { isPublic: true }; // Include only public posts
    }

    const posts = await Post.find(postsQuery)
      .sort({ createdAt: -1 })
      .populate("user")
      .lean();

    res.status(200).json(posts);
  } catch (error) {
    console.log("====================================");
    console.log(error);
    console.log("====================================");
    res.status(500).json({
      code: 500,
      success: false,
      message: "Failed to retrieve posts",
      error: error.message,
    });
  }
};

exports.updatePostById = async (req, res) => {
  try {
    const postData = req.body;

    const post = await Post.findByIdAndUpdate({ user: userId }, postData, {
      new: true,
      runValidators: true,
    });

    if (!post) {
      return res.status(404).json({
        code: 404,
        success: false,
        message: "Post not found",
      });
    }

    return res.status(200).json({
      code: 200,
      success: true,
      message: "Post updated successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update post",
      error: error.message,
    });
  }
};

// like and unlike post
exports.likeAndUnlike = async (req, res) => {
  try {
    const userId = req.user.id;
    const postId = req.body.postId;
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({
        code: 404,
        success: false,
        message: "Post not found",
      });
    }

    if (post.likes.includes(userId)) {
      post.likes.pull(userId);
      post.number_of_likes -= 1;
      await post.save();
      return res.status(200).json({
        code: 200,
        success: true,
        message: "Post unliked successfully",
      });
    }
    post.number_of_likes += 1;
    post.likes.push(userId);
    await post.save();
    res.status(200).json({
      code: 200,
      success: true,
      message: "Post liked successfully",
    });
  } catch (error) {
    res.status(500).json({
      code: 500,
      success: false,
      message: "Failed to like post",
      error: error.message,
    });
  }
};

// delete post
exports.deletePost = async (req, res) => {
  try {
    const userId = req.user.id;
    const postId = req.body.postId;
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({
        code: 404,
        success: false,
        message: "Post not found",
      });
    }
    if (post.user.toString() !== userId) {
      return res.status(401).json({
        code: 401,
        success: false,
        message: "Unauthorized",
      });
    }
    await post.remove();
    res.status(200).json({
      code: 200,
      success: true,
      message: "Post deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      code: 500,
      success: false,
      message: "Failed to delete post",
      error: error.message,
    });
  }
};

// share post by increasing number of shares
exports.sharePost = async (req, res) => {
  try {
    const postId = req.body.postId;
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({
        code: 404,
        success: false,
        message: "Post not found",
      });
    }
    post.number_of_shares += 1;
    await post.save();
    res.status(200).json({
      code: 200,
      success: true,
      message: "Post shared successfully",
    });
  } catch (error) {
    res.status(500).json({
      code: 500,
      success: false,
      message: "Failed to share post",
      error: error.message,
    });
  }
};
