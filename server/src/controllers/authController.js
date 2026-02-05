const bcrypt = require("bcrypt");
const Otp = require("../models/Otp");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const sendEmail = require("../utils/sendEmail"); // Mailtrap-based email sender

// Helper to generate OTP
const generateOtp = () => Math.floor(100000 + Math.random() * 900000).toString();

exports.sendOtp = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    // 1️⃣ Generate OTP
    const otp = generateOtp();

    // 2️⃣ Hash OTP
    const hashedOtp = await bcrypt.hash(otp, 10);

    // 3️⃣ Set expiry (5 minutes)
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

    // 4️⃣ Remove old OTPs
    await Otp.deleteMany({ email });

    // 5️⃣ Save new OTP
    await Otp.create({
      email,
      otp: hashedOtp,
      expiresAt,
    });

    // 6️⃣ Send OTP via Mailtrap
    await sendEmail({
      to: email,
      subject: "Your Productr OTP Code",
      html: `
<div style="
    font-family: 'Arial', sans-serif;
    max-width: 600px;
    margin: auto;
    padding: 20px;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    background-color: #f9f9f9;
    color: #333;
">
  <h2 style="text-align: center; color: #4a90e2;">Welcome to Productr!</h2>
  <p style="text-align: center; font-size: 16px;">
    Use the OTP below to log in to your Productr account. This code is valid for <strong>5 minutes</strong>.
  </p>
  <div style="
      text-align: center;
      margin: 30px 0;
      padding: 20px;
      background-color: #4a90e2;
      border-radius: 8px;
      color: #fff;
      font-size: 32px;
      letter-spacing: 6px;
      font-weight: bold;
  ">
    ${otp}
  </div>
  <p style="text-align: center; font-size: 14px; color: #555;">
    If you did not request this OTP, please ignore this email.
  </p>
</div>
`,
    });

    console.log("OTP for testing:", otp); // 🔹 Useful for development

    return res.status(200).json({
      success: true,
      message: "OTP sent successfully",
    });
  } catch (error) {
    console.error("Send OTP error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

exports.verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({ message: "Email and OTP are required" });
    }

    const otpRecord = await Otp.findOne({ email });

    if (!otpRecord) {
      return res.status(400).json({ message: "OTP expired or not found" });
    }

    if (otpRecord.expiresAt < new Date()) {
      await Otp.deleteOne({ email });
      return res.status(400).json({ message: "OTP expired" });
    }

    const isValid = await bcrypt.compare(otp, otpRecord.otp);
    if (!isValid) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    await Otp.deleteOne({ email });

    let user = await User.findOne({ email });
    if (!user) {
      user = await User.create({ email });
    }

    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    return res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user: {
        id: user._id,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Verify OTP error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

exports.logout = async (req, res) => {
  try {
    const userId = req.user?.id || "Unknown user";

    // JWT is stateless → frontend removes token
    res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });

    console.log(`User ${userId} has been logged out successfully`);
  } catch (error) {
    console.error("Logout failed:", error);
    return res.status(500).json({ message: "Logout failed" });
  }
};
