import Logo from "../../../assets/images/sidebar.png";
import searchIcon from "../../../assets/icons/Search.svg";
import homeIcon from "../../../assets/icons/Home.svg";
import productIcon from "../../../assets/icons/Shopping.svg";

export default function Sidebar({ setActivePage, activePage }) {
  return (
    <aside className="sidebar">
      <img src={Logo} alt="logo" className="logo-img" />

      <div className="sidebar-search">
        <img src={searchIcon} alt="" className="search-icon" />
        <input
          type="text"
          placeholder="Search"
          className="search-input"
        />
      </div>

      <div className="divider"></div>

      <div
        className={`menu-item ${activePage === "home" ? "active" : ""}`}
        onClick={() => setActivePage("home")}
      >
        <img src={homeIcon} alt="" className="menu-icon" />
        <span>Home</span>
      </div>

      <div
        className={`menu-item ${activePage === "products" ? "active" : ""}`}
        onClick={() => setActivePage("products")}
      >
        <img src={productIcon} alt="" className="menu-icon" />
        <span>Products</span>
      </div>
    </aside>
  );
}
