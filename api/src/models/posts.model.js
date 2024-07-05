const { Schema, model } = require("mongoose");

exports.Post = model(
  "Post",
  new Schema(
    {
      description: {
        type: String,
      },
      images: {
        type: [String],
      },
      user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      isPublic: {
        type: Boolean,
        default: true,
      },
      likes: [
        {
          type: Schema.Types.ObjectId,
          ref: "User",
        },
      ],
      is_active: {
        type: Boolean,
        default: true,
      },
      number_of_likes: {
        type: Number,
        default: 0,
      },
      number_of_comments: {
        type: Number,
        default: 0,
      },
      number_of_saves: {
        type: Number,
        default: 0,
      },
      number_of_shares: {
        type: Number,
        default: 0,
      },
    },
    {
      timestamps: true,
    }
  )
);
