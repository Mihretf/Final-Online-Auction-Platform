import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

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

  if (loading) return <p>Loading auction details...</p>;
  if (!auction) return <p>{message || "Auction not found."}</p>;

  return (
    <div className="place-bid-page">
      <h1>Place a Bid</h1>
      <h2>{auction.itemId?.title}</h2>
      <p>Starting Price: ${auction.itemId?.startingPrice}</p>
      <p>Reserve Price: ${auction.itemId?.reservePrice}</p>
      <p>{auction.itemId?.description}</p>
      <p>
        Current Highest Bid: $
        {auction.highestBid || auction.finalPrice || auction.itemId?.startingPrice || 0}
      </p>
      <p>
        Highest Bidder: {auction.highestBidder?.username || "No bids yet"}
      </p>

      <form onSubmit={handleSubmit}>
        <label>
          Your Bid:
          <input
            type="number"
            value={bidAmount}
            onChange={(e) => setBidAmount(e.target.value)}
            required
            min={(auction.highestBid || auction.finalPrice || auction.itemId?.startingPrice || 0) + 1}
          />
        </label>
        <button type="submit">Place Bid</button>
      </form>

      {message && (
        <p
          style={{
            marginTop: "10px",
            color: message.includes("successfully") ? "green" : "red",
          }}
        >
          {message}
        </p>
      )}

      <button
        style={{ marginTop: "15px" }}
        onClick={() => navigate("/buyer")}
      >
        Back to Dashboard
      </button>
    </div>
  );
}
