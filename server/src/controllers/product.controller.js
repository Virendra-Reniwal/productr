const Product = require("../models/product.model");

// CREATE PRODUCT
exports.createProduct = async (req, res) => {
  try {
    if (!req.files || req.files.length === 0)
      return res.status(400).json({ message: "No images uploaded" });

    const images = req.files.map((f) => `/uploads/${f.filename}`);

    const product = await Product.create({
      name: req.body.name,
      type: req.body.type,
      stock: req.body.stock,
      mrp: req.body.mrp,
      price: req.body.price,
      brand: req.body.brand,
      images,
      returnEligible: req.body.return === "Yes",
    });

    res.status(201).json({ success: true, product });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET ALL PRODUCTS
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, products });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET PRODUCT BY ID
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Not found" });
    res.status(200).json({ success: true, product });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// UPDATE PRODUCT
exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Not found" });

    if (req.files && req.files.length > 0) {
      product.images = req.files.map((f) => `/uploads/${f.filename}`);
    }

    product.name = req.body.name || product.name;
    product.type = req.body.type || product.type;
    product.stock = req.body.stock || product.stock;
    product.mrp = req.body.mrp || product.mrp;
    product.price = req.body.price || product.price;
    product.brand = req.body.brand || product.brand;
    product.returnEligible =
      req.body.return === undefined
        ? product.returnEligible
        : req.body.return === "Yes";

    await product.save();
    res.status(200).json({ success: true, product });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE PRODUCT
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ message: "Not found" });
    res.status(200).json({ success: true, message: "Product deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// PUBLISH PRODUCT
exports.publishProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Not found" });

    product.isPublished = !product.isPublished;
    await product.save();

    res.status(200).json({
      success: true,
      product,
      message: product.isPublished ? "Published" : "Unpublished",
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
