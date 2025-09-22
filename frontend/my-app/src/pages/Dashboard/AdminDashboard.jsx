import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Admin.css";

function AdminDashboard() {
  const [usersCount, setUsersCount] = useState(0);
  const [pendingItemsCount, setPendingItemsCount] = useState(0);
  const [auctionsCount, setAuctionsCount] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    const fetchData = async () => {
      try {
        const headers = { Authorization: `Bearer ${token}` };

        const usersRes = await fetch("http://localhost:5000/api/users", { headers });
        const usersData = await usersRes.json();
        setUsersCount(usersData.length);

        const itemsRes = await fetch("http://localhost:5000/api/items?status=pending", { headers });
        const itemsData = await itemsRes.json();
        setPendingItemsCount(itemsData.length);

        const auctionsRes = await fetch("http://localhost:5000/api/auctions", { headers });
        const auctionsData = await auctionsRes.json();
        setAuctionsCount(auctionsData.length);

      } catch (err) {
        console.error("Error fetching admin dashboard data:", err);
      }
    };

    fetchData();
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="admin-dashboard">
      <div className="dashboard-header">
        <div className="header-content">
          <h1 className="dashboard-title">Admin Dashboard</h1>
          <p className="dashboard-subtitle">Manage your auction platform</p>
        </div>
        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      </div>

      <div className="stats-grid">
        <div className="stat-card clickable" onClick={() => navigate("/admin/users")}>
          <div className="stat-number">{usersCount}</div>
          <div className="stat-label">Total Users</div>
          <div className="stat-description">Manage all registered users</div>
        </div>

        <div className="stat-card clickable" onClick={() => navigate("/admin/pending-items")}>
          <div className="stat-number">{pendingItemsCount}</div>
          <div className="stat-label">Pending Items</div>
          <div className="stat-description">Approve or reject items</div>
        </div>

        <div className="stat-card clickable" onClick={() => navigate("/admin/auctions")}>
          <div className="stat-number">{auctionsCount}</div>
          <div className="stat-label">Active Auctions</div>
          <div className="stat-description">Monitor all auctions</div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;