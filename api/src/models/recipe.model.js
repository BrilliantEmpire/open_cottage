const { Schema, model } = require("mongoose");

const recipeSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
    },
    description: {
      type: String,
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    preparation_time: String,
    cook_time: String,
    servings: {
      type: String,
    },
    ratings: {
      type: Number,
      default: 0,
    },
    number_of_savings: {
      type: Number,
      default: 0,
    },
    number_of_rating: {
      type: Number,
      default: 0,
    },
    number_of_reviews: {
      type: Number,
      default: 0,
    },
    is_active: {
      type: Boolean,
      default: true,
    },
    mades: {
      type: Number,
      default: 0,
    },
    ingredients: [],
    nutrition_facts: [
      {
        nutrient: String,
        cal: Number,
        unit: String,
      },
    ],
    directions: {
      type: [
        {
          id: String,
          content: String,
        },
      ],
      required: false,
      //removed as per client requirements
      // validate: {
      //   validator: function (val) {
      //     return val.length > 0; // Ensure there is at least one direction
      //   },
      //   message: "Directions must have at least one step",
      // },
    },
    images: {
      type: [String], // Array of strings (image URLs or paths)
      required: true,
      validate: {
        validator: function (val) {
          return val.length > 0; // Ensure there is at least one image
        },
        message: "Images array must contain at least one image URL or path",
      },
    },
  },
  {
    timestamps: true,
  }
);

// Add a text index to the schema
recipeSchema.index({
  title: "text",
  description: "text",
  ingredients: "text",
  directions: "text",
});

exports.Recipe = model("Recipe", recipeSchema);
