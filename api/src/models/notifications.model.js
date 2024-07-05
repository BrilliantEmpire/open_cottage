const { Schema, model } = require("mongoose");

exports.Notification = model(
  "Notification",
  new Schema(
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
      title: {
        type: String,
        required: true,
      },
      body: {
        type: String,
      },
      isRead: {
        type: Boolean,
        default: false,
      },
      product: {
        type: Schema.Types.ObjectId,
        ref: "Recipe",
      },
      type: {
        type: String,
        // enum: ["comment", "made", "follow"],
      },
      reciever: {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    },
    {
      timestamps: true,
    }
  )
);
