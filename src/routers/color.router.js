const router = require("express").Router();
const { getColors } = require("../controllers/color.ctrl");

router.route("/").get(getColors);

module.exports = router;
