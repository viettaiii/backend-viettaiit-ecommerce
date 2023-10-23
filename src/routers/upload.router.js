const {
  uploadSingleHelper,
  uploadMultipleHelper,
} = require("../helpers/uploadHelper");

const router = require("express").Router();
const { uploadSingle, uploadMultiple } = require("../controllers/upload.ctrl");

router.post("/single-product", uploadSingleHelper("products"), uploadSingle);
router.post(
  "/multiple-products",
  uploadMultipleHelper("products"),
  uploadMultiple
);
router.post("/single-category", uploadSingleHelper("categories"), uploadSingle);

router.post(
  "/multiple-categories",
  uploadMultipleHelper("categories"),
  uploadMultiple
);

module.exports = router;
