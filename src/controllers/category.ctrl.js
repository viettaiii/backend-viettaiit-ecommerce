const { StatusCodes } = require("http-status-codes");
const { createResponse } = require("../utils/createResponse");

const { Category } = require("../database/models");
const getCategories = async (req, res) => {
  const categories = await Category.findAll({});
  const response = createResponse({
    message: "Lấy tất cả loại sản phẩm thành công!",
    status: StatusCodes.OK,
    data: categories,
  });
  res.status(response.status).json(response);
};

module.exports = { getCategories };
