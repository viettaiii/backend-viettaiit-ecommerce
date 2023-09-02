const router = require("express").Router();
const {
  addAddressToUser,
  getAddressUser,
  updateAddressUser,
  deleteAddressUser,
  getAllAddresses,
} = require("../controllers/address.ctrl");

router
  .route("/users/:userId")
  .post(addAddressToUser)
  .get(getAddressUser)
  .patch(updateAddressUser)
  .delete(deleteAddressUser);

router.route("/").get(getAllAddresses);

module.exports = router;
