import React, { useEffect, useState } from "react";
import BackToDashboardButton from "../HomeButtons/BacktoDashboardButton";
import "./UsersPage.css"; // create this file for styles

function UsersPage() {
  const [users, setUsers] = useState([]);
  const token = localStorage.getItem("token");

  const fetchUsers = async () => {
    if (!token) {
      console.error("No token found! Please log in as admin.");
      window.location.href = "/login";
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/users", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) {
        if (res.status === 401) window.location.href = "/login";
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const data = await res.json();
      setUsers(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Error fetching users:", err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const updateUserStatus = async (userId, status) => {
    try {
      const res = await fetch(`http://localhost:5000/api/users/${userId}/status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to update user status");

      fetchUsers();
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  return (
    <div>
      <BackToDashboardButton />
      <h1>All Users</h1>

      {users.length === 0 ? (
        <p style={{ textAlign: "center" }}>No users found</p>
      ) : (
        <div className="users-grid">
          {users.map((user) => (
            <div key={user._id} className="user-card">
              <p className="user-name">{user.username || "N/A"}</p>
              <p className="user-email">{user.email}</p>
              <p className="user-role">Role: {user.role}</p>
              <p className="user-status">Status: {user.status}</p>
              <div className="user-actions">
                {user.status === "pending" && (
                  <>
                    <button
                      className="approve"
                      onClick={() => updateUserStatus(user._id, "approved")}
                    >
                      ✅
                    </button>
                    <button
                      className="reject"
                      onClick={() => updateUserStatus(user._id, "rejected")}
                    >
                      ❌
                    </button>
                  </>
                )}
                {user.status === "approved" && <span>✅ Approved</span>}
                {user.status === "rejected" && <span>❌ Rejected</span>}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default UsersPage;
