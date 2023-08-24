const router = require("express").Router();
const { getProviders} = require("../controllers/providerController");

router.route("/").get(getProviders);

module.exports = router;
