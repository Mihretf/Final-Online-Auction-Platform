import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { Search, Clock, Users, Gavel, Star } from "lucide-react";
import "./Landing.css";

// FeaturedAuctions component
function FeaturedAuctions({ items, formatPrice, formatDate }) {
  const navigate = useNavigate();

  const handlePlaceBid = (auctionId) => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user?.token) {
      // Save intended auction so user can be redirected after login
      localStorage.setItem("redirectAfterLogin", `/place-bid/${auctionId}`);
      navigate("/login");
      return;
    }

    navigate(`/place-bid/${auctionId}`);
  };

  return (
    <section className="featured-auctions" id="auctions">
      <h1>Featured Auctions</h1>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
        {items.length > 0 ? (
          items.map((auction) => {
            const item = auction.itemId;
            return (
              <div
                key={auction._id}
                style={{
                  border: "1px solid #ccc",
                  borderRadius: "8px",
                  padding: "15px",
                  width: "300px",
                }}
              >
                <img
                  src={
                    item.image
                      ? `http://localhost:5000/uploads/${item.image}`
                      : "https://via.placeholder.com/300x200?text=No+Image"
                  }
                  alt={item.title}
                  style={{ width: "100%", height: "200px", objectFit: "cover" }}
                  loading="lazy"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "/placeholder.png";
                  }}
                />
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <p>
                  <strong>Current Bid:</strong>{" "}
                  {formatPrice(auction.currentBid || item.startingPrice)}
                </p>
                <p>
                  <strong>Listed:</strong> {formatDate(item.createdAt)}
                </p>
                <button onClick={() => handlePlaceBid(auction._id)}>
                  Place Bid
                </button>
              </div>
            );
          })
        ) : (
          <p>No ongoing auctions available.</p>
        )}
      </div>
    </section>
  );
}

// LandingPage component
export function LandingPage() {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch ongoing auctions from backend
  useEffect(() => {
    fetch("http://localhost:5000/api/auctions")
      .then((res) => res.json())
      .then((data) => setItems(Array.isArray(data) ? data : []))
      .catch((err) => console.error("Error fetching items:", err));
  }, []);

  // Check if user was redirected after login
  useEffect(() => {
    const redirectPath = localStorage.getItem("redirectAfterLogin");
    if (redirectPath) {
      localStorage.removeItem("redirectAfterLogin");
      navigate(redirectPath);
    }
  }, [navigate]);

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="landing-container">
      {/* Navigation */}
      <nav className="navigation">
        <div className="nav-container">
          <div className="nav-brand">
            <Gavel className="nav-logo" />
            <span className="brand-text">Online Auction Platform</span>
          </div>
          <div className="nav-links">
            <a href="#home" className="nav-link">Home</a>
            <a href="#auctions" className="nav-link">Live Auctions</a>
            <a href="#about" className="nav-link">About Us</a>
            <a href="#contact" className="nav-link">Contact</a>
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
      <section className="hero-section" id="home">
        <div className="hero-container">
          <div className="hero-content">
            <h1 className="hero-title">
              Discover Extraordinary <span className="hero-highlight">Treasures</span>
            </h1>
            <p className="hero-description">
              Join the world's most prestigious auction house where collectors
              and connoisseurs discover rare artifacts, luxury items, and
              investment-grade collectibles.
            </p>

            <div className="search-container">
              <div className="search-wrapper">
                <Search className="search-icon" />
                <input
                  type="text"
                  placeholder="Search for items, categories, or sellers..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="search-input"
                />
                <button className="search-button">Search</button>
              </div>
            </div>

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
        </div>
      </section>

      {/* Featured Auctions */}
      <FeaturedAuctions items={items} formatPrice={formatPrice} formatDate={formatDate} />

      {/* Why Choose Us */}
      <section className="features-section" id="about">
        <div className="features-container">
          <h2 className="section-title">Why Choose Prestige Auctions</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon"><Star /></div>
              <h3 className="feature-title">Authenticated Items</h3>
              <p className="feature-description">
                Every item is thoroughly vetted and authenticated by our experts
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon"><Users /></div>
              <h3 className="feature-title">Global Community</h3>
              <p className="feature-description">
                Connect with collectors and enthusiasts from around the world
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon"><Gavel /></div>
              <h3 className="feature-title">Fair Bidding</h3>
              <p className="feature-description">
                Transparent and secure bidding process with real-time updates
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer" id="contact">
        <div className="footer-container">
          <div className="footer-content">
            <div className="footer-brand">
              <Gavel className="footer-logo" />
              <span className="footer-brand-text">Prestige Auctions</span>
            </div>

            <div className="footer-links">
              <div className="footer-section">
                <h4 className="footer-title">Platform</h4>
                <a href="#" className="footer-link">How it Works</a>
                <a href="#" className="footer-link">Seller Center</a>
                <a href="#" className="footer-link">Buyer Guide</a>
              </div>

              <div className="footer-section">
                <h4 className="footer-title">Support</h4>
                <a href="#" className="footer-link">Help Center</a>
                <a href="#" className="footer-link">Contact Us</a>
                <a href="#" className="footer-link">Safety & Security</a>
              </div>

              <div className="footer-section">
                <h4 className="footer-title">Legal</h4>
                <a href="#" className="footer-link">Terms of Service</a>
                <a href="#" className="footer-link">Privacy Policy</a>
                <a href="#" className="footer-link">Cookie Policy</a>
              </div>
            </div>
          </div>

          <div className="footer-bottom">
            <p>&copy; 2024 Prestige Auctions. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
