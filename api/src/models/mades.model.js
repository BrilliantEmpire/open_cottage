const { Schema, model } = require("mongoose");

const madeSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User" },
  recipe: { type: Schema.Types.ObjectId, ref: "Recipe" },
});

module.exports = {
  Made: model("Made", madeSchema),
};
