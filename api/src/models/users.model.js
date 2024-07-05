const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const { Schema } = mongoose;

const socialLinkSchema = new Schema({
  platform: { type: String, required: false },
  link: { type: String, required: false },
});

const userSchema = new Schema(
  {
    email: {
      type: String,
      unique: true,
      validate: {
        validator: function (v) {
          return /\S+@\S+\.\S+/.test(v);
        },
        message: "Invalid email format",
      },
    },
    profile_image: {
      type: String,
    },
    about: {
      type: String,
    },
    loginType: {
      type: String,
      enum: ["local", "google", "facebook"],
      default: "local",
    },
    cover_image: {
      type: String,
    },
    userType: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
    followers: {
      type: Number,
      default: 0,
    },
    social_links: {
      type: [socialLinkSchema],
      default: [],
    },
    full_name: {
      type: String,
    },
    is_active: {
      type: Boolean,
      default: true,
    },
    password: {
      type: String,
    },
    preference: {
      type: Schema.Types.ObjectId,
      ref: "Preference",
    },
  },
  {
    timestamps: true,
  }
);

// Generate JWT token for authentication
userSchema.methods.generateAuthToken = function () {
  const user = this;
  const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
  return token;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
