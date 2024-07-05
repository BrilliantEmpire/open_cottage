const { required } = require("joi");
const { Schema, model } = require("mongoose");

const bookmarkPostSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    post: { type: Schema.Types.ObjectId, ref: "Post", required: true },
  },
  {
    timestamps: true,
  }
);

const bookmarkRecipeSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    recipe: { type: Schema.Types.ObjectId, ref: "Recipe", required: true },
  },
  {
    timestamps: true,
  }
);

module.exports = {
  BookmarkRecipe: model("BookmarkRecipe", bookmarkRecipeSchema),
  BookmarkPost: model("BookmarkPost", bookmarkPostSchema),
};
