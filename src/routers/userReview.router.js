const router = require("express").Router();
const {
  getReviews,
  getReview,
  createReview,
  deleteReview,
  updateReview,
} = require("../controllers/userReview.ctrl");
const { authenticateUser } = require("../middleware/authentication");

router.route("/").get(getReviews).post(authenticateUser, createReview);
router
  .route("/:reviewId")
  .get(getReview)
  .delete(authenticateUser, deleteReview)
  .patch(authenticateUser, updateReview);

module.exports = router;
