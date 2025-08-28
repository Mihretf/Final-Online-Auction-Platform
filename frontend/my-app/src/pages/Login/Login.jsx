import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { loginUser } from "../../utils/api"; 
import "./Login.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await loginUser({ email, password });
      setError("");

  // Save logged in user in localStorage or your auth context
    localStorage.setItem("user", JSON.stringify(data));

    localStorage.setItem("token", data.token);

    const pendingBid = localStorage.getItem("pendingBidItem");
    if (pendingBid && data.role === "bidder") {
      navigate(`/buyer/bid/${JSON.parse(pendingBid)._id}`);
      localStorage.removeItem("pendingBidItem");
      return;
    }

      // Redirect based on role
      if (data.role === "admin") {
        navigate("/admin");
      } else if (data.role === "seller") {
        navigate("/seller");
      } else if (data.role === "bidder") {
        navigate("/buyer");
      } else {
        throw new Error("Unknown role");
      }
    } catch (err) {
      setError(err.message || "Login failed");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h1 className="login-title">Welcome Back</h1>
          <p className="login-description">Sign in to your account</p>
        </div>

        <form className="login-form" onSubmit={handleSubmit}>
          {error && <div className="error-message">{error}</div>}

          <div className="form-group">
            <label htmlFor="email" className="form-label">Email</label>
            <input
              id="email"
              type="email"
              className="form-input"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password" className="form-label">Password</label>
            <div className="password-container">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                className="form-input password-input"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="eye-button"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <button type="submit" className="login-button">
            Sign In
          </button>

          <div className="login-footer">
            <button type="button" className="forgot-password-link">
              Forgot your password?
            </button>
          </div>

          <div className="register-link">
            <span>Don't have an account? </span>
            <button type="button" className="register-button"
            onClick={() => navigate("/register")}>
              Sign up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
