const router = require("express").Router();
const {
  createRecipe,
  getAllRecipes,
  getTopRecipes,
  searchRecipes,
  getRecipeBySlug,
  getRecipeByCategory,
  getMyCreatedRecipes,
  deleteRecipeById,
} = require("../controllers/recipe.controller");
const { authProtect } = require("../middlewares/auth.middleware");

router.route("/createRecipe").post(authProtect, createRecipe);
router.route("/all").get(getAllRecipes);
//my recipes
router.route("/getMyCreatedRecipes").get(authProtect, getMyCreatedRecipes);
router.route("/removeMyRecipe/:id").delete(authProtect, deleteRecipeById);

router.route("/search").get(searchRecipes);
router.route("/category/:category").get(getRecipeByCategory);
router.route("/toppicks").get(getTopRecipes);
router.route("/singleRecipe/:slug").get( getRecipeBySlug);

module.exports = {
  recipeRoutes: router,
};
