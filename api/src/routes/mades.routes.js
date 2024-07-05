const router = require("express").Router();
const { addMade, getMadeByUser } = require("../controllers/made.controller");
const { authProtect } = require("../middlewares/auth.middleware");

router.route("/addMade").post(authProtect, addMade);
router.route("/getMadeByUser/:id").get(authProtect, getMadeByUser);

module.exports = {
  madeRoutes: router,
};
