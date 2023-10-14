const { UnauthorizedError, ForBiddenError } = require("../errors");
const { createString } = require("../utils/crypto");
const { verifyValue, attachCookiesToResponse } = require("../utils/jwt");

const authenticateUser = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) throw new UnauthorizedError("unauthorized");
  try {
    const decoded = verifyValue(token);
    req.userInfo = decoded.data;
    next();
  } catch (error) {
    if (error.message === "jwt expired") {
      const refreshToken = req.cookies.refresh_token;
      const decodedToken = verifyValue(refreshToken);
      const data = decodedToken.data.infoUser;
      const newRefreshToken = createString();
      attachCookiesToResponse(res, data, newRefreshToken);
      req.userInfo = data;
      next();
    } else {
      throw new UnauthorizedError("unauthorized");
    }
  }
};

const authenticatePermission = (...roles) => {
  return (req, res, next) => {
    if (roles.includes(req.userInfo.role)) {
      next();
    } else {
      throw new ForBiddenError("Cấm");
    }
  };
};

module.exports = {
  authenticateUser,
  authenticatePermission,
};
