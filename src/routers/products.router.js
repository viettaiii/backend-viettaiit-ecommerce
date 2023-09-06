const router = require("express").Router();
const {
  getProducts,
  createProduct,
  getProductsStatic,
  updateProduct,
  deleteProduct,
  getProduct,
  addProductItem,
  deleteManyProduct,
  getReviewsProduct,
} = require("../controllers/product.ctrl");
const {
  authenticatePermission,
  authenticateUser,
} = require("../middleware/authentication");
router.get("/static", getProductsStatic);
router.delete(
  "/delete-many",
  authenticateUser,
  authenticatePermission("admin"),
  deleteManyProduct
);
router
  .route("/")
  .get(getProducts)
  .post(authenticateUser, authenticatePermission("admin"), createProduct);
router
  .route("/:slug")
  .get(getProduct)
  .patch(authenticateUser, authenticatePermission("admin"), updateProduct)
  .delete(authenticateUser, authenticatePermission("admin"), deleteProduct);


// nested router
router.route("/:slug/product-item").post(addProductItem);
module.exports = router;
