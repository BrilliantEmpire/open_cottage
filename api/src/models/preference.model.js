const { Schema, model } = require("mongoose");

const preferenceSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    unique: true,
  },
  notificationsEnabled: {
    type: Boolean,
    default: true,
  },
  foodPreferences: {
    type: [String],
    default: [],
  },
  foodAllergies: {
    type: [String],
    default: [],
  },
});

const Preference = model("Preference", preferenceSchema);

module.exports = Preference;
