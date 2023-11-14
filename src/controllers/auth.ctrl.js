const { User, TokenUser } = require("../database/models");
const {
  BadRequestError,
  NotFoundError,
  UnauthorizedError,
  ConflictError,
  UnprocessableEntityError,
  ForBiddenError,
} = require("../errors");
const { StatusCodes } = require("http-status-codes");
const { comparePassword, hashPassword } = require("../utils/bcrypt");
const { createString } = require("../utils/crypto");
const {
  sendVerificationEmail,
  sendResetPasswordEmail,
} = require("../utils/email");
const { attachCookiesToResponse } = require("../utils/jwt");
const { createResponse } = require("../utils/createResponse");
const origin = "https://viettai.click/";
const register = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email) {
    throw new BadRequestError("Vui lòng cung cấp thông tin!");
  }
  if (password.length < 5) {
    throw new UnprocessableEntityError(
      "Password tối thiểu 6 kí tự!"
    );
  }
  const user = await User.findOne({ where: { email } });
  if (user) {
    throw new ConflictError("Email đã được sử dụng!");
  }
  const newUser = {
    name,
    password,
    email,
  };
  await User.create(newUser);
  const response = createResponse({
    message: "Tạo tài khoản thành công!",
    status: StatusCodes.CREATED,
  });
  res.status(response.status).json(response);
};
const login = async (req, res) => {
  const { email, password } = req.body;
  if (!password || !email) {
    throw new BadRequestError("Vui lòng cung cấp thông tin!");
  }
  if (password.length < 5) {
    throw new UnprocessableEntityError(
      "Password tối thiểu 6 kí tự!"
    );
  }
  const user = await User.findOne({ where: { email } });
  if (!user) {
    throw new NotFoundError("Email/password is not correct!");
  }
  const isMatch = await comparePassword(password, user.password);
  if (!isMatch) {
    throw new UnauthorizedError("Email/password is not correct!");
  }
  if (!user.isVerified) {
  
    const verificationToken = createString();
    user.verificationToken = verificationToken;
    sendVerificationEmail({
      name: user.name,
      email: user.email,
      verificationToken,
      origin,
    });
    await user.save();
    throw new UnauthorizedError(
      "Kiểm tra email và xác minh tải khoản trong 10 phút đến!"
    );
  }
  let userShow = {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
  };
  const response = createResponse({
    message: "Đăng nhập thành công!",
    status: StatusCodes.OK,
    data: userShow,
  });
  const tokenUser = await TokenUser.findOne({ where: { userId: user.id } });
  if (!tokenUser) {
    const refreshToken = createString();
    const newTokenUser = {
      ip: req.ip,
      userAgent: req.headers["user-agent"],
      refreshToken,
      isValid: true,
      userId: user.id,
    };
    await TokenUser.create(newTokenUser);
    attachCookiesToResponse(
      res,
      {
        userId: user.id,
        email: user.email,
        role: user.role,
      },
      refreshToken
    );
    return res.status(response.status).json(response);
  }
  const refreshToken = tokenUser.refreshToken;
  attachCookiesToResponse(
    res,
    {
      userId: user.id,
      email: user.email,
      role: user.role,
    },
    refreshToken
  );
  res.status(response.status).json(response);
};
const verifyEmail = async (req, res) => {
  const { verificationToken, email } = req.body;
  if (!verificationToken || !email) {
    throw new BadRequestError("Vui lòng cung cấp thông tin!");
  }
  const user = await User.findOne({ where: { email } });
  if (!user) {
    throw new NotFoundError("Email/password is not correct!");
  }
  if (verificationToken !== user.verificationToken) {
    throw new ForBiddenError("Xác minh thât bại!/Mã xác minh đã hết hạn");
  }
  user.isVerified = true;
  user.verifiedDate = new Date();
  user.verificationToken = null;
  await user.save();
  const response = createResponse({
    message: "Xác minh thành công",
    status: StatusCodes.OK,
  });
  res.status(response.status).json(response);
};
const forgotPassword = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    throw new BadRequestError("Vui lòng cung cấp email!!");
  }
  const user = await User.findOne({ where: { email } });
  if (!user) {
    throw new NotFoundError("Email không tìm thấy");
  }
  user.passwordToken = createString();
  user.passwordTokenExpire = new Date(Date.now() + 1000 * 60 * 1); // Thời gian hiện tại + 10 phút
  await user.save();
  sendResetPasswordEmail({
    name: user.name,
    email: user.email,
    token: user.passwordToken,
    origin,
  });
  const response = createResponse({
    message: "Vui lòng, kiểm tra email và đặt lại mật khẩu sau 10 phút",

    status: StatusCodes.ACCEPTED,
  });
  res.status(response.status).json(response);
};
const resetPassword = async (req, res) => {
  const { passwordToken, email, password, confirmPassword } = req.body;
  if (!passwordToken || !email) {
    throw new BadRequestError("Vui lòng cung cấp thông tin!");
  }
  const user = await User.findOne({ where: { email } });
  if (!user) {
    throw new NotFoundError("Email/password is not correct!");
  }

  const currentDate = new Date(Date.now());
  if (
    !(
      user.passwordTokenExpire > currentDate &&
      passwordToken === user.passwordToken
    )
  ) {
    throw new UnauthorizedError("Mã xác minh đã hết hạn!/không đúng");
  }

  if (password !== confirmPassword) {
    throw new BadRequestError("Mật khẩu không hợp lệ");
  }
  user.password = await hashPassword(password);
  user.passwordToken = null;
  user.passwordTokenExpire = null;
  await user.save();
  const response = createResponse({
    message: "Đặt lại mật khẩu thành công",
    status: StatusCodes.OK,
  });
  res.status(response.status).json(response);
};
const logout = async (req, res) => {
  await TokenUser.destroy({ where: { userId: req.userInfo.userId } });
  res.clearCookie("access_token");
  res.clearCookie("refresh_token");
  const response = createResponse({
    message: "Đăng xuất thành công",
    status: StatusCodes.OK,
  });
  res.status(response.status).json(response);
};

module.exports = {
  register,
  logout,
  login,
  verifyEmail,
  forgotPassword,
  resetPassword,
};
