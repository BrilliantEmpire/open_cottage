const { Schema, model } = require("mongoose");

const categorySchema = new Schema({
  name: {
    type: String,
    unique: true,
  },
  slug: {
    type: String,
    unique: true,
  },
  description: {
    type: String,
  },
  is_active: {
    type: Boolean,
    default: true,
  },
  image: {
    type: String,
  },
});

module.exports = {
  Category: model("Category", categorySchema),
};
