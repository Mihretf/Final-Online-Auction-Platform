import React, { useEffect, useState } from "react";
import BackToDashboardButton from "../HomeButtons/BacktoDashboardButton";

function UsersPage() {
  const [users, setUsers] = useState([]);

  const token = localStorage.getItem("token");

  // Fetch users
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
        if (res.status === 401) {
          console.error("Unauthorized! Admin token required.");
          window.location.href = "/login";
        }
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

  // Approve or Reject user
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

      // Refresh the users list
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
      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Username</th>
            <th>Email</th>
            <th>Role</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map((user) => (
              <tr key={user._id}>
                <td>{user.username || "N/A"}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>{user.status}</td>
                <td>
                  {user.status === "pending" && (
                    <>
                      <button
                        onClick={() => updateUserStatus(user._id, "approved")}
                        style={{ marginRight: "5px" }}
                      >
                        Approve
                      </button>
                      <button onClick={() => updateUserStatus(user._id, "rejected")}>
                        Reject
                      </button>
                    </>
                  )}
                  {user.status === "approved" && <span>✅ Approved</span>}
                  {user.status === "rejected" && <span>❌ Rejected</span>}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">No users found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default UsersPage;
