const router = require("express").Router();
const {
  addAddressMe,
  getAddressMe,
  updateAddressMe,
  deleteAddressMe,
  getAllAddressesMe,
} = require("../controllers/address.ctrl");
const {
  authenticatePermission,
  authenticateUser,
} = require("../middleware/authentication");
router
  .route("/")
  .get(authenticateUser, getAllAddressesMe)
  .post(authenticateUser, addAddressMe);
router
  .route("/:id")
  .patch(authenticateUser, updateAddressMe)
  .delete(authenticateUser, deleteAddressMe)
  .get(authenticateUser, getAddressMe);


module.exports = router;
