const { Schema, model } = require("mongoose");

const followerSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  follower: { type: Schema.Types.ObjectId, ref: "User", required: true },
});

module.exports = {
  Follower: model("Follower", followerSchema),
};
