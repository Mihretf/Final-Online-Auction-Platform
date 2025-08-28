import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// Import pages/components

import Register from "./pages/Register/Register";
import BuyerDashboard from "./pages/Dashboard/BuyerDashboard";
import SellerDashboard from "./pages/Dashboard/SellerDashboard";
import AdminDashboard from "./pages/Dashboard/AdminDashboard";
import Login from "./pages/Login/Login";
// import NotFound from "./pages/NotFound";
import Landing, { LandingPage } from "./pages/LandingPage/Landing.jsx"
import PlaceBidPage from "./pages/PlaceBidPage/PlaceBidPage.jsx";
import UsersPage from "./pages/UsersPage/UsersPage.jsx";
import PendingItemsPage from "./pages/PendingItemsPage/PendingItemsPage.jsx";
import AuctionsPage from "./pages/Auctions/AuctionsPage.jsx";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/" element={<LandingPage/>} />

        <Route path="/buyer" element={<BuyerDashboard />} />
        <Route path="/buyer/bid/:auctionId" element={<PlaceBidPage />} />
        <Route path="/seller" element={<SellerDashboard />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/users" element={<UsersPage />} />
        <Route path="/admin/pending-items" element={<PendingItemsPage />} />
        <Route path="/admin/auctions" element={<AuctionsPage />} />

      </Routes>
    </Router>
  );
}

export default App;