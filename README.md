# 🏷️ Online Auction Platform

*A secure and transparent online auction system for government agencies, private sellers, and individual bidders.*

---

## 🚀 Project Overview

This platform provides a **secure, transparent, and user-friendly** space for auctions where government agencies, businesses, and individuals can sell assets such as **vehicles, land, buildings, or equipment**.
Bidders participate remotely, while the system ensures fairness, verifies documents, manages payments, and sends real-time notifications.

**Objectives:**

* Enable **remote participation** for bidders.
* Ensure **fairness** through secure authentication and verification.
* Streamline **document approval, payments, and notifications**.

---

## 👥 Key Actors

| Actor                                      | Responsibilities                                                                |
| ------------------------------------------ | ------------------------------------------------------------------------------- |
| **Bidder (Buyer)**                         | Registers, uploads financial verification, places bids, receives notifications. |
| **Seller (Auctioneer/Government/Private)** | Uploads auction items with legal documents, tracks auction progress.            |
| **Admin**                                  | Verifies users, approves/rejects listings, monitors auctions, manages disputes. |

---

## 🌟 Core Features

* ✅ **Secure User Registration** with JWT authentication.
* ✅ **Role-Based Access Control** (Bidder, Seller, Admin).
* ✅ **Item Listing & Legal Document Verification**
* ⚡ **Manual & Auto-Bidding (Proxy Bid System)**
* 💳 **Payment Integration** (entry fees & final settlement)
* 🔔 **Notifications** via Email/SMS & future WebSocket support
* 🛡️ **Audit Logging** for all critical actions
* 🤖 **AI-Powered Chatbot (“Auction Buddy”)** for guidance, FAQs, and recommendations (planned)

---

## 🔄 User Flows

### 🟢 Bidder Flow

1. Browse auctions on landing page
2. Register/login & upload bank statement (≥50% of bid value)
3. Pay participation fee (if required)
4. Choose bidding mode: **manual** or **proxy bid**
5. Submit bids → status pending
6. Receive notifications (outbid alerts, auction closing)
7. If won → complete payment → receive invoice

### 🟠 Seller Flow

1. Register/login
2. Upload item details, images, and legal documents
3. Submit listing → pending admin approval
4. Track auction progress
5. Receive payment after auction closes

### 🔵 Admin Flow

1. Login as pre-created admin
2. Approve/reject user registrations and item listings
3. Monitor active auctions
4. Resolve disputes
5. Generate audit logs
6. View system analytics

---

## 🗂️ Folder Structure

```
online-auction-platform/
│
├── backend/
│   ├── controllers/       # API route handlers
│   ├── models/            # Mongoose models (Users, Items, Auctions, etc.)
│   ├── routes/            # Express routes
│   ├── middleware/        # Authentication & authorization
│   ├── utils/             # Helper functions (email, payment, notifications)
│   ├── config/            # Database and environment config
│   ├── server.js          # Entry point
│   └── package.json
│
├── frontend/              # (Planned) React app
│   ├── src/
│   ├── public/
│   └── package.json
│
├── .env                   # Environment variables (Mongo URI, JWT secret)
├── README.md
└── .gitignore
```

---

## 📡 API Endpoints

### Authentication

| Method | Endpoint             | Description                     |
| ------ | -------------------- | ------------------------------- |
| POST   | `/api/auth/register` | Create new user (bidder/seller) |
| POST   | `/api/auth/login`    | Login user and return JWT       |

### Items

| Method | Endpoint         | Description                         |
| ------ | ---------------- | ----------------------------------- |
| POST   | `/api/items`     | Create new auction item (seller)    |
| GET    | `/api/items`     | Fetch all items                     |
| GET    | `/api/items/:id` | Fetch single item with auction info |
| PATCH  | `/api/items/:id` | Update item (seller/admin)          |
| DELETE | `/api/items/:id` | Delete item (admin only)            |

### Auctions

| Method | Endpoint            | Description                |
| ------ | ------------------- | -------------------------- |
| POST   | `/api/auctions`     | Create auction for an item |
| GET    | `/api/auctions`     | Fetch all auctions         |
| PATCH  | `/api/auctions/:id` | Update auction status      |
| DELETE | `/api/auctions/:id` | Delete auction             |

### Bids

| Method | Endpoint                    | Description               |
| ------ | --------------------------- | ------------------------- |
| POST   | `/api/bids/place`           | Place manual or proxy bid |
| GET    | `/api/bids/highest/:itemId` | Fetch current highest bid |

### Payments

| Method | Endpoint                 | Description                  |
| ------ | ------------------------ | ---------------------------- |
| POST   | `/api/payments/initiate` | Initiate payment for auction |
| GET    | `/api/payments/history`  | Get payment history          |

### Admin

| Method | Endpoint            | Description                 |
| ------ | ------------------- | --------------------------- |
| GET    | `/api/users`        | Fetch all users             |
| PUT    | `/api/users/:id`    | Update user                 |
| DELETE | `/api/users/:id`    | Delete user                 |
| PATCH  | `/api/items/:id`    | Approve/reject item listing |
| PATCH  | `/api/auctions/:id` | Admin auction control       |

---

## 🧪 Postman Testing Workflow

### 0️⃣ Preliminaries

```bash
npm run dev
# or
node server.js
```

* Ensure MongoDB is running and `.env` is configured
* Create a collection in Postman: **Marvel Auction Test**

### Steps

1. **Register Users** → 5 sellers + 5 bidders
2. **Login Users** → save JWT tokens
3. **Create Items** → sellers add items
4. **Create Auctions** → schedule auctions
5. **Fetch Items/Auctions** → verify listings
6. **Place Bids** → manual & proxy bids
7. **Check Highest Bid** → ensure bid logic works
8. **Complete Auction** → simulate closing
9. **Payment** → winner initiates payment, simulate callback
10. **Payment History** → verify transactions
11. **Admin Actions** → approve users/items, analytics
12. **Test Edge Cases** → invalid bids, unauthorized access

---

## 🗄️ Database Schema

[View DB Diagram](https://dbdiagram.io/d/DB-schema-68a36d2fec93249d1e2002f5)

Collections:

* Users, Items, Auctions, Bids, Payments, Notifications, AuditLogs

---

## 🔮 Future Enhancements

* Microservices for modular development
* Real-time WebSocket updates for bids
* AI-powered Auction Buddy chatbot
* Advanced analytics dashboard for admins and sellers

---

## 👤 Author

**Mihret Fekadu** – Junior Full-Stack Developer
mihretworku94@gmail.com
**Obsan Habtamu**
obsanhabtamu0@gmail.com
**Natnael Tewodros**
Natnaeltewodros03@gmail.com
**Muaz Kedir**
Mkedir3776@gmail.com
**Ebeshin Terefe**
terefeebeshin@gmail.com




---


