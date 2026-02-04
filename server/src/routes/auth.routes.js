const express = require("express");
const router = express.Router();

const {
  sendOtp,
  verifyOtp,
  logout,
} = require("../controllers/authController");

const authMiddleware = require("../middlewares/auth.middleware");

router.post("/send-otp", sendOtp);
router.post("/verify-otp", verifyOtp);
router.post("/logout", authMiddleware, logout);

module.exports = router;
