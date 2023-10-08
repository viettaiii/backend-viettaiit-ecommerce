const router = require("express").Router();
const { addOrderMe, getOrdersMe ,getOrderDetail} = require("../controllers/shopOrder.ctrl");
const {
  authenticatePermission,
  authenticateUser,
} = require("../middleware/authentication");
router
  .route("/")
  .get(authenticateUser, getOrdersMe)
  .post(authenticateUser, addOrderMe);
router.route("/:id").get(getOrderDetail);

module.exports = router;
