const { StatusCodes } = require("http-status-codes");
const { createResponse } = require("../utils/createResponse");

const { Color } = require("../database/models");
const getColors = async (req, res) => {
  const colors = await Color.findAll({});
  const response = createResponse({
    message: "Lấy tất cả màu sản phẩm thành công!",
    status: StatusCodes.OK,
    data: colors,
  });
  res.status(response.status).json(response);
};

module.exports = { getColors };
