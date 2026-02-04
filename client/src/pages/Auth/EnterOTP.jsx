import "./Auth.css";
import bgImage from "../../assets/images/left-bg.png";
import cardImage from "../../assets/images/runner.jpg";
import logo from "../../assets/images/Logo-bg-preview.png";
import { useRef, useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function EnterOTP() {
  const navigate = useNavigate();
  const location = useLocation();
  const inputsRef = useRef([]);

  const [otp, setOtp] = useState(Array(6).fill(""));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [resendTimer, setResendTimer] = useState(30);
  const [resending, setResending] = useState(false);

  const input = location.state?.input || "";
  const isEmail = input.includes("@");

  // 🚫 Block direct access
  useEffect(() => {
    if (!input) {
      navigate("/", { replace: true });
    }
  }, [input, navigate]);

  const displayInput = isEmail
    ? input
    : input.replace(/^(\+?\d{0,3})(\d{4})(\d{2,})$/, "$1****$3");

  // ⏱ Resend countdown
  useEffect(() => {
    if (resendTimer <= 0) return;
    const timer = setTimeout(() => setResendTimer((t) => t - 1), 1000);
    return () => clearTimeout(timer);
  }, [resendTimer]);

  // 🔢 OTP input
  const handleChange = (e, index) => {
    const value = e.target.value.replace(/\D/, "");
    if (!value) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    setError("");

    if (index < 5) inputsRef.current[index + 1].focus();
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      const newOtp = [...otp];
      newOtp[index] = "";
      setOtp(newOtp);

      if (index > 0) inputsRef.current[index - 1].focus();
    }
  };

  // ✅ VERIFY OTP (REAL API)
  const handleVerify = async () => {
    const enteredOtp = otp.join("");

    if (enteredOtp.length < 6) {
      setError("Please enter the complete OTP");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const res = await fetch("https://productr-backendd.onrender.com/api/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: input, otp: enteredOtp }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Invalid OTP");
        return;
      }

      // 🔐 SAVE TOKEN
      localStorage.setItem("token", data.token);

      navigate("/dashboard", { replace: true });
    } catch (err) {
      setError("Server error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // 🔁 RESEND OTP
  const handleResend = async () => {
    if (resendTimer > 0) return;

    try {
      setResending(true);
      setError("");

      await fetch("https://productr-backendd.onrender.com/api/auth/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: input }),
      });

      setResendTimer(30);
    } catch (err) {
      setError("Failed to resend OTP");
    } finally {
      setResending(false);
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
        <div className="card" style={{ backgroundImage: `url(${cardImage})` }}>
          <div className="card-blur" />
          <div className="card-text">Uplist your product to market</div>
        </div>
      </div>

      {/* RIGHT PANEL */}
      <div className="right-panel">
        <h2>Enter OTP</h2>

        <p className="otp-subtitle">
          We’ve sent a 6-digit OTP to your email:
          <strong> {displayInput}</strong>
        </p>

        <div className={`otp-container ${error ? "otp-error" : ""}`}>
          {otp.map((digit, index) => (
            <input
              key={index}
              type="text"
              maxLength="1"
              className="otp-input"
              ref={(el) => (inputsRef.current[index] = el)}
              value={digit}
              onChange={(e) => handleChange(e, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
            />
          ))}
        </div>

        {error && <p className="otp-error-text">{error}</p>}

        <button className="login-btn" onClick={handleVerify} disabled={loading}>
          {loading ? "Verifying..." : "Verify OTP"}
        </button>

        <div className="resend-otp">
          <span>Didn’t receive the OTP?</span>
          <button
            className={`resend-btn ${resendTimer > 0 ? "disabled" : ""}`}
            onClick={handleResend}
            disabled={resendTimer > 0 || resending}
          >
            {resendTimer > 0
              ? `Resend in ${resendTimer}s`
              : resending
              ? "Resending..."
              : "Resend OTP"}
          </button>
        </div>
      </div>
    </div>
  );
}
