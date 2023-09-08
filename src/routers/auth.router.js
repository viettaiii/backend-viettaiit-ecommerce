const router = require("express").Router();
const passport = require("passport");
const {
  register,
  login,
  logout,
  verifyEmail,
  forgotPassword,
  resetPassword,
} = require("../controllers/auth.ctrl");
const { authenticateUser } = require("../middleware/authentication");
const { attachCookiesToResponse } = require("../utils/jwt");
const { StatusCodes } = require("http-status-codes");
const { createString } = require("../utils/crypto");
const { createResponse } = require("../utils/createResponse");
router.post("/register", register);
router.post("/login", login);
router.post("/logout", authenticateUser, logout);
router.post("/verify-email", verifyEmail);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);

router.get("/login/success", (req, res) => {
  let refreshToken = createString();
  attachCookiesToResponse(
    res,
    {
      userId: req.user.id,
      email: req.user.email,
      role: req.user.role,
    },
    refreshToken
  );
  let userShow = {
    id: req.user.id,
    name: req.user.name,
    email: req.user.email,
    role: req.user.role,
  };
  if (!req.user) userShow = null;
  const response = createResponse({
    message: "success",
    status: StatusCodes.OK,
    data: userShow,
  });
  res.status(response.status).json(response);
});

router.get("/login/failure", (req, res) => {
  const response = createResponse({
    message: "failure",
    status: StatusCodes.UNAUTHORIZED,
  });
  res.status(response.status).json(response);
});


// google
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["https://www.googleapis.com/auth/plus.login", "email"],
  })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: process.env.FRONTEND_CLIENT_URL,
    failureRedirect: "/api/v1/auth/login/failure",
  })
);

// //facebook
router.get(
  "/facebook",
  passport.authenticate("facebook", {
    scope: ["https://www.googleapis.com/auth/plus.login", "email"],
  })
);

router.get(
  "/facebook/callback",
  passport.authenticate("facebook", {
    successRedirect: process.env.FRONTEND_CLIENT_URL,
    failureRedirect: "/api/v1/auth/login/failure",
  })
);

// // github
// router.get(
//   "/github",
//   passport.authenticate("github", {
//     scope: ["https://www.googleapis.com/auth/plus.login", "email"],
//   })
// );

// router.get(
//   "/github/callback",
//   passport.authenticate("github", {
//     successRedirect: process.env.FRONTEND_CLIENT_URL,
//     failureRedirect: "/api/v1/auth/login/failure",
//   })
// );

// passport

module.exports = router;
