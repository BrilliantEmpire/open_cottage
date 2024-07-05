const User = require("../models/users.model");
const { generateTokens } = require("../utils/generate.token");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const bcrypt = require("bcryptjs");

//@desc Add a new user
//@method POST
//@route /api/v1/auth/register
//@access public
exports.registerUser = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      const { full_name, password, email } = req.body;

      const hashpassword = await bcrypt.hash(password, 10);

      const user = await User.create({
        full_name,
        email,
        password: hashpassword,
      });

      const results = user.toObject();
      delete results.password;
      res.status(201).json({
        success: true,
        data: {
          ...results,
          token: generateTokens(user._id),
        },
      });
    } else {
      res.status(400).json({
        success: false,
        error: "User already exists",
      });
    }
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

//@desc Login a user
//@method POST
//@route /api/v1/auth/login
//@access public
exports.logInUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        error: "User not found",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        code: 400,
        success: false,
        error: "Invalid credentials",
      });
    }

    const results = user.toObject();
    delete results.password;
    res.status(201).json({
      code: 201,
      success: true,
      data: { ...results, token: generateTokens(user._id) },
    });
  } catch (error) {
    res.status(500).json({ code: 500, success: false, error: error.message });
  }
};

//@desc Add a new user
//@method POST
//@route /api/v1/auth/provider
//@access public
exports.registerUserWithProvider = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      const { password } = req.body;

      const hashpassword = await bcrypt.hash(password, 10);

      const user = await User.create({
        ...req.body,
        password: hashpassword,
      });

      const results = user.toObject();
      delete results.password;
      return res.status(201).json({
        success: true,
        data: {
          ...results,
          token: generateTokens(user._id),
        },
      });
    } else {
      const { email, password } = req.body;
      const user = await User.findOne({ email, is_active: { $ne: false } });

      if (!user) {
        return res.status(404).json({
          success: false,
          error: "User not found",
        });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({
          success: false,
          error: "Invalid credentials",
        });
      }

      const results = user.toObject();
      delete results.password;
      return res.status(201).json({
        success: true,
        data: { ...results, token: generateTokens(user._id) },
      });
    }
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// admin login

exports.adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email, is_active: { $ne: false } });
    if (!user) {
      return res.status(404).json({
        code: 404,
        success: false,
        message: "User not found",
        error: "Admin user not found",
      });
    }

    if (user.userType !== "admin") {
      return res.status(400).json({
        code: 400,
        success: false,
        message: "Invalid credentials",
        error: "Invalid credentials",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        code: 400,
        success: false,
        message: "Invalid credentials",
        error: "Invalid credentials",
      });
    }

    const results = user.toObject();
    delete results.password;
    return res.status(201).json({
      success: true,
      data: { ...results, token: generateTokens(user._id) },
    });
  } catch (error) {
    return res
      .status(400)
      .json({ code: 400, success: false, message: error.message });
  }
};

exports.transporter = nodemailer.createTransport({
  host: "smtp.googlemail.com",
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: "testinvennico@gmail.com", // Your Gmail address
    pass: "edztmbnuqbiauacd", // Your Gmail password or app-specific password
  },
});

exports.forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found with that email address.",
      });
    }

    // Generate a password reset token
    const resetToken = crypto.randomBytes(20).toString("hex");
    const resetTokenExpiry = Date.now() + 3600000; // Token expires in 1 hour (3600000 milliseconds)

    // Update user document with reset token and expiry
    user.resetPasswordToken = resetToken;
    user.resetPasswordTokenExpiry = resetTokenExpiry;
    await user.save();

    // Send password reset email
    const resetPasswordLink = `http://localhost:3000/reset-password?token=${resetToken}`;

    const mailOptions = {
      from: "testinvennico@gmail.com",
      to: email,
      subject: "Password Reset Request",
      html: `Click <a href="${resetPasswordLink}">here</a> to reset your password.`,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({
      success: true,
      message: "Password reset instructions have been sent to your email.",
    });
  } catch (error) {
    console.error("Error sending password reset email:", error);
    res.status(500).json({
      success: false,
      message: "Failed to send password reset email.",
    });
  }
};
exports.resetPassword = async (req, res) => {
  const { token, newPassword } = req.body;

  try {
    // Find user by reset token and check expiry
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordTokenExpiry: { $gt: Date.now() }, // Check if token is not expired
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired password reset token.",
      });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update user's password and clear reset token
    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordTokenExpiry = undefined;
    await user.save();

    res.status(200).json({
      success: true,
      message: "Password reset successfully.",
    });
  } catch (error) {
    console.error("Error resetting password:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to reset password." });
  }
};

// set new password
exports.setNewPassword = async (req, res) => {
  try {
    const { currentPassword, password } = req.body;

    const user = await User.findById(req.user._id);
    const isMatch = await bcrypt.compare(currentPassword, user.password);

    if (!isMatch) {
      return res.status(400).json({
        code: 400,
        success: false,
        message: "Current password is incorrect",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    user.password = hashedPassword;
    await user.save();
    return res.status(200).json({
      code: 200,
      success: true,
      message: "Password updated successfully",
    });
  } catch (error) {
    return res.status(500).json({
      code: 500,
      success: false,
      message: "Internal server error",
    });
  }
};
