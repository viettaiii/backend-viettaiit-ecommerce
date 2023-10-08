const { StatusCodes } = require("http-status-codes");
const { UserReview, Product, User } = require("../database/models");
const { createResponse } = require("../utils/createResponse");
const { Op } = require("sequelize");
const {
  BadRequestError,
  NotFoundError,
  ForBiddenError,
  ConflictError,
} = require("../errors");
const { checkPermission } = require("../utils/permission");

const getReviews = async (req, res) => {
  const { count, rows } = await UserReview.findAndCountAll({});
  const response = createResponse({
    message: "Get all reviews",
    status: StatusCodes.OK,
    // page,
    // perPage: limit,
    total: count,
    // totalPages: Math.ceil(count / limit),
    data: rows,
  });
  res.status(response.status).json(response);
};

const createReview = async (req, res) => {
  const { ratingValue, comment, productId } = req.body;
  const { userId } = req.userInfo;
  if (!ratingValue || !comment || !userId || !productId)
    throw new BadRequestError("Vui lòng cung cấp đầy đủ thông tin!");
  if (ratingValue > 6) throw new BadRequestError("rating  must be 1 --> 5 ");
  const isProduct = await Product.findByPk(productId);
  if (!isProduct) throw new NotFoundError("Sản phẩm không tìm thấy!");
  const isReview = await UserReview.findOne({ where: { userId, productId } });
  if (isReview)
    throw new ConflictError(
      "Mọi người chỉ có đánh giá về một sản phẩm và có thể cập nhật xếp hạng và nhận xét"
    );
  await UserReview.create({ ...req.body, userId });
  const response = createResponse({
    message: "Thêm đánh giá thánh công!",
    status: StatusCodes.OK,
  });
  res.status(response.status).json(response);
};

const getReview = async (req, res) => {
  const { reviewId } = req.params;
  const review = await UserReview.findByPk(reviewId);
  if (!review) throw new NotFoundError("Đánh giá không tìm thấy!");
  const response = createResponse({
    message: "success",
    status: StatusCodes.OK,
    data: review,
  });
  res.status(response.status).json(response);
};

const deleteReview = async (req, res) => {
  const { reviewId } = req.params;
  const review = await UserReview.findByPk(reviewId);
  if (!review) throw new NotFoundError("Đánh giá không tìm thấy!");
  const isCheckPermission = checkPermission(review.userId, req.userInfo);
  if (!isCheckPermission) throw new ForBiddenError("Sự cho phép bị từ chối!");
  await review.destroy();
  const response = createResponse({
    message: "deleted successfully",
    status: StatusCodes.OK,
  });
  res.status(response.status).json(response);
};

const updateReview = async (req, res) => {
  const { reviewId } = req.params;
  const { ratingValue, comment } = req.body;
  if (!ratingValue || !comment)
    throw new BadRequestError("Vui lòng cung cấp đầy đủ thông tin!");
  const review = await UserReview.findByPk(reviewId);
  if (!review) throw new NotFoundError("Đánh giá không tìm thấy!");
  const isCheckPermission = checkPermission(review.userId, req.userInfo);
  if (!isCheckPermission) throw new ForBiddenError("Sự cho phép bị từ chối!");
  if (ratingValue) review.ratingValue = ratingValue;
  if (comment) review.comment = comment;
  await review.save();
  const response = createResponse({
    message: "updated successfully",
    status: StatusCodes.OK,
  });
  res.status(response.status).json(response);
};

// get all review of a product

const getReviewsProduct = async (req, res) => {
  const { productId } = req.params;
  const reviews = await UserReview.findAll({
    where: { productId },
  });
  const count = reviews.length;
  let total = 0;
  reviews.forEach((review) => {
    total += review.ratingValue;
  });
  const response = createResponse({
    message: "get reviews of a product",
    status: StatusCodes.OK,
    data: reviews,
    total: count,
    averageRating: total / count,
  });
  res.status(response.status).json(response);
};
module.exports = {
  getReviews,
  getReview,
  createReview,
  deleteReview,
  updateReview,
  getReviewsProduct,
};
