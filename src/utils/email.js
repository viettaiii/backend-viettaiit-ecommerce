const sgMail = require("@sendgrid/mail");
const handlebars = require("handlebars");
const fs = require("fs");
const util = require("util");
// const readFile = util.promisify(fs.readFile);
const { formatCurrency, formatDate } = require("../utils/format");
require("dotenv").config();
const sendMail = async ({ to, subject, html }) => {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  const msg = {
    to,
    from: `Viết Tài <${process.env.MY_EMAIL}>`,
    subject,
    html,
  };
  return await sgMail.send(msg);
};

const sendMailOrderedSuccessfully = async ({ info, productItems }) => {
  const template = fs.readFileSync(
    "src/templates/confirm-ordered.html",
    "utf8"
  );
  handlebars.registerHelper("formatCurrency", function (price) {
    return formatCurrency(price);
  });

  // Đăng ký helper formatDate (nếu cần)
  handlebars.registerHelper("formatDate", function (date) {
    return formatDate(date);
  });

  handlebars.registerHelper("multiplyAndFormatCurrency", function (num1, num2) {
    return formatCurrency(num1 * num2);
  });
  handlebars.registerHelper(
    "addTwoNumAndFormatCurrency",
    function (num1, num2) {
      return formatCurrency(num1 + num2);
    }
  );

  const compiledTemplate = handlebars.compile(template);
  const data = {
    info,
    productItems,
    URL_FRONTEND: process.env.FRONTEND_CLIENT_URL
  };
  const html = compiledTemplate(data);
  return await sendMail({
    to: info.email,
    subject: "Xác nhận đơn hàng",
    html: `${html}`,
  });
};

const sendVerificationEmail = async ({
  name,
  email,
  verificationToken,
  origin,
}) => {
  const verifyEmail = `${origin}/tai-khoan/xac-minh-tai-khoan?token=${verificationToken}&email=${email}`;
  const template = fs.readFileSync("src/templates/verify-email.html", "utf8");
  const compiledTemplate = handlebars.compile(template);
  const data = {
    verifyEmail,
    name,
  };
  const html = compiledTemplate(data);
  return await sendMail({
    to: email,
    subject: "Xác minh tài khoản",
    html: `${html}`,
  });
};

const sendResetPasswordEmail = async ({ name, email, token, origin }) => {
  const resetURL = `${origin}/tai-khoan/dat-lai-mat-khau?token=${token}&email=${email}`;
  const message = `<p>Vui lòng click vào link bên dưới để có thể đặt lại mật khẩu của bạn : 
      <a href="${resetURL}">Đặt lại mặt khẩu</a></p>`;
  return await sendMail({
    to: email,
    subject: "Đặt lại mật khẩu",
    html: `<h2>Xin chào ${name}</h2>
    ${message}
    `,
  });
};

module.exports = {
  sendVerificationEmail,
  sendResetPasswordEmail,
  sendMailOrderedSuccessfully,
};
