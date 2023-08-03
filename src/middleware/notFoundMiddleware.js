const { StatusCodes } = require("http-status-codes");

const notFoundMiddleware = async (req, res) => {
  res
    .status(StatusCodes.NOT_FOUND)
    .send("<h1>Đường dẫn này hiện không tồn tại trên trang web!</h1>");
};

module.exports = notFoundMiddleware;
