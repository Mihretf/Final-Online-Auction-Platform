import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
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

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'status-pending';
      case 'approved': return 'status-approved';
      case 'rejected': return 'status-rejected';
      default: return 'status-pending';
    }
  };

  return (
    <div className="seller-dashboard">
      <div className="dashboard-header">
        <div className="header-content">
          <h1 className="dashboard-title">Seller Dashboard</h1>
          <p className="dashboard-subtitle">Manage your auction items</p>
        </div>
        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      </div>

      <div className="dashboard-content">
        <div className="action-section">
          <button className="toggle-form-button" onClick={toggleForm}>
            {showForm ? "Cancel" : "Add New Item"}
          </button>

          {message && (
            <div className="message-alert">
              {message}
            </div>
          )}
        </div>

        {showForm && (
          <div className="add-item-form-container">
            <div className="form-header">
              <h2>Add New Item</h2>
              <p>Fill in the details for your auction item</p>
            </div>
            
            <form className="add-item-form" onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="title">Title</label>
                  <input 
                    id="title"
                    name="title" 
                    type="text" 
                    placeholder="Enter item title" 
                    required 
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="category">Category</label>
                  <input 
                    id="category"
                    name="category" 
                    type="text" 
                    placeholder="Enter category" 
                    required 
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="description">Description</label>
                <textarea 
                  id="description"
                  name="description" 
                  placeholder="Describe your item in detail" 
                  required 
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="startingPrice">Starting Price ($)</label>
                  <input 
                    id="startingPrice"
                    name="startingPrice" 
                    type="number" 
                    placeholder="0.00" 
                    step="0.01"
                    required 
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="reservePrice">Reserve Price ($)</label>
                  <input 
                    id="reservePrice"
                    name="reservePrice" 
                    type="number" 
                    placeholder="0.00 (optional)" 
                    step="0.01"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="startTime">Start Time</label>
                  <input 
                    id="startTime"
                    name="startTime" 
                    type="datetime-local" 
                    required 
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="endTime">End Time</label>
                  <input 
                    id="endTime"
                    name="endTime" 
                    type="datetime-local" 
                    required 
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="image">Item Image</label>
                  <input 
                    id="image"
                    name="image" 
                    type="file" 
                    accept="image/*"
                    className="file-input"
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="document">Legal Document</label>
                  <input 
                    id="document"
                    name="document" 
                    type="file" 
                    accept=".pdf,.doc,.docx"
                    className="file-input"
                  />
                </div>
              </div>

              <button type="submit" className="submit-button">
                Submit Item for Approval
              </button>
            </form>
          </div>
        )}

        <div className="items-section">
          <div className="section-header">
            <h2>Your Items</h2>
            <span className="items-count">{items.length} items</span>
          </div>
          
          {items.length === 0 ? (
            <div className="empty-state">
              <h3>No items yet</h3>
              <p>Start by adding your first auction item</p>
            </div>
          ) : (
            <div className="items-grid">
              {items.map((item) => (
                <div key={item._id} className="item-card">
                  <div className="item-image">
                    {item.image ? (
                      <img 
                        src={`http://localhost:5000/uploads/${item.image}`} 
                        alt={item.title}
                        className="item-img"
                      />
                    ) : (
                      <div className="image-placeholder">
                        <span>No Image</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="item-content">
                    <div className="item-header">
                      <h3 className="item-title">{item.title}</h3>
                      <span className={`status-badge ${getStatusColor(item.status)}`}>
                        {item.status}
                      </span>
                    </div>
                    
                    <p className="item-category">Category: {item.category}</p>
                    <p className="item-description">{item.description}</p>
                    
                    <div className="item-pricing">
                      <span className="price-label">Starting: ${item.startingPrice}</span>
                      {item.reservePrice > 0 && (
                        <span className="price-label">Reserve: ${item.reservePrice}</span>
                      )}
                    </div>
                    
                    {item.startTime && item.endTime && (
                      <div className="item-timing">
                        <p className="time-info">
                          <strong>Start:</strong> {new Date(item.startTime).toLocaleDateString()}
                        </p>
                        <p className="time-info">
                          <strong>End:</strong> {new Date(item.endTime).toLocaleDateString()}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}