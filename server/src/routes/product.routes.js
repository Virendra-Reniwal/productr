const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth.middleware");
const upload = require("../middlewares/upload.middleware");
const {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  publishProduct,
} = require("../controllers/product.controller");

router.post("/products", auth, upload.array("image", 5), createProduct);
router.get("/products", auth, getProducts);
router.get("/products/:id", auth, getProductById);
router.put("/products/:id", auth, upload.array("image", 5), updateProduct);
router.delete("/products/:id", auth, deleteProduct);
router.put("/products/publish/:id", auth, publishProduct);

module.exports = router;
