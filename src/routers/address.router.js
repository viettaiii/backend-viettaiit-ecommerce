const router = require("express").Router();
const {
  addAddressToUser,
  getAddressUser,
} = require("../controllers/address.ctrl");

router.route("/:userId/users").post(addAddressToUser).get(getAddressUser);

module.exports = router;
