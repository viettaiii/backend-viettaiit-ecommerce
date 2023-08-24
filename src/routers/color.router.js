const router = require("express").Router();
const { getColors } = require("../controllers/colorController");

router.route("/").get(getColors);

module.exports = router;
