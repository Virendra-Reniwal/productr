import { useState, useEffect } from "react";
import "../Dashboard.css";
import closeIcon from "../../../assets/icons/close.svg";

export default function AddProductModal({ onClose, setToast, product }) {
  const [form, setForm] = useState({
    name: "",
    type: "",
    stock: "",
    mrp: "",
    price: "",
    brand: "",
    return: "Yes",
    images: [],
  });

  const [previews, setPreviews] = useState([]);

  // Prefill form if editing
  useEffect(() => {
    if (product) {
      setForm({
        name: product.name,
        type: product.type,
        stock: product.stock,
        mrp: product.mrp,
        price: product.price,
        brand: product.brand,
        return: product.returnEligible ? "Yes" : "No",
        images: [],
      });

      setPreviews(product.images?.map((img) => `http://localhost:5000${img}`) || []);
    }
  }, [product]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      if (files.length > 5) {
        alert("You can upload a maximum of 5 images.");
        return;
      }
      const filesArray = Array.from(files);
      setForm((prev) => ({ ...prev, images: filesArray }));
      setPreviews(filesArray.map((f) => URL.createObjectURL(f)));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("type", form.type);
      formData.append("stock", form.stock);
      formData.append("mrp", form.mrp);
      formData.append("price", form.price);
      formData.append("brand", form.brand);
      formData.append("return", form.return);
      form.images.forEach((img) => formData.append("image", img));

      const token = localStorage.getItem("token");
      const url = product
        ? `http://localhost:5000/api/products/${product._id}`
        : "http://localhost:5000/api/products";
      const method = product ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      setToast(product ? "Product updated!" : "Product uploaded!");
      onClose();
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="ap-overlay">
      <div className="ap-modal">
        <div className="ap-header">
          <h3>{product ? "Edit Product" : "Add Product"}</h3>
          <img src={closeIcon} alt="close" onClick={onClose} />
        </div>

        <form className="ap-form" onSubmit={handleSubmit}>
          <Field label="Product Name">
            <input
              name="name"
              placeholder="CakeZone Walnut Brownie"
              value={form.name}
              onChange={handleChange}
              required
            />
          </Field>

          <Field label="Product Type">
            <select name="type" value={form.type} onChange={handleChange} required>
              <option value="">Select product type</option>
              <option value="food">Food</option>
              <option value="electronics">Electronics</option>
              <option value="clothing">Clothing</option>
              <option value="beauty">Beauty Products</option>
              <option value="others">Others</option>
            </select>
          </Field>

          <Field label="Quantity Stock">
            <input
              name="stock"
              type="number"
              min="0"
              value={form.stock}
              onChange={handleChange}
              required
            />
          </Field>

          <Field label="MRP">
            <input
              name="mrp"
              type="number"
              min="0"
              value={form.mrp}
              onChange={handleChange}
              required
            />
          </Field>

          <Field label="Selling Price">
            <input
              name="price"
              type="number"
              min="0"
              value={form.price}
              onChange={handleChange}
              required
            />
          </Field>

          <Field label="Brand Name">
            <input
              name="brand"
              value={form.brand}
              onChange={handleChange}
              required
            />
          </Field>

          <Field label="Upload Product Images (Max 5)">
            <label className="ap-upload">
              <input
                type="file"
                name="image"
                onChange={handleChange}
                hidden
                accept="image/*"
                multiple
              />
              <span>Upload Images</span>
              <b>Browse</b>
            </label>

            <div style={{ display: "flex", gap: "8px", marginTop: "8px", flexWrap: "wrap" }}>
              {previews.map((src, idx) => (
                <img
                  key={idx}
                  src={src}
                  alt={`Preview ${idx}`}
                  style={{ width: "80px", height: "80px", objectFit: "cover", borderRadius: "6px" }}
                />
              ))}
            </div>
          </Field>

          <Field label="Exchange or return eligibility">
            <select name="return" value={form.return} onChange={handleChange} required>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </Field>

          <button className="ap-btn" type="submit">
            {product ? "Update" : "Create"}
          </button>
        </form>
      </div>
    </div>
  );
}

function Field({ label, children }) {
  return (
    <div className="ap-field">
      <label>{label}</label>
      {children}
    </div>
  );
}
