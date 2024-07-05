const Preference = require("../models/preference.model");

exports.getPreferences = async (req, res) => {
  try {
    const preference = await Preference.findOne({ user: req.user._id });
    res.status(200).json(preference);
  } catch (error) {
    res.status(500).json({
      code: 500,
      success: false,
      message: "Failed to get preferences",
      error: error.message,
    });
  }
};

exports.updatePreferences = async (req, res) => {
  try {
    const { notificationsEnabled } = req.body;
    const preference = await Preference.findOneAndUpdate(
      { user: req.user._id },
      { notificationsEnabled },
      { new: true, upsert: true }
    );
    res.status(200).json({
      code: 200,
      success: true,
      message: "Preferences updated successfully",
      preference,
    });
  } catch (error) {
    res.status(500).json({
      code: 500,
      success: false,
      message: "Failed to update preferences",
      error: error.message,
    });
  }
};

//this is for user food liked and allergic to
// Get all food preferences
exports.getFoodPreferences = async (req, res) => {
  try {
    const preference = await Preference.findOne({ user: req.user._id });
    res.status(200).json(preference.foodPreferences);
  } catch (error) {
    res.status(500).json({
      code: 500,
      success: false,
      message: "Failed to get food preferences",
      error: error.message,
    });
  }
};

// Add new food preferences
exports.addFoodPreferences = async (req, res) => {
  try {
    const { likedFood } = req.body;
    const preference = await Preference.findOneAndUpdate(
      { user: req.user._id },
      { $push: { foodPreferences: likedFood } },
      { new: true }
    );
    res.status(200).json(preference.foodPreferences);
  } catch (error) {
    res.status(500).json({
      code: 500,
      success: false,
      message: "Failed to add food preferences",
      error: error.message,
    });
  }
};

// Remove food preferences
exports.removeFoodPreferences = async (req, res) => {
  try {
    const { tag } = req.body;
    const preference = await Preference.findOneAndUpdate(
      { user: req.user._id },
      { $pull: { foodPreferences: tag } },
      { new: true }
    );
    res.status(200).json(preference.foodPreferences);
  } catch (error) {
    res.status(500).json({
      code: 500,
      success: false,
      message: "Failed to remove food preferences",
      error: error.message,
    });
  }
};

// Get all food allergies
exports.getFoodAllergies = async (req, res) => {
  try {
    const preference = await Preference.findOne({ user: req.user._id });
    res.status(200).json(preference.foodAllergies);
  } catch (error) {
    res.status(500).json({
      code: 500,
      success: false,
      message: "Failed to get food allergies",
      error: error.message,
    });
  }
};

// Add new food allergies
exports.addFoodAllergies = async (req, res) => {
  try {
    const { allergies } = req.body;
    const preference = await Preference.findOneAndUpdate(
      { user: req.user._id },
      { $push: { foodAllergies: allergies } },
      { new: true }
    );
    res.status(200).json(preference.foodAllergies);
  } catch (error) {
    res.status500().json({
      code: 500,
      success: false,
      message: "Failed to add food allergies",
      error: error.message,
    });
  }
};

// Remove food allergies
exports.removeFoodAllergies = async (req, res) => {
  try {
    const { allergic } = req.body;
    const preference = await Preference.findOneAndUpdate(
      { user: req.user._id },
      { $pull: { foodAllergies: allergic } },
      { new: true }
    );
    res.status(200).json(preference.foodAllergies);
  } catch (error) {
    res.status(500).json({
      code: 500,
      success: false,
      message: "Failed to remove food allergies",
      error: error.message,
    });
  }
};
