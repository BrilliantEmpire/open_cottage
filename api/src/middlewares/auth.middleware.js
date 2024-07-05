const jwt = require("jsonwebtoken");
const User = require("../models/users.model");
const { Admin } = require("../models/admin.model");

exports.authProtect = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRETE);
      const user = await User.findById(decoded.id).select("-password");

      if (user) {
        req.user = user;
        return next();
      } else {
        const admin = await Admin.findById(decoded.id).select("-password");
        req.user = admin;
        return next();
      }
    } catch (err) {
      return res.status(401).json({
        success: false,
        message: "Not authorized, No token provided",
        error: "Not authorized, Token is not valid",
      });
    }
  }

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Not authorized, No token provided",
      error: "Not authorized, No token provided",
    });
  }
};

// isAdmin middleware
exports.isAdmin = (req, res, next) => {
  if (req.user && req.user.userType === "admin") {
    next();
  } else {
    return res.status(401).json({
      success: false,
      message: "Not authorized, No token provided",
      error: "Not authorized as an admin",
    });
  }
};
