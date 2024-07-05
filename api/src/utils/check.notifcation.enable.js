const Preference = require("../models/preference.model");

exports.checkNotificationIsEnabled = async (userId) => {
  try {
    const preference = await Preference.findOne({ user: userId });

    if (preference.notificationsEnabled) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
};
