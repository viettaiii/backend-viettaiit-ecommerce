const { StatusCodes } = require("http-status-codes");

const errorMiddleware = (err, req, res, next) => {
  const defaultError = {
    status: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    error: {
      message: err.message || "Internal Server Error",
      statusText: null,
      status: err.statusCode,
      ok: false,
    },
  };
  switch (err.statusCode) {
    // Bad request
    case 400:
      defaultError.error.statusText = "Bad Request";
      break;
    case 401:
      defaultError.error.statusText = "Unauthorized";
      break;
    case 404:
      defaultError.error.statusText = "Not Found";
      break;

    case 409:
      defaultError.error.statusText = "Conflict";
      break;
    case 422:
      defaultError.error.statusText = "Unprocessable Entity";
      break;
  }
  if (err.name === "SequelizeValidationError") {
    defaultError.error.message =
      err.errors[0].path +
      " có giá trị " +
      err.errors[0].value +
      " không hợp lệ";
    defaultError.error.statusText = "Unprocessable Entity";
    defaultError.error.status = StatusCodes.UNPROCESSABLE_ENTITY;
    defaultError.status = StatusCodes.UNPROCESSABLE_ENTITY;
  }
  res.status(defaultError.status).json({
    error: defaultError.error,
  });
};

module.exports = errorMiddleware;
