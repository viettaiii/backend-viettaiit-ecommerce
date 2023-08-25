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
const register = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email) {
    throw new BadRequestError("Vui lòng điển đầy đủ thông tin!");
  }
  if (password.length < 5) {
    throw new UnprocessableEntityError("Password ít nhất 6 kí tự!");
  }
  const user = await User.findOne({ where: { email } });
  if (user) {
    throw new ConflictError("Email này đã được sử dụng!");
  }
  const newUser = {
    name,
    password,
    email,
  };
  await User.create(newUser);
  const response = createResponse({
    message: "Tạo mới một người dùng thành công.",
    status: StatusCodes.CREATED,
  });
  res.status(response.status).json(response);
};
const login = async (req, res) => {
  const { email, password } = req.body;
  if (!password || !email) {
    throw new BadRequestError("Vui lòng điển đầy đủ thông tin!");
  }
  if (password.length < 5) {
    throw new UnprocessableEntityError("Password ít nhất 6 kí tự!");
  }
  const user = await User.findOne({ where: { email } });
  if (!user) {
    throw new NotFoundError("Người dùng không tồn tại trong hệ thống");
  }
  const isMatch = await comparePassword(password, user.password);
  if (!isMatch) {
    throw new UnauthorizedError(
      "Bạn không có quyền đăng nhập vào tài khoản này."
    );
  }
  if (!user.isVerified) {
    const origin = process.env.FRONTEND_CLIENT_URL;
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
      "Bạn cần xác minh email dể có thể đăng nhập, kiểm tra email của bạn để xác minh"
    );
  }
  let userShow = {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
  };
  const response = createResponse({
    message: "Đăng nhập thành công",
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
    throw new BadRequestError("Vui lòng cung cấp đầy đủ thông tin!");
  }
  const user = await User.findOne({ where: { email } });
  if (!user) {
    throw new NotFoundError("Người dùng không tồn tại trên hệ thống");
  }
  if (verificationToken !== user.verificationToken) {
    throw new ForBiddenError("Bạn không có quyền xác minh email này!");
  }
  user.isVerified = true;
  user.verifiedDate = new Date();
  user.verificationToken = null;
  await user.save();
  const response = createResponse({
    message: "Xác mình email thành công!",
    status: StatusCodes.OK,
  });
  res.status(response.status).json(response);
};
const forgotPassword = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    throw new BadRequestError("Vui lòng cung cấp email");
  }
  const user = await User.findOne({ where: { email } });
  if (!user) {
    throw new NotFoundError("Email này không tồn tại trên hệ thống");
  }
  user.passwordToken = createString();
  user.passwordTokenExpire = new Date(Date.now() + 1000 * 60 * 1); // Thời gian hiện tại + 10 phút
  await user.save();
  sendResetPasswordEmail({
    name: user.name,
    email: user.email,
    token: user.passwordToken,
    origin: process.env.FRONTEND_CLIENT_URL,
  });
  const response = createResponse({
    message:
      "Kiểm tra email của bạn để đặt lại mật khẩu, hạn đắt mật khẩu sẽ hết trong 10 phút đến",

    status: StatusCodes.ACCEPTED,
  });
  res.status(response.status).json(response);
};
const resetPassword = async (req, res) => {
  const { passwordToken, email, password, confirmPassword } = req.body;
  if (!passwordToken || !email) {
    throw new BadRequestError("Vui lòng cung cấp đầy đủ giá trị");
  }
  const user = await User.findOne({ where: { email } });
  if (!user) {
    throw new NotFoundError("Người dùng không tồn tại trên hệ thống");
  }

  const currentDate = new Date(Date.now());
  if (
    !(
      user.passwordTokenExpire > currentDate &&
      passwordToken === user.passwordToken
    )
  ) {
    throw new UnauthorizedError("Mã token đã hết hạn");
  }

  if (password !== confirmPassword) {
    throw new BadRequestError("Mật khẩu không trùng khớp, vui lòng thử lại");
  }
  user.password = await hashPassword(password);
  user.passwordToken = null;
  user.passwordTokenExpire = null;
  await user.save();
  const response = createResponse({
    message: "Đặt mật khẩu thành công",
    status: StatusCodes.OK,
  });
  res.status(response.status).json(response);
};
const logout = async (req, res) => {
  await TokenUser.destroy({ where: { userId: req.userInfo.userId } });
  res.clearCookie("access_token");
  res.clearCookie("refresh_token");
  const response = createResponse({
    message: "Đăng xuất thành công.",
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
