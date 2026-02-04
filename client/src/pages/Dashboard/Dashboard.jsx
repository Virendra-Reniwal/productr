import { useEffect, useState, useCallback } from "react";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Tabs from "./components/Tabs";
import ProductCard from "./components/ProductCard";
import AddProductModal from "./components/AddProductModal";
import EmptyState from "./components/EmptyState";
import Toast from "./components/Toast";

import "./Dashboard.css";

export default function Dashboard() {
  const [activePage, setActivePage] = useState("home");
  const [tab, setTab] = useState("published");
  const [showModal, setShowModal] = useState(false);
  const [toast, setToast] = useState("");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editProduct, setEditProduct] = useState(null);

  const handleSetToast = (message) => {
    setToast(message);
    setTimeout(() => setToast(""), 3000);
  };

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      const res = await fetch("https://productr-backendd.onrender.com/api/products", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to fetch");

      setProducts(data.products || []);
    } catch (err) {
      console.error("Fetch products error:", err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // Filter for home page tabs
  const homeProducts = products.filter((product) => {
    if (tab === "published") return product.isPublished;
    if (tab === "unpublished") return !product.isPublished;
    return true;
  });

  // All products for Products page
  const allProducts = products;

  return (
    <div className="dashboard">
      <Sidebar activePage={activePage} setActivePage={setActivePage} />
      <div className="main">
        <Header
          activePage={activePage}
          setShowModal={
            activePage === "products" ? () => setShowModal(true) : null
          }
        />

        {/* HOME PAGE */}
        {activePage === "home" && (
          <>
            <Tabs tab={tab} setTab={setTab} />

            {loading ? (
              <p style={{ padding: "20px" }}>Loading products...</p>
            ) : homeProducts.length === 0 ? (
              <EmptyState type={tab} />
            ) : (
              <div className="product-grid-wrapper">
                <div className="product-grid">
                  {homeProducts.map((product) => (
                    <ProductCard
                      key={product._id}
                      product={product}
                      onRefresh={fetchProducts}
                      onEdit={(p) => {
                        setEditProduct(p);
                        setShowModal(true);
                      }}
                    />
                  ))}
                </div>
              </div>
            )}
          </>
        )}

        {/* PRODUCTS PAGE */}
        {activePage === "products" && (
          <>
            {/* Header with Add Product button */}
            <div className="products-header">
              <button
                className="add-product-btn"
                onClick={() => setShowModal(true)}
              >
                + Add Product
              </button>
            </div>

            {/* Loading / Empty / Products Grid */}
            {loading ? (
              <p style={{ padding: "20px" }}>Loading products...</p>
            ) : allProducts.length === 0 ? (
              <EmptyState
                type="products"
                setShowModal={() => setShowModal(true)}
              />
            ) : (
              <div className="product-grid-wrapper">
                <div className="product-grid">
                  {allProducts.map((product) => (
                    <ProductCard
                      key={product._id}
                      product={product}
                      onRefresh={fetchProducts}
                      onEdit={(p) => {
                        setEditProduct(p);
                        setShowModal(true);
                      }}
                    />
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {showModal && (
        <AddProductModal
          onClose={() => {
            setShowModal(false);
            setEditProduct(null);
            fetchProducts();
          }}
          setToast={handleSetToast}
          product={editProduct}
        />
      )}

      {toast && <Toast message={toast} close={() => setToast("")} />}
    </div>
  );
}
