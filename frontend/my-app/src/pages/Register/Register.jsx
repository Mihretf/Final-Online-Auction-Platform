// src/pages/Register/Register.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../utils/api";
import "./Register.css";

export default function Register() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("seller"); // default seller
  const [bankStatement, setBankStatement] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await registerUser({
        username,
        email,
        password,
        phone,
        role,
        bankStatement,
      });

      console.log("Registration successful:", data);
      setError("");

      localStorage.setItem("user", JSON.stringify(data));

    const pendingBid = localStorage.getItem("pendingBidItem");
    if (pendingBid && data.role === "bidder") {
      navigate(`/buyer/bid/${JSON.parse(pendingBid)._id}`);
      localStorage.removeItem("pendingBidItem");
      return;
    }

      // ✅ Redirect user based on role
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
      setError(err.message || "Registration failed");
    }
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <div className="register-header">
          <h1 className="register-title">Create Account</h1>
          <p className="register-description">Sign up to get started</p>
        </div>

        <form className="register-form" onSubmit={handleSubmit}>
          {error && <div className="error-message">{error}</div>}

          <div className="form-group">
            <label htmlFor="username" className="form-label">Username</label>
            <input
              id="username"
              type="text"
              className="form-input"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email" className="form-label">Email</label>
            <input
              id="email"
              type="email"
              className="form-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              id="password"
              type="password"
              className="form-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="phone" className="form-label">Phone</label>
            <input
              id="phone"
              type="text"
              className="form-input"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Enter your phone number"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="role" className="form-label">Role</label>
            <select
              id="role"
              className="form-input"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="seller">Seller</option>
              <option value="bidder">Bidder</option>
              {/* admin is not shown here */}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="bankStatement" className="form-label">Bank Statement URL</label>
            <input
              id="bankStatement"
              type="text"
              className="form-input"
              value={bankStatement}
              onChange={(e) => setBankStatement(e.target.value)}
              placeholder="Enter bank statement URL"
            />
          </div>

          <button type="submit" className="register-button">
            Sign Up
          </button>

          <div className="register-footer">
            <span>Already have an account? </span>
            <button
              type="button"
              className="login-button-link"
              onClick={() => navigate("/login")}
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
