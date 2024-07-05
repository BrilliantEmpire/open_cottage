const { Made } = require("../models/mades.model");
const { Notification } = require("../models/notifications.model");
const { Recipe } = require("../models/recipe.model");
const {
  checkNotificationIsEnabled,
} = require("../utils/check.notifcation.enable");

exports.addMade = async (req, res) => {
  const { recipe } = req.body;

  const user = req.user.id;

  try {
    const exists = await Made.findOne({ user, recipe });

    if (exists) {
      return res.status(400).json({
        code: 400,
        success: false,
        message: "Recipe Details already exists",
        error: "Recipe Details already exists",
      });
    }

    const newMade = await Made.create({
      user,
      recipe,
    });

    if (newMade) {
      const mades = await Recipe.findById(recipe);

      await Recipe.findByIdAndUpdate(
        recipe,
        {
          mades: mades.mades + 1,
        },
        {
          new: true,
          runValidators: true,
        }
      );
      //toggle notification for the recipe made 
      const enable = await checkNotificationIsEnabled(recipe.user);
      if (enable) {
        await Notification.create({
          user,
          reciever: recipe.user,
          title: "Recipe Made",
          body: `${req.user.full_name} made a new recipe`,
          type: "made",
        });
      }
    } else {
      return res.status(404).json({
        code: 404,
        success: false,
        message: "Recipe Details not found",
        error: "Recipe Details not found",
      });
    }

    return res.status(200).json({
      code: 200,
      success: true,
      message: "Recipe Details added successfully",
      data: newMade,
    });
  } catch (error) {
    res.status(500).json({
      code: 500,
      success: false,
      message: "Failed to retrieve recipe",
      error: error.message,
    });
  }
};

// get a recipe made by a user
exports.getMadeByUser = async (req, res) => {
  try {
    const user = req.user.id;

    const made = await Made.findOne({
      $and: [{ user }, { recipe: req.params.id }],
    })
      .populate("recipe")
      .select({ __v: 0 })
      .lean();

    if (!made) {
      return res.status(404).json({
        code: 404,
        success: false,
        isMade: false,
        message: "Recipe Details not found",
        error: "Recipe Details not found",
      });
    }

    res.status(200).json({
      code: 200,
      success: true,
      message: "Recipe Details retrieved successfully",
      isMade: true,
      data: made,
    });
  } catch (error) {
    res.status(500).json({
      code: 500,
      success: false,
      message: "Failed to retrieve recipe",
      error: error.message,
    });
  }
};
