const { UnauthorizedError } = require("../errors");
const { verifyValue } = require("../utils/jwt");

const authenticateUser = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) throw new UnauthorizedError("Token là yều cầu phải có!");
  try {
    const { data } = verifyValue(token);
    req.userInfo = data;
    next();
  } catch (error) {
    next(error);
  }
};

const authenticatePermission = (...roles) => {
  return (req, res, next) => {
    if (roles.includes(req.userInfo.role)) {
      next();
    }
    throw new UnauthorizedError("Không được phép");
  };
};

module.exports = {
  authenticateUser,
  authenticatePermission,
};
