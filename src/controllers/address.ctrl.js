const { Address } = require("../database/models");
const { BadRequestError, NotFoundError, ConflictError } = require("../errors");
const { StatusCodes } = require("http-status-codes");
const { createResponse } = require("../utils/createResponse");

const getAllAddresses = async (req, res) => {
  const { count, rows } = await Address.findAndCountAll({});
  const response = createResponse({
    message: "add new address success",
    status: StatusCodes.CREATED,
    data: rows,
    total: count,
  });
  res.status(response.status).json(response);
};
const addAddressToUser = async (req, res) => {
  const {
    params: { userId },
    body: { phoneNumber, province, district, wards, country },
  } = req;
  if (!phoneNumber || !province || !district || !wards || !country)
    throw new BadRequestError("info is required");
  const isAddress = await Address.findOne({ where: { userId } });
  if (isAddress) throw new BadRequestError("address user is already in use");
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
  if (!address) throw new NotFoundError(`address user not found`);
  const response = createResponse({
    message: "success",
    status: StatusCodes.OK,
    data: address,
  });
  res.status(response.status).json(response);
};

const updateAddressUser = async (req, res) => {
  const {
    params: { userId },
    body: { phoneNumber, province, district, wards, country },
  } = req;
  const address = await Address.findOne({ where: { userId } });
  if (!address) throw new NotFoundError(`address user not found`);
  if (phoneNumber) address.phoneNumber = phoneNumber;
  if (province) address.province = province;
  if (district) address.district = district;
  if (wards) address.wards = wards;
  if (country) address.country = country;
  await address.save();
  const response = createResponse({
    message: "updated successfully",
    status: StatusCodes.OK,
  });
  res.status(response.status).json(response);
};

const deleteAddressUser = async (req, res) => {
  const {
    params: { userId },
  } = req;
  const address = await Address.findOne({ where: { userId } });
  if (!address) throw new NotFoundError(`address user not found`);
  await address.destroy();
  const response = createResponse({
    message: "deleted successfully",
    status: StatusCodes.OK,
  });
  res.status(response.status).json(response);
};
module.exports = {
  addAddressToUser,
  getAddressUser,
  updateAddressUser,
  deleteAddressUser,
  getAllAddresses,
};
