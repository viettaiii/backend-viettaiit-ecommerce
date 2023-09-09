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
  getProductHotSales,
} = require("../controllers/product.ctrl");
const {
  authenticatePermission,
  authenticateUser,
} = require("../middleware/authentication");
router.get("/static", getProductsStatic);

// GET PRODUCT HOT SALE
router.route("/hot-sales").get(getProductHotSales);
router.delete(
  "/delete-many",
  authenticateUser,
  authenticatePermission("admin"),
  deleteManyProduct
);
router.route("/").get(getProducts).post(createProduct);
router
  .route("/:slug")
  .get(getProduct)
  .patch(updateProduct)
  .delete(deleteProduct);
// nested router
router.route("/:slug/product-item").post(addProductItem);

module.exports = router;
