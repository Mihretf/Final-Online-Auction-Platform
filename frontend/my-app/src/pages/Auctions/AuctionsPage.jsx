import React, { useEffect, useState } from "react";
import BackToDashboardButton from "../HomeButtons/BacktoDashboardButton";
import { formatTimeRemaining } from "../../utils/time";

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

  return (
    <div>
      <BackToDashboardButton />
      <h1>Live Auctions</h1>
      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Item</th>
            <th>Current Price</th>
            <th>Highest Bidder</th>
            <th>Time Remaining</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {auctions.length > 0 ? (
            auctions.map((auction) => (
              <tr key={auction._id}>
                <td>{auction.itemId?.title || "Unknown"}</td>
                <td>${auction.highestBid || auction.itemId?.startingPrice || 0}</td>
                <td>{auction.highestBidder?.username || "No bids yet"}</td>
                <td>{timeLeft[auction._id] || formatTimeRemaining(auction.endTime)}</td>
                <td>
                  <button
                    style={{ backgroundColor: "red", color: "white", cursor: "pointer" }}
                    onClick={() => handleDelete(auction._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">No auctions available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default AuctionsPage;
