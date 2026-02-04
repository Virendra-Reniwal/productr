const express = require("express");
const cors = require("cors");
const path = require("path");
const connectDB = require("./config/db");

// Connect to MongoDB
connectDB();

const app = express();

// Static middleware must be **before all other routes**
const uploadsPath = path.join(__dirname, "..", "uploads");
console.log("Serving uploads from:", uploadsPath);
app.use("/uploads", express.static(uploadsPath));

/* =========================
   MIDDLEWARE
   ========================= */
app.use(cors()); 
app.use(express.json()); 

/* =========================
   ROOT ROUTE
   ========================= */
app.get("/", (req, res) => {
  res.status(200).send("🚀 Productr Backend API is running");
});

/* =========================
   AUTH ROUTES
   ========================= */
app.use("/api/auth", require("./routes/auth.routes"));

/* =========================
   PROTECTED ROUTES
   ========================= */
app.use("/api", require("./routes/protected.routes"));

/* =========================
   PRODUCT ROUTES
   ========================= */
app.use("/api", require("./routes/product.routes"));

/* =========================
   404 HANDLER
   ========================= */
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

module.exports = app;
