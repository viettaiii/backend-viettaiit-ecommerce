const router = require("express").Router();
const {
  authenticatePermission,
  authenticateUser,
} = require("../middleware/authentication");
const {
  addOrUpdateCartItemMe,
  getCartMe,
  deleteCartItemMe,
} = require("../controllers/shoppingCart.ctrl");

router
  .route("/")
  .post(authenticateUser, addOrUpdateCartItemMe)
  .get(authenticateUser, getCartMe);

router
  .route("/shopping-cart-item/:id")
  .delete(authenticateUser, deleteCartItemMe);

module.exports = router;
