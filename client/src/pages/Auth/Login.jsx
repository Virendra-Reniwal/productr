import "./Auth.css";
import bgImage from "../../assets/images/left-bg.png";
import cardImage from "../../assets/images/runner.jpg";
import logo from "../../assets/images/Logo-bg-preview.png";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

// Block temporary email providers
const blockedDomains = [
  "tempmail",
  "mailinator",
  "10minutemail",
  "yopmail",
  "guerrillamail",
  "trashmail",
];

export default function Login() {
  const navigate = useNavigate();

  const [input, setInput] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setError("");

    if (!input.trim()) {
      setError("Email or phone number is required");
      return;
    }

    const isEmail = input.includes("@");
    const isPhone = /^\+?\d{10,14}$/.test(input.replace(/\s+/g, ""));

    // ✅ EMAIL VALIDATION
    if (isEmail) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
      if (!emailRegex.test(input)) {
        setError("Please enter a valid email address");
        return;
      }

      const domain = input.split("@")[1].toLowerCase();
      if (blockedDomains.some((d) => domain.includes(d))) {
        setError("Temporary email addresses are not allowed");
        return;
      }
    }
    // ✅ PHONE VALIDATION
    else if (!isPhone) {
      setError("Please enter a valid phone number");
      return;
    }

    try {
      setLoading(true);

      // 🔥 REAL API CALL
      const response = await fetch(
        "https://productr-backendd.onrender.com/api/auth/send-otp",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(
            isEmail ? { email: input } : { phone: input }
          ),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Failed to send OTP");
        return;
      }
      if (isEmail) {
        localStorage.setItem("user", JSON.stringify({ email: input }));
      }
      // ✅ SUCCESS → OTP PAGE
      navigate("/otp", {
        state: {
          input,
          type: isEmail ? "email" : "phone",
        },
      });
    } catch (err) {
      setError("Server error. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-root">
      {/* LEFT PANEL */}
      <div className="left-panel">
        <img src={bgImage} alt="" className="bg-image" />

        <div className="logo">
          <img src={logo} alt="logo" />
        </div>

        <div
          className="card"
          style={{ backgroundImage: `url(${cardImage})` }}
        >
          <div className="card-blur" />
          <div className="card-text">
            Uplist your product to market
          </div>
        </div>
      </div>

      {/* RIGHT PANEL */}
      <div className="right-panel">
        <h2>Login to your Productr Account</h2>

        <div className="field">
          <label>Email or Phone Number</label>
          <input
            placeholder="Enter your email or phone number"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          {error && <span className="error-text">{error}</span>}
        </div>

        <button
          className="login-btn"
          onClick={handleLogin}
          disabled={loading}
        >
          {loading ? "Sending OTP..." : "Login"}
        </button>

        <div className="signup">
          <span>Don’t have a Productr Account</span>
        </div>
      </div>
    </div>
  );
}
