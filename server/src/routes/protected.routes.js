const express = require("express");
const authMiddleware = require("../middlewares/auth.middleware");

const router = express.Router();

router.get("/dashboard", authMiddleware, (req, res) => {
  res.status(200).json({
    success: true,
    message: "Dashboard access granted",
    user: req.user,
  });
});

module.exports = router;
