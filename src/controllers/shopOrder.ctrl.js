const { ShopOrder } = require("../database/models");
const { BadRequestError, NotFoundError, ConflictError } = require("../errors");
const { StatusCodes } = require("http-status-codes");
const { createResponse } = require("../utils/createResponse");

const addOrder = async (req, res) => {
  const response = createResponse({
    message: "add order",
    status: StatusCodes.OK,
  });
  res.status(response.status).json(response);
};

module.exports = { addOrder };
