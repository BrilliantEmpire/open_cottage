const { upload } = require("../upload/upload");
const router = require("express").Router();

// Change uploadSingle to accept multiple files
const uploadMultiple = upload(process.env.AWS_BUCKET_NAME).array("images", 10);

router.post("/", (req, res) => {
  try {
    uploadMultiple(req, res, (err) => {
      if (err) {
        return res.status(400).json({
          flag: false,
          message: err.message,
        });
      }

      // Extract file locations from req.files and construct an array of image URLs
      const imageUrls = req.files.map((file) => file.location);

      res.status(200).json({ success: true, imageUrls });
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
});

// Single file upload for user profile
const uploadSingle = upload(process.env.AWS_BUCKET_NAME).single("profileImage");

router.post("/profile-image", (req, res) => {
  try {
    uploadSingle(req, res, (err) => {
      if (err) {
        return res.status(400).json({
          success: false,
          message: err.message,
        });
      }

      const imageUrl = req.file.location;

      res.status(200).json({ success: true, imageUrl });
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
});

module.exports = { uploadRoutes: router };
