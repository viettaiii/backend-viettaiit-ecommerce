const { Address } = require("../database/models");
const {
  BadRequestError,
  NotFoundError,
  UnauthorizedError,
  ConflictError,
  UnprocessableEntityError,
  ForBiddenError,
} = require("../errors");
const { StatusCodes } = require("http-status-codes");
const { createResponse } = require("../utils/createResponse");

const addAddressToUser = async (req, res) => {
  const {
    params: { userId },
    body: { phoneNumber, province, district, wards, country },
  } = req;
  if (!phoneNumber || !province || !district || !wards || !country)
    throw new BadRequestError("info is required");
  const isAddress = await Address.findOne({ where: { userId } });
  if (isAddress) throw new ConflictError("address is already in use");
  req.body.userId = userId;
  await Address.create({ ...req.body });
  const response = createResponse({
    message: "add new address success",
    status: StatusCodes.CREATED,
  });
  res.status(response.status).json(response);
};

const getAddressUser = async (req, res) => {
  const {
    params: { userId },
  } = req;
  const address = await Address.findOne({ where: { userId } });
  if (!address) throw new NotFoundError(`address not found`);
  const response = createResponse({
    message: "success",
    status: StatusCodes.CREATED,
    data: address,
  });
  res.status(response.status).json(response);
};

module.exports = {
  addAddressToUser,
  getAddressUser,
};
