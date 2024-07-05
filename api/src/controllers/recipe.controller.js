const { Recipe } = require("../models/recipe.model");
const upload = require("../upload/upload");
const { uploadImages } = require("../services/upload.service");
const { Made } = require("../models/mades.model");
const { RecipeComment } = require("../models/comment.model");

exports.createRecipe = async (req, res) => {
  try {
    const {
      title,
      description,
      preparation_time,
      cook_time,
      servings,
      ingredients,
      nutrition_facts,
      directions,
      images,
      category,
    } = req.body;

    // Create new recipe document with combined data
    const newRecipe = await Recipe.create({
      title,
      slug: title.toLowerCase().replace(/ /g, "-"),
      description,
      preparation_time,
      cook_time,
      servings,
      ingredients,
      nutrition_facts,
      category,
      directions,
      user: req.user.id,
      images,
    });

    return res.status(200).json({
      code: 200,
      success: true,
      message: "Recipe added successfully",
      data: newRecipe,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      code: 500,
      success: false,
      error: "Internal server error",
      message: error.message,
    });
  }
};

// get all recipes in the system
exports.getAllRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.find()
      .select({ __v: 0 })
      .populate("user")
      .sort({ createdAt: -1 })
      .lean();
    if (!recipes) {
      return res.status(404).json({
        message: "Recipe Details not found",
      });
    }
    res.status(200).json(recipes);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to retrieve recipe",
      error: error.message,
    });
  }
};

// get top recipes
exports.getTopRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.find()
      .populate("user")
      .select({ __v: 0 })
      .sort({ ratings: "desc" })
      .limit(4)
      .lean();
    if (!recipes) {
      return res.status(404).json({
        message: "Recipe Details not found",
      });
    }
    res.status(200).json(recipes);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to retrieve recipe",
      error: error.message,
    });
  }
};

// search recipes by any text
exports.searchRecipes = async (req, res) => {
  try {
    const searchTerm = req.query.q;

    const recipes = await Recipe.find({ $text: { $search: searchTerm } })
      .populate("user")
      .select({ __v: 0 })
      .lean();
    if (!recipes) {
      return res.status(404).json({
        message: "Recipe Details not found",
      });
    }
    res.status(200).json(recipes);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to retrieve recipe",
      error: error.message,
    });
  }
};

// get recipe by slug
exports.getRecipeBySlug = async (req, res) => {
  try {
    const slug = req.params.slug;

    // Find the recipe by slug and populate the user field
    const recipe = await Recipe.findOne({ slug }).populate("user");

    // If the recipe is not found, return a 404 response
    if (!recipe) {
      return res.status(404).json({
        success: false,
        message: "Recipe Details not found",
        error: "Recipe Details not found",
      });
    }

    // Find comments associated with the recipe and populate the user field
    const comments = await RecipeComment.find({ recipe: recipe._id }).populate("user");

    // Send the recipe details along with comments
    res.status(200).json({ ...recipe._doc, comments });
  } catch (error) {
    // Handle any errors that occur during the process
    res.status(500).json({
      success: false,
      message: "Failed to retrieve recipe",
      error: error.message,
    });
  }
};

//get recipes by a category
exports.getRecipeByCategory = async (req, res) => {
  try {
    const category = req.params.category;
    const recipes = await Recipe.find({ category }).select({ __v: 0 }).lean();
    if (!recipes) {
      return res.status(404).json({
        code: 404,
        success: false,
        message: "Recipe Details not found",
      });
    }
    res.status(200).json(recipes);
  } catch (error) {
    res.status(500).json({
      code: 500,
      success: false,
      message: "Failed to retrieve recipe",
      error: error.message,
    });
  }
};

//get my created recipes
exports.getMyCreatedRecipes = async (req, res) => {
  try {
    const userId = req.user.id;
    const recipes = await Recipe.find({ user: userId })
      .sort({ createdAt: -1 })
      .select({ __v: 0 })
      .lean();

    res.status(200).json(recipes);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to retrieve recipe",
      error: error.message,
    });
  }
};

exports.getRecipeByUserId = async (req, res) => {
  try {
    const userId = req.user.id;
    const recipeDetails = await Recipe.find({ user: userId })
      .select({ __v: 0 })
      .lean();
    if (!recipeDetails) {
      return res.status(404).json({
        message: "Recipe Details not found",
      });
    }
    res.status(200).json(business);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to retrieve recipe",
      error: error.message,
    });
  }
};

exports.updateRecipeById = async (req, res) => {
  try {
    const recipeData = req.body;

    const recipeDetails = await Recipe.findByIdAndUpdate({ user: userId })
      .select({ __v: 0, _id: 0 })
      .lean();
    if (!recipeDetails) {
      return res.status(404).json({
        message: "Recipe Details updated successfully",
      });
    }
    res.status(200).json(business);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update recipe",
      error: error.message,
    });
  }
};

exports.deleteRecipeById = async (req, res) => {
  try {
    const recipeId = req.params.id;
    const recipeDetails = await Recipe.findByIdAndDelete({ _id: recipeId })
      .select({ __v: 0, _id: 0 })
      .lean();
    if (!recipeDetails) {
      return res.status(404).json({
        message: "Recipe Details deleted successfully",
      });
    }
    res.status(200).json(recipeDetails);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete recipe",
      error: error.message,
    });
  }
};
