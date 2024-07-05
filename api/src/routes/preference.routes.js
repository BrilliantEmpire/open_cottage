const router = require("express").Router();
const { authProtect } = require("../middlewares/auth.middleware");
const {
  getPreferences,
  updatePreferences,
  getFoodPreferences,
  removeFoodAllergies,
  addFoodAllergies,
  removeFoodPreferences,
  addFoodPreferences,
  getFoodAllergies,
} = require("../controllers/preference.controller");

router.route("/").get(authProtect, getPreferences);
router.route("/update").put(authProtect, updatePreferences);

//food they liked 
router.route("/food").get(authProtect, getFoodPreferences);
router.route("/food").post(authProtect, addFoodPreferences);
router.route("/food").delete(authProtect, removeFoodPreferences);

// Food Allergies Routes
router.route("/allergies").get(authProtect, getFoodAllergies);
router.route("/allergies").post(authProtect, addFoodAllergies);
router.route("/allergies").delete(authProtect, removeFoodAllergies);

module.exports = {
  preferenceRoute: router,
};
