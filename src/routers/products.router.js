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
} = require("../controllers/product.ctrl");
const {
  authenticatePermission,
  authenticateUser,
} = require("../middleware/authentication");
router.get("/static", getProductsStatic);
router.delete("/delete-many", deleteManyProduct);
router.route("/").get(getProducts).post(createProduct);
router
  .route("/:slug")
  .get(getProduct)
  .patch(updateProduct)
  .delete(deleteProduct);

// nested router
router.route("/:slug/product-item").post(addProductItem);
module.exports = router;
