import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Gavel } from "lucide-react";
import  Chat from "../Chat/Chat";
import "./Landing.css";

export function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="landing-container">
      {/* Navigation */}
      <nav className="navigation">
        <div className="nav-container">
          <div className="nav-brand">
            <Gavel className="nav-logo" />
            <span className="brand-text">Online Auction Platform</span>
          </div>
          <div className="nav-actions">
            <button className="nav-button secondary" onClick={() => navigate("/login")}>
              Login
            </button>
            <button className="nav-button primary" onClick={() => navigate("/register")}>
              Register
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-container">
          <h1 className="hero-title">
            Discover Extraordinary <span className="hero-highlight">Treasures</span>
          </h1>
          <p className="hero-description">
            Join the world's most prestigious auction house where collectors
            and connoisseurs discover rare artifacts, luxury items, and
            investment-grade collectibles.
          </p>

          {/* Achievements */}
          <div className="hero-stats">
            <div className="stat-item">
              <span className="stat-number">50K+</span>
              <span className="stat-label">Active Bidders</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">15K+</span>
              <span className="stat-label">Items Sold</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">$2.8B</span>
              <span className="stat-label">Total Sales</span>
            </div>
          </div>
        </div>
      </section>

            <Chat />


      {/* Terms & Conditions */}
      <section className="terms-section">
        <div className="terms-container">
          <h2>Terms & Conditions</h2>
          <p>Welcome to Prestige Auctions. By using this platform, you agree to the following rules:</p>
          <ul>
            <li>All bids are binding and cannot be retracted.</li>
            <li>Payment is required within 24 hours of winning an auction.</li>
            <li>The platform is not responsible for item authenticity claims after purchase.</li>
            <li>Users must comply with all applicable local laws regarding purchases and imports.</li>
            <li>Prestige Auctions reserves the right to suspend or ban accounts for violations.</li>
            <li>All disputes must be reported through our official support channels.</li>
          </ul>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-container">
          <p>&copy; 2024 Online Auction Platform. All rights reserved.</p>
        </div>
      </footer>

      {/* Floating FAQ Chatbot */}
    </div>
  );
}

