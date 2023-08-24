const { StatusCodes } = require("http-status-codes");
const { createResponse } = require("../utils/createResponse");

const { Provider } = require("../models");
const getProviders = async (req, res) => {
  const providers = await Provider.findAll({});
  const response = createResponse({
    message: "Lấy tất cả nhà cung cấp sản phẩm thành công!",
    status: StatusCodes.OK,
    data: providers,
  });
  res.status(response.status).json(response);
};

module.exports = { getProviders };
