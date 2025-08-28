import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";
import "./Seller.css";

export default function SellerDashboard() {
  const [showForm, setShowForm] = useState(false);
  const [items, setItems] = useState([]);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const toggleForm = () => {
    setShowForm(!showForm);
    setMessage("");
  };

  const fetchMyItems = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user?.token) return;

    try {
      const res = await axios.get("http://localhost:5000/api/items/mine", {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setItems(res.data);
    } catch (err) {
      console.error("Error fetching items:", err);
    }
  };

  useEffect(() => {
    fetchMyItems();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user?.token) return;

    const form = e.target;
    const formData = new FormData();
    formData.append("title", form.title.value);
    formData.append("description", form.description.value);
    formData.append("category", form.category.value);
    formData.append("startingPrice", form.startingPrice.value);
    formData.append("reservePrice", form.reservePrice.value || 0);
    formData.append("startTime", form.startTime.value);
    formData.append("endTime", form.endTime.value);

    // Append files if selected
    if (form.image.files[0]) formData.append("image", form.image.files[0]);
    if (form.document.files[0]) formData.append("document", form.document.files[0]);

    try {
      const res = await axios.post("http://localhost:5000/api/items", formData, {
        headers: {
          Authorization: `Bearer ${user.token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      setMessage(res.data.message);
      fetchMyItems();
      form.reset();
      setShowForm(false);
    } catch (err) {
      console.error(err);
      setMessage(err.response?.data?.message || "Failed to submit item");
    }
  };

  return (
    <div className="seller-dashboard">
      <div className="dashboard-header">
        <h1>Seller Dashboard</h1>
        <button className="logout-button" onClick={handleLogout}>
          <LogOut size={18} /> Logout
        </button>
      </div>

      <button onClick={toggleForm}>
        {showForm ? "Hide Add Item Form" : "Add New Item"}
      </button>

      {message && <p className="submit-message">{message}</p>}

      {showForm && (
        <div className="add-item-section">
          <h2>Add New Item</h2>
          <form onSubmit={handleSubmit}>
            <input name="title" type="text" placeholder="Title" required />
            <textarea name="description" placeholder="Description" required />
            <input name="category" type="text" placeholder="Category" required />
            <input name="startingPrice" type="number" placeholder="Starting Price" required />
            <input name="reservePrice" type="number" placeholder="Reserve Price (optional)" />
            <label>
              Start Time:
              <input name="startTime" type="datetime-local" required />
            </label>
            <label>
              End Time:
              <input name="endTime" type="datetime-local" required />
            </label>
            <label>
              Item Image:
              <input name="image" type="file" accept="image/*" />
            </label>
            <label>
              Legal Document:
              <input name="document" type="file" accept=".pdf,.doc,.docx" />
            </label>
            <button type="submit">Submit Item</button>
          </form>
        </div>
      )}

      <div className="existing-items-section">
        <h2>Your Items</h2>
        {items.length === 0 && <p>No items yet.</p>}
        {items.map((item) => (
          <div key={item._id} className={`item-card ${item.status}`}>
            <h3>{item.title}</h3>
            {item.image && <img src={`http://localhost:5000/uploads/${item.image}`} alt={item.title} style={{maxWidth: "200px"}} />}
            <p>{item.description}</p>
            <p>Category: {item.category}</p>
            <p>Starting Price: ${item.startingPrice}</p>
            {item.reservePrice > 0 && <p>Reserve Price: ${item.reservePrice}</p>}
            <p>Status: <strong>{item.status}</strong></p>
            {item.startTime && item.endTime && (
              <p>
                Auction Window: {new Date(item.startTime).toLocaleString()} - {new Date(item.endTime).toLocaleString()}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
