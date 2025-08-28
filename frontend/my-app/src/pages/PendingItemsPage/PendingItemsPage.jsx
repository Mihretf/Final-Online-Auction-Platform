import React, { useEffect, useState } from "react";
import BackToDashboardButton from "../HomeButtons/BacktoDashboardButton";

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
      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Owner</th>
            <th>Image</th>
            <th>Document</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.length > 0 ? (
            items.map(item => (
              <tr key={item._id}>
                <td>{item.title}</td>
                <td>{item.description}</td>
                <td>{item.sellerId?.username || "N/A"}</td>
                <td>
                  {item.image ? (
                    <img 
                      src={`http://localhost:5000/uploads/${item.image}`} 
                      alt={item.title} 
                      style={{ width: "100px", height: "auto" }}
                    />
                  ) : (
                    "No image"
                  )}
                </td>
                <td>
                  {item.document ? (
                    <a 
                      href={`http://localhost:5000/uploads/${item.document}`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                    >
                      View Document
                    </a>
                  ) : (
                    "No document"
                  )}
                </td>
                <td>
                  <button onClick={() => handleAction(item._id, "approve")}>
                    ✅ Approve
                  </button>
                  <button onClick={() => handleAction(item._id, "reject")}>
                    ❌ Reject
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">No pending items</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default PendingItemsPage;
