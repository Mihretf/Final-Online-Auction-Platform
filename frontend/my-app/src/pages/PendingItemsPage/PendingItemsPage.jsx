import React, { useEffect, useState } from "react";
import BackToDashboardButton from "../HomeButtons/BacktoDashboardButton";
import "./PendingItems.css";

function PendingItemsPage() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No token found! Please log in as admin.");
      window.location.href = "/login";
      return;
    }

    fetch("http://localhost:5000/api/items?status=pending", {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => setItems(Array.isArray(data) ? data : []))
      .catch(err => console.error("Error fetching pending items:", err));
  }, []);

  const handleAction = async (itemId, action) => {
    const token = localStorage.getItem("token");
    const url = `http://localhost:5000/api/items/${itemId}/${action}`;

    try {
      const res = await fetch(url, {
        method: "PATCH",
        headers: { 
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      });
      if (!res.ok) throw new Error("Failed to update item");
      setItems(items.filter(item => item._id !== itemId));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <BackToDashboardButton />
      <h1>Pending Items</h1>

      {items.length === 0 ? (
        <p style={{ textAlign: "center" }}>No pending items</p>
      ) : (
        <div className="items-grid">
          {items.map(item => (
            <div key={item._id} className="item-card">
              {item.image && (
                <img
                  src={`http://localhost:5000/uploads/${item.image}`}
                  alt={item.title}
                />
              )}
              <p className="item-title">{item.title}</p>
              <p className="item-description">{item.description}</p>
              <p className="item-owner">Owner: {item.sellerId?.username || "N/A"}</p>
              <div className="item-buttons">
                <button
                  className="approve"
                  onClick={() => handleAction(item._id, "approve")}
                >
                  ✅
                </button>
                <button
                  className="reject"
                  onClick={() => handleAction(item._id, "reject")}
                >
                  ❌
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default PendingItemsPage;
