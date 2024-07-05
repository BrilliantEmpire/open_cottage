const router = require("express").Router();

const {
  createCategory,
  getCategories,
} = require("../controllers/category.controllers");

router.route("/createCategory").post(createCategory);
router.route("/all").get(getCategories);

module.exports = {
  categoryRoutes: router,
};
