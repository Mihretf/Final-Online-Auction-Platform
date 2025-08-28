import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Users, Package, Gavel, LogOut } from "lucide-react"; 
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
        <h1 className="dashboard-title">Admin Dashboard</h1>
        <button className="logout-button" onClick={handleLogout}>
          <LogOut size={18} /> Logout
        </button>
      </div>

      <div className="cards-container">
        <div className="card clickable" onClick={() => navigate("/admin/users")}>
          <Users size={20} />
          <h2>{usersCount} Users</h2>
          <p>Manage all registered users</p>
        </div>

        <div className="card clickable" onClick={() => navigate("/admin/pending-items")}>
          <Package size={20} />
          <h2>{pendingItemsCount} Pending Items</h2>
          <p>Approve or reject items</p>
        </div>

        <div className="card clickable" onClick={() => navigate("/admin/auctions")}>
          <Gavel size={20} />
          <h2>{auctionsCount} Auctions</h2>
          <p>Monitor all auctions</p>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
