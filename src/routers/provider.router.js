const router = require("express").Router();
const { getProviders} = require("../controllers/provider.ctrl");

router.route("/").get(getProviders);

module.exports = router;
