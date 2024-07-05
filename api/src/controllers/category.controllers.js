const { default: slugify } = require("slugify");
const { Category } = require("../models/category.model");

// Create new category
exports.createCategory = async (req, res) => {
  try {
    const slug = slugify(req.body.name);
    const existingCategory = await Category.findOne({
      slug,
    });

    if (existingCategory) {
      return res.status(400).json({
        code: 400,
        success: false,
        message: "Category already exists",
      });
    }

    const newCategory = await Category.create({
      ...req.body,
      slug,
    });

    res.status(200).json(newCategory);
  } catch (error) {
    res.status(500).json({
      code: 500,
      success: false,
      message: "Failed to create category",
      error: error.message,
    });
  }
};

// Get all categories
exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({
      code: 500,
      success: false,
      message: "Failed to retrieve categories",
      error: error.message,
    });
  }
};
