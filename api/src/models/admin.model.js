const { Schema, model } = require("mongoose");
const jwt = require("jsonwebtoken");

const adminSchema = new Schema(
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
    full_name: {
      type: String,
    },
    userType: {
      type: String,
      enum: ["admin", "user"],
      default: "admin",
    },
    password: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Admin = model("Admin", adminSchema);

module.exports = Admin;
