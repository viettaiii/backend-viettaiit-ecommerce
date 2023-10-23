const { StatusCodes } = require("http-status-codes");
const { User } = require("../database/models");
const { createResponse } = require("../utils/createResponse");
const { Op } = require("sequelize");
const getUsers = async (req, res) => {
  const {
    query: { name, email },
  } = req;
  const query = {};
  if (name)
    query.name = {
      [Op.iLike]: `%${name}%`,
    };
  if (email) {
    query.email = {
      [Op.like]: `%${email}%`,
    };
  }
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 6;
  const offset = (page - 1) * limit;
  const users = await User.findAll({
    attributes: {
      exclude: [
        "role",
        "verificationToken",
        "password",
        "passwordToken",
        "passwordTokenExpire",
      ],
    },
    where: query,
    limit,
    offset,
  });

  const count = await User.count({ where: { role: "client" } });
  const response = createResponse({
    message: "Get all users",
    status: StatusCodes.OK,
    page,
    perPage: limit,
    total: count,
    totalPages: Math.ceil(count / limit),
    data: users,
  });
  res.status(response.status).json(response);
};

module.exports = {
  getUsers,
};
