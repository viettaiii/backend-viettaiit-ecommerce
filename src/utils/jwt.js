const jwt = require("jsonwebtoken");

const createJWT = (payload, expiresIn) => {
  return jwt.sign(
    {
      data: payload,
    },
    process.env.JWT_SECRET,
    { expiresIn }
  );
};

const attachCookiesToResponse = (res, infoUser, refreshToken) => {
  const token = createJWT(
    infoUser,
    (expiresIn = process.env.JWT_ACCESS_TOKEN_LIFETIME)
  );
  const refreshTokenJWT = createJWT(
    { infoUser, refreshToken },
    (expiresIn = process.env.JWT_REFRESH_TOKEN_LIFETIME)
  );
  // const oneMinute = console.log(Math.floor(Date.now() / 1000) + 60);
  res.cookie("access_token", token, {
    httpOnly: true,
    exp: Math.floor(Date.now() / 1000) + 60 * 60 * 4,
    secure: process.env.NODE_ENV === "production",
  });
  res.cookie("refresh_token", refreshTokenJWT, {
    httpOnly: true,
    exp: Math.floor(Date.now() / 1000) + 60 * 60 * 30,
    secure: process.env.NODE_ENV === "production",
  });
};

const verifyValue = (token) => {
  const value = jwt.verify(token, process.env.JWT_SECRET);

  return value;
};
module.exports = { createJWT, attachCookiesToResponse, verifyValue };
