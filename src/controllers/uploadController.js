const { StatusCodes } = require("http-status-codes");
const { createResponse } = require("../utils/createResponse");

const uploadSingle = async (req, res) => {
  const response = createResponse({
    message: "Tạo file ảnh thành công!",
    status: StatusCodes.OK,
    data: req.file.filename,
  });
  res.status(response.status).json(response);
};

const uploadMultiple = async (req, res) => {
  const response = createResponse({
    message: "Tạo file ảnh thành công!",
    status: StatusCodes.OK,
    data: req.files,
  });
  res.status(response.status).json(response);
};

module.exports = {
  uploadSingle,
  uploadMultiple,
};
