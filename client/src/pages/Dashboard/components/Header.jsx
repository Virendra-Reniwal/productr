import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import cartIcon from "../../../assets/icons/Shopping.svg";
import homeIcon from "../../../assets/icons/Home.svg";
import searchIcon from "../../../assets/icons/Search.svg";
import avatarImg from "../../../assets/images/avatar.png";

export default function Header({ activePage, onSearch }) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef();
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const title = activePage === "products" ? "Products" : "Home";
  const icon = activePage === "products" ? cartIcon : homeIcon;

  // close dropdown on outside click
  useEffect(() => {
    const handler = (e) => {
      if (!dropdownRef.current?.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // 🔓 LOGOUT
  const handleLogout = async () => {
    try {
      await fetch("https://productr-backendd.onrender.com/api/auth/logout", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
    } catch (err) {
      console.error("Logout error", err);
    } finally {
      localStorage.clear();
      navigate("/", { replace: true });
    }
  };

  return (
    <header className="dashboard-header">
      {/* LEFT */}
      <div className="header-left">
        <img src={icon} alt="" className="header-page-icon" />
        <span className="header-title">{title}</span>
      </div>

      {/* RIGHT */}
      <div className="header-right">
        {activePage === "products" && (
          <div className="header-search">
            <img src={searchIcon} alt="" className="header-search-icon" />
            <input
              placeholder="Search Services, Products"
              onChange={(e) => onSearch?.(e.target.value)}
            />
          </div>
        )}

        {/* PROFILE */}
        <div
          className="profile"
          ref={dropdownRef}
          onClick={() => setOpen(!open)}
        >
          <img src={avatarImg} alt="profile" className="avatar" />
          <span className="caret">▾</span>

          {open && (
            <div className="profile-dropdown">
              <div className="profile-info">
                <img src={avatarImg} alt="" />
                <div>
                  <p className="name">
                    {user?.email?.split("@")[0]}
                  </p>
                  <span className="email">{user?.email}</span>
                </div>
              </div>

              <div className="dropdown-divider"></div>

              <button className="logout-btn" onClick={handleLogout}>
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
