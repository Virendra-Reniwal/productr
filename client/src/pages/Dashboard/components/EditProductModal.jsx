import { useState } from "react";
import "../Dashboard.css";
import closeIcon from "../../../assets/icons/close.svg";

export default function EditProductModal({ product, onClose, setToast }) {
  const [form, setForm] = useState({
    name: product.name,
    type: product.type,
    stock: product.stock,
    mrp: product.mrp,
    price: product.price,
    brand: product.brand,
    return: product.returnEligible ? "Yes" : "No",
    images: [], // new images to replace
  });

  const [previews, setPreviews] = useState(product.images || []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (files) {
      if (files.length > 5) {
        alert("You can upload a maximum of 5 images.");
        return;
      }

      const filesArray = Array.from(files);
      setForm((prev) => ({ ...prev, images: filesArray }));

      const previewUrls = filesArray.map((file) => URL.createObjectURL(file));
      setPreviews(previewUrls);
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

      const res = await fetch(`https://productr-backendd.onrender.com/api/products/${product._id}`, {
        method: "PUT",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to update product");

      setToast("Product updated successfully!");
      onClose();
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  return (
    <div className="ap-overlay">
      <div className="ap-modal">
        <div className="ap-header">
          <h3>Edit Product</h3>
          <img src={closeIcon} alt="close" onClick={onClose} />
        </div>

        <form className="ap-form" onSubmit={handleSubmit}>
          {/* Same fields as AddProductModal */}
          <Field label="Product Name">
            <input name="name" value={form.name} onChange={handleChange} required />
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
            <input name="stock" type="number" min="0" value={form.stock} onChange={handleChange} required />
          </Field>

          <Field label="MRP">
            <input name="mrp" type="number" min="0" value={form.mrp} onChange={handleChange} required />
          </Field>

          <Field label="Selling Price">
            <input name="price" type="number" min="0" value={form.price} onChange={handleChange} required />
          </Field>

          <Field label="Brand Name">
            <input name="brand" value={form.brand} onChange={handleChange} required />
          </Field>

          <Field label="Upload Product Images (Max 5)">
            <label className="ap-upload">
              <input type="file" name="image" onChange={handleChange} hidden accept="image/*" multiple />
              <span>Upload Images</span>
              <b>Browse</b>
            </label>

            <div style={{ display: "flex", gap: "8px", marginTop: "8px", flexWrap: "wrap" }}>
              {previews.map((src, idx) => (
                <img key={idx} src={src} alt={`Preview ${idx}`} style={{ width: "80px", height: "80px", objectFit: "cover", borderRadius: "6px" }} />
              ))}
            </div>
          </Field>

          <Field label="Exchange or return eligibility">
            <select name="return" value={form.return} onChange={handleChange} required>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </Field>

          <button className="ap-btn" type="submit">Update</button>
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
