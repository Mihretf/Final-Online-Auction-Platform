import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import './Buyer.css'

export default function BuyerDashboard() {
  const [items, setItems] = useState([]);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const getTimeLeft = (startTime, endTime) => {
    const now = new Date();
    const start = new Date(startTime);
    const end = new Date(endTime);

    if (now < start) return "Auction hasn't started";
    if (now > end) return "Auction ended";

    const diff = end - now;
    const minutes = Math.floor((diff / 1000 / 60) % 60);
    const hours = Math.floor((diff / 1000 / 60 / 60) % 24);
    const days = Math.floor(diff / 1000 / 60 / 60 / 24);

    return `${days}d ${hours}h ${minutes}m`;
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user || !user.token) return;

    axios.get("http://localhost:5000/api/auctions", {
      headers: { Authorization: `Bearer ${user.token}` },
    })
    .then(res => setItems(Array.isArray(res.data) ? res.data : []))
    .catch(err => console.error("Error fetching items:", err));
  }, []);

  const handlePlaceBid = (auction, bidAmount) => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      localStorage.setItem("pendingBidItem", JSON.stringify(auction));
      navigate("/login");
      return;
    }
    navigate(`/buyer/bid/${auction._id}`);
  };

  const handleMoreDescription = (item) => navigate(`/buyer/item/${item._id}`);

  return (
    <div className="buyer-dashboard">
      <div className="dashboard-header">
        <div className="header-content">
          <h1 className="dashboard-title">Auction Marketplace</h1>
          <p className="dashboard-subtitle">Discover and bid on exclusive items</p>
        </div>
        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      </div>

      {items.length === 0 && (
        <div className="empty-state">
          <h3>No auctions available</h3>
          <p>There are no approved items for auction at the moment. Please check back later.</p>
        </div>
      )}

      <div className="auction-grid">
        {items.map((auction) => (
          <div key={auction._id} className="auction-card">
            <div className="auction-image">
              {auction.itemId?.image ? (
                <img
                  src={`http://localhost:5000/uploads/${auction.itemId.image}`}
                  alt={auction.itemId.title}
                  className="item-image"
                />
              ) : (
                <div className="image-placeholder">
                  <span>No Image</span>
                </div>
              )}
            </div>

            <div className="auction-content">
              <div className="auction-header">
                <h3 className="auction-title">{auction.itemId?.title || "No title"}</h3>
                <span className="auction-category">{auction.itemId?.category || "N/A"}</span>
              </div>

              <div className="price-info">
                <div className="price-item">
                  <span className="price-label">Starting Price</span>
                  <span className="price-value">${auction.itemId?.startingPrice || 0}</span>
                </div>
                <div className="price-item">
                  <span className="price-label">Reserve Price</span>
                  <span className="price-value">${auction.itemId?.reservePrice || 0}</span>
                </div>
              </div>

              <p className="auction-description">
                {auction.itemId?.description?.length > 120
                  ? auction.itemId.description.substring(0, 120) + "..."
                  : auction.itemId?.description || "No description available."}
              </p>

              <div className="time-remaining">
                <span className="time-label">Time remaining</span>
                <span className="time-value">
                  {getTimeLeft(auction.startTime, auction.endTime)}
                </span>
              </div>

              <div className="auction-actions">
                <button 
                  className="action-button secondary"
                  onClick={() => handleMoreDescription(auction)}
                >
                  View Details
                </button>
                <button 
                  className="action-button primary"
                  onClick={() => handlePlaceBid(auction)}
                >
                  Place Bid
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}