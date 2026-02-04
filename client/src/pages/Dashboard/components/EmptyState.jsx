export default function EmptyState({ type, setShowModal }) {
  return (
    <div className="empty">
      <div className="empty-icon">
        <div className="grid">
          <span></span>
          <span></span>
          <span></span>
          <span className="plus">+</span>
        </div>
      </div>

      {type === "products" ? (
        <>
          <h3>Feels a little empty over here...</h3>
          <p>
            You can create products without connecting store<br />
            you can add products to store anytime
          </p>
          <button onClick={() => setShowModal(true)}>
            Add your Products
          </button>
        </>
      ) : (
        <>
          <h3>No {type === "published" ? "Published" : "Unpublished"} Products</h3>
          <p>
            Your Published Products will appear here<br />
            Create your first product to publish
          </p>
        </>
      )}
    </div>
  );
}
