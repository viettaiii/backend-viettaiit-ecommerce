const router = require("express").Router();
const {
  register,
  login,
  logout,
  verifyEmail,
  forgotPassword,
  resetPassword,
} = require("../controllers/auth.ctrl");
const { authenticateUser } = require("../middleware/authentication");
router.post("/register", register);
router.post("/login", login);
router.post("/logout", authenticateUser, logout);
router.post("/verify-email", verifyEmail);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);
module.exports = router;
