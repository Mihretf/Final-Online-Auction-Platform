import React, { useEffect, useState } from "react";
import BackToDashboardButton from "../HomeButtons/BacktoDashboardButton";
import { formatTimeRemaining } from "../../utils/time";
import "./AuctionsPage.css";

function AuctionsPage() {
  const [auctions, setAuctions] = useState([]);
  const [timeLeft, setTimeLeft] = useState({}); // store time left for each auction

  // Fetch auctions from backend
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      console.error("No token found! Please log in as admin.");
      window.location.href = "/login";
      return;
    }

    const fetchAuctions = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/auctions", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        setAuctions(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Error fetching auctions:", err);
      }
    };

    fetchAuctions();
    const fetchInterval = setInterval(fetchAuctions, 5000); // refresh auction data every 5s

    return () => clearInterval(fetchInterval);
  }, []);

  // Update countdown every second
  useEffect(() => {
    const interval = setInterval(() => {
      const newTimeLeft = {};
      auctions.forEach((auction) => {
        newTimeLeft[auction._id] = formatTimeRemaining(auction.endTime);
      });
      setTimeLeft(newTimeLeft);
    }, 1000);

    return () => clearInterval(interval);
  }, [auctions]);

  const handleDelete = async (auctionId) => {
    const token = localStorage.getItem("token");
    if (!window.confirm("Are you sure you want to delete this auction?")) return;

    try {
      const res = await fetch(`http://localhost:5000/api/auctions/${auctionId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.ok) {
        setAuctions((prev) => prev.filter((a) => a._id !== auctionId));
        alert("Auction deleted successfully");
      } else {
        const errorData = await res.json();
        console.error("Delete failed:", errorData.message || res.statusText);
        alert("Failed to delete auction");
      }
    } catch (err) {
      console.error("Error deleting auction:", err);
      alert("Error deleting auction");
    }
  };

  const getTimeStatus = (timeString) => {
    if (timeString.includes("ended")) return "ended";
    if (timeString.includes("hasn't started")) return "pending";
    return "active";
  };

  return (
    <div className="auctions-page">
      <div className="page-header">
        <BackToDashboardButton />
        <div className="header-content">
          <h1 className="page-title">Live Auctions</h1>
          <p className="page-subtitle">Monitor and manage all active auctions</p>
        </div>
        <div className="auctions-count">
          <span className="count-number">{auctions.length}</span>
          <span className="count-label">Total Auctions</span>
        </div>
      </div>

      {auctions.length === 0 ? (
        <div className="empty-state">
          <h3>No auctions available</h3>
          <p>There are currently no active auctions to display.</p>
        </div>
      ) : (
        <div className="auctions-container">
          <div className="auctions-grid">
            {auctions.map((auction) => {
              const timeRemaining = timeLeft[auction._id] || formatTimeRemaining(auction.endTime);
              const timeStatus = getTimeStatus(timeRemaining);
              
              return (
                <div key={auction._id} className="auction-card">
                  <div className="auction-header">
                    <h3 className="auction-title">
                      {auction.itemId?.title || "Unknown Item"}
                    </h3>
                    <span className={`status-indicator ${timeStatus}`}>
                      {timeStatus === "active" ? "Live" : timeStatus === "ended" ? "Ended" : "Pending"}
                    </span>
                  </div>

                  <div className="auction-details">
                    <div className="detail-row">
                      <span className="detail-label">Current Price</span>
                      <span className="detail-value price">
                        ${auction.highestBid || auction.itemId?.startingPrice || 0}
                      </span>
                    </div>

                    <div className="detail-row">
                      <span className="detail-label">Highest Bidder</span>
                      <span className="detail-value">
                        {auction.highestBidder?.username || "No bids yet"}
                      </span>
                    </div>

                    <div className="detail-row">
                      <span className="detail-label">Time Remaining</span>
                      <span className={`detail-value time-remaining ${timeStatus}`}>
                        {timeRemaining}
                      </span>
                    </div>
                  </div>

                  <div className="auction-actions">
                    <button
                      className="delete-button"
                      onClick={() => handleDelete(auction._id)}
                    >
                      Delete Auction
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export default AuctionsPage;