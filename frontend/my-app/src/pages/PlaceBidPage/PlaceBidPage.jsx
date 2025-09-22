import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./PlaceBidPage.css";

export default function PlaceBidPage() {
  const { auctionId } = useParams();
  const navigate = useNavigate();
  const [auction, setAuction] = useState(null);
  const [bidAmount, setBidAmount] = useState("");
  const [message, setMessage] = useState(""); // success/error messages
  const [loading, setLoading] = useState(true);

  // Fetch auction details
  const fetchAuction = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user?.token) {
      setMessage("You must be logged in to view this page.");
      setLoading(false);
      return;
    }

    try {
      const res = await axios.get(`http://localhost:5000/api/auctions/${auctionId}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setAuction(res.data);
    } catch (err) {
      setMessage("Failed to fetch auction details.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAuction();
  }, [auctionId]);

  // Submit bid
  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user?.token) {
      setMessage("You must be logged in to place a bid.");
      return;
    }

    setMessage(""); // clear previous messages

    try {
      await axios.post(
        "http://localhost:5000/api/bids/place",
        {
          itemId: auction.itemId._id, // backend expects itemId
          amount: Number(bidAmount),
        },
        {
          headers: { Authorization: `Bearer ${user.token}` },
        }
      );

      setMessage(`Bid of $${bidAmount} placed successfully!`);
      setBidAmount(""); // clear input
      await fetchAuction(); // refresh auction to show updated highest bid
    } catch (err) {
      setMessage(err.response?.data?.message || "Failed to place bid.");
    }
  };

  const getCurrentPrice = () => {
    return auction.highestBid || auction.finalPrice || auction.itemId?.startingPrice || 0;
  };

  const getMinBidAmount = () => {
    return getCurrentPrice() + 1;
  };

  if (loading) {
    return (
      <div className="place-bid-page">
        <div className="loading-state">
          <div className="loading-spinner"></div>
          <p>Loading auction details...</p>
        </div>
      </div>
    );
  }

  if (!auction) {
    return (
      <div className="place-bid-page">
        <div className="error-state">
          <h2>Auction Not Found</h2>
          <p>{message || "The requested auction could not be found."}</p>
          <button className="back-button" onClick={() => navigate("/buyer")}>
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="place-bid-page">
      <div className="page-header">
        <button className="back-button" onClick={() => navigate("/buyer")}>
          ← Back to Dashboard
        </button>
        <h1 className="page-title">Place Your Bid</h1>
      </div>

      <div className="content-container">
        <div className="auction-info">
          <div className="item-header">
            <h2 className="item-title">{auction.itemId?.title}</h2>
            <div className="item-category">
              {auction.itemId?.category || "Uncategorized"}
            </div>
          </div>

          <div className="item-description">
            <h3>Description</h3>
            <p>{auction.itemId?.description || "No description available."}</p>
          </div>

          <div className="pricing-grid">
            <div className="price-card">
              <span className="price-label">Starting Price</span>
              <span className="price-value">${auction.itemId?.startingPrice || 0}</span>
            </div>
            <div className="price-card">
              <span className="price-label">Reserve Price</span>
              <span className="price-value">${auction.itemId?.reservePrice || 0}</span>
            </div>
            <div className="price-card highlight">
              <span className="price-label">Current Highest Bid</span>
              <span className="price-value">${getCurrentPrice()}</span>
            </div>
          </div>

          <div className="bidder-info">
            <h4>Current Leader</h4>
            <p className="bidder-name">
              {auction.highestBidder?.username || "No bids yet"}
            </p>
          </div>
        </div>

        <div className="bid-form-container">
          <div className="form-header">
            <h3>Submit Your Bid</h3>
            <p>Enter an amount higher than the current bid</p>
          </div>

          <form className="bid-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="bidAmount">Your Bid Amount ($)</label>
              <div className="input-container">
                <span className="input-prefix">$</span>
                <input
                  id="bidAmount"
                  type="number"
                  value={bidAmount}
                  onChange={(e) => setBidAmount(e.target.value)}
                  required
                  min={getMinBidAmount()}
                  step="0.01"
                  placeholder={getMinBidAmount().toFixed(2)}
                  className="bid-input"
                />
              </div>
              <small className="input-helper">
                Minimum bid: ${getMinBidAmount().toFixed(2)}
              </small>
            </div>

            <button type="submit" className="submit-bid-button">
              Place Bid
            </button>
          </form>

          {message && (
            <div className={`message-alert ${message.includes("successfully") ? "success" : "error"}`}>
              {message}
            </div>
          )}

          <div className="bid-guidelines">
            <h4>Bidding Guidelines</h4>
            <ul>
              <li>All bids are final and cannot be retracted</li>
              <li>You will be notified if someone outbids you</li>
              <li>Payment is required within 24 hours of winning</li>
              <li>Bids must be in whole dollar amounts or cents</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}