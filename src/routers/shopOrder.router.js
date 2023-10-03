const router = require("express").Router();
const { addOrder } = require("../controllers/shopOrder.ctrl");

router.route("/").get(addOrder);

module.exports = router;
