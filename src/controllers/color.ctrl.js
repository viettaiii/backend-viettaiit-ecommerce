const { StatusCodes } = require("http-status-codes");
const { createResponse } = require("../utils/createResponse");

const { Color } = require("../database/models");
const getColors = async (req, res) => {
  const colors = await Color.findAll({});
  const response = createResponse({
    message: "success",
    status: StatusCodes.OK,
    data: colors,
  });
  res.status(response.status).json(response);
};

module.exports = { getColors };
