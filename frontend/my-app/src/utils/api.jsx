// src/utils/api.jsx
const BASE_URL = "http://localhost:5000"; // your backend

export async function loginUser({ email, password }) {
  const res = await fetch(`${BASE_URL}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) {
    const errData = await res.json();
    throw new Error(errData.message || "Invalid credentials");
  }

  const data = await res.json();
  // Expected data: { id, role, token }
  localStorage.setItem("authToken", data.token); // save JWT for future requests
  return data;
}

export async function registerUser({ username, email, password, phone, role, bankStatement }) {
  const res = await fetch(`${BASE_URL}/api/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, email, password, phone, role, bankStatement }),
  });

  if (!res.ok) {
    const errData = await res.json();
    throw new Error(errData.message || "Registration error");
  }

  return res.json();
}
