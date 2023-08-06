const sgMail = require("@sendgrid/mail");
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

const sendVerificationEmail = async ({
  name,
  email,
  verificationToken,
  origin,
}) => {
  const verifyEmail = `${origin}/account/verify-email?token=${verificationToken}&email=${email}`;
  const message = `<p>Vui lòng click vào link bên dưới để có thể xác minh email của bạn : 
    <a href="${verifyEmail}">Verify Email</a> </p>`;
  return await sendMail({
    to: email,
    subject: "Xác minh email",
    html: `<h2>Xin chào ${name}</h2>
      ${message}
      `,
  });
};



const sendResetPasswordEmail = async ({ name, email, token, origin }) => {
  const resetURL = `${origin}/account/reset-password?token=${token}&email=${email}`;
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

module.exports = { sendVerificationEmail, sendResetPasswordEmail };
