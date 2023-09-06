const router = require("express").Router();
const {
  getReviews,
  getReview,
  createReview,
  deleteReview,
  updateReview,
  getReviewsProduct,
} = require("../controllers/userReview.ctrl");
const { authenticateUser } = require("../middleware/authentication");

router.route("/").get(getReviews).post(authenticateUser, createReview);
router
  .route("/:reviewId")
  .get(getReview)
  .delete(authenticateUser, deleteReview)
  .patch(authenticateUser, updateReview);
router.get("/products/:productId", getReviewsProduct);

module.exports = router;
