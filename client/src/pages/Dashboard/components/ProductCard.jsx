import { useState } from "react";

// Custom Confirm Modal
function ConfirmModal({ message, onConfirm, onCancel }) {
  return (
    <div className="ap-overlay">
      <div className="ap-modal">
        <h3 style={{ fontSize: "18px", fontWeight: 600, marginBottom: "16px" }}>Confirm</h3>
        <p style={{ marginBottom: "24px", color: "#374151" }}>{message}</p>
        <div style={{ display: "flex", gap: "12px", justifyContent: "flex-end" }}>
          <button
            style={{
              padding: "8px 16px",
              borderRadius: "8px",
              border: "1px solid #d1d5db",
              background: "#fff",
              cursor: "pointer",
              fontWeight: 500,
            }}
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            style={{
              padding: "8px 16px",
              borderRadius: "8px",
              border: "none",
              background: "#ef4444",
              color: "#fff",
              cursor: "pointer",
              fontWeight: 500,
            }}
            onClick={onConfirm}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default function ProductCard({ product, onRefresh, onEdit }) {
  const token = localStorage.getItem("token");
  const [showConfirm, setShowConfirm] = useState(false);

  // Delete Product
  const handleDelete = async () => {
    try {
      const res = await fetch(`https://productr-backendd.onrender.com/api/products/${product._id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      onRefresh();
    } catch (err) {
      alert(err.message);
    } finally {
      setShowConfirm(false);
    }
  };

  // Publish/Unpublish Product
  const handlePublish = async () => {
    try {
      const res = await fetch(`https://productr-backendd.onrender.com/api/products/publish/${product._id}`, {
        method: "PUT",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      onRefresh();
    } catch (err) {
      alert(err.message);
    }
  };

  // Image URL (fallback to placeholder)
  const imageUrl = product.images?.[0]
    ? `https://productr-backendd.onrender.com${product.images[0]}`
    : "/placeholder.png";

  return (
    <>
      <div className="product-card">
        <div className="product-inner">
          {/* IMAGE */}
          <div className="image-wrapper">
            <img className="product-image" src={imageUrl} alt={product.name} />
            {product.images?.length > 1 && (
              <div className="image-dots">
                {product.images.map((_, idx) => (
                  <span key={idx} className={`dot ${idx === 0 ? "active" : ""}`} />
                ))}
              </div>
            )}
          </div>

          {/* DETAILS */}
          <div className="product-content">
            <div className="product-title">{product.name}</div>
            <p>
              Product type — <span>{product.type}</span>
            </p>
            <p>
              Quantity Stock — <span>{product.stock}</span>
            </p>
            <p>
              MRP — <span>₹{product.mrp}</span>
            </p>
            <p>
              Selling Price — <span>₹{product.price}</span>
            </p>
            <p>
              Brand Name — <span>{product.brand}</span>
            </p>
            <p>
              Total Images — <span>{product.images?.length || 0}</span>
            </p>
            <p>
              Exchange Eligibility — <span>{product.returnEligible ? "YES" : "NO"}</span>
            </p>
          </div>

          {/* BUTTONS */}
          <div className="card-buttons">
            <button
              className={`btn-primary ${product.isPublished ? "unpublish" : ""}`}
              onClick={handlePublish}
            >
              {product.isPublished ? "Unpublish" : "Publish"}
            </button>

            <button className="btn-outline" onClick={() => onEdit(product)}>
              Edit
            </button>

            <button className="btn-icon" onClick={() => setShowConfirm(true)}>
              🗑
            </button>
          </div>
        </div>
      </div>

      {/* CUSTOM CONFIRM MODAL */}
      {showConfirm && (
        <ConfirmModal
          message="Are you sure you want to delete this product?"
          onConfirm={handleDelete}
          onCancel={() => setShowConfirm(false)}
        />
      )}
    </>
  );
}
