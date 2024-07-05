const { Schema, model } = require("mongoose");

// post comments
exports.PostComment = model(
  "PostComment",
  new Schema(
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
      post: {
        type: Schema.Types.ObjectId,
        ref: "Post",
      },
      comment: {
        type: String,
        required: true,
      },
      rating: {
        type: Number,
        default: 0,
      },
    },
    {
      timestamps: true,
    }
  )
);

// post comments
exports.RecipeComment = model(
  "RecipeComment",
  new Schema(
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
      recipe: {
        type: String,
        ref: "Recipe",
      },
      comment: {
        type: String,
        required: true,
      },
      rating: {
        type: Number,
        default: 0,
      },
    },
    {
      timestamps: true,
    }
  )
);
