🏷️ Online Auction Platform

A secure and transparent online auction system for government agencies, private sellers, and individual bidders.

Project Overview

This platform provides a secure, transparent, and user-friendly space for auctions where government agencies, businesses, and individuals can sell assets such as vehicles, land, buildings, or equipment.
Bidders participate remotely, while the system ensures fairness, verifies documents, manages payments, and sends real-time notifications.

Objectives

Enable remote participation for bidders.
Ensure fairness through secure authentication and verification.
Streamline document approval, payments, and notifications.

Key Actors

Actor	 Responsibilities
Bidder (Buyer)	Registers, uploads financial verification, places bids, receives notifications.
Seller (Auctioneer/Government/Private)	Uploads auction items with legal documents, tracks auction progress.
Admin	Verifies users, approves/rejects listings, monitors auctions, manages disputes.

 Core Features (Planned & In Progress)

 Secure User Registration with JWT authentication.
 Role-Based Access Control (Bidder, Seller, Admin).
 Item Listing & Legal Document Verification.
 Manual & Auto-Bidding (Proxy Bid System).
 Payment Integration (entry fees & final settlement).
 Notifications via Email/SMS & future WebSocket support.
 Audit Logging for all critical actions.
 AI-Powered Chatbot (“Auction Buddy”) to answer FAQs, guide users, and recommend items (planned).

User Flows
Bidder

Browse auctions on landing page.
Register/login & upload bank statement (≥50% of bid value).
Pay participation fee (if required).
Choose bidding mode: manual or proxy bid.
Submit bids and receive real-time updates (success/outbid/closing soon).
Complete payment if auction is won → receive invoice.

Seller

Register/login.
Upload item details, images, and legal documents.
Wait for Admin approval.
Track bids & receive payment after auction closure.

Admin

Approve/reject user registrations and listings.
Monitor auctions and resolve disputes.
Generate audit logs and system analytics.

Technical Implementation

Backend: Node.js, Express.js, MongoDB (with Mongoose ODM)
Frontend: React.js (planned integration)
Database Hosting: MongoDB Atlas
Authentication: JWT
Version Control: Git/GitHub
API Documentation: Strict documentation enforced for smooth backend collaboration.

Development Challenges

This project was built collaboratively by a distributed team, presenting unique technical hurdles:

Shared Database on MongoDB Atlas:
Setting up a common database for all team members while working on individual local servers required careful configuration and role management.

Strict API Documentation:
Since we haven’t implemented microservices yet, team members were heavily dependent on each other’s endpoints.
Clear, strict API contracts were critical to prevent breaking changes.

Future Real-Time Features:
WebSockets are planned for live bidding alerts, but currently handled with email/SMS notifications.

These challenges significantly strengthened our teamwork, documentation discipline, and problem-solving skills.

Database Schema

View the full database diagram here: https://dbdiagram.io/d/DB-schema-68a36d2fec93249d1e2002f5

Key collections:

Users – role-based access (bidder/seller/admin), verification documents.

Items – auction items with legal attachments.

Auctions – tracks bidding timelines and winners.

Bids – stores all bid activity with proxy support.

Payments – secure transaction records.

Notifications – email/SMS/in-app alerts.

AuditLogs – admin actions for transparency.

🔮 Future Enhancements

Microservices Architecture for scalability and modular deployment.

Real-Time WebSocket Bidding for instant updates.

AI-Powered Auction Buddy chatbot for guidance and recommendations.

Advanced Analytics Dashboard for admins and sellers.

⚡ Team & Collaboration

This project is being developed by a team of junior full-stack developers as part of a collaborative learning program.
We emphasize:

Agile workflows (clear documentation, Git branching strategy).

Code reviews for consistency.

Shared resources (MongoDB Atlas, strict API contracts).

🛠️ Setup & Installation

Clone the repository

git clone https://github.com/<your-username>/online-auction-platform.git
cd online-auction-platform


Install dependencies

npm install


Set environment variables
Create a .env file with:

MONGO_URI=<Your MongoDB Atlas URI>
JWT_SECRET=<Your Secret Key>


Run the backend

npm run dev

Current Status

In Development – Core backend (authentication, bidding logic, and database)and Frontend integration are functional.
AI chatbot and websocket features are planned for upcoming sprints.

👤 Author

Mihret Fekadu mihretworku94@gmail.com
Obsan Habtamu obsanhabtamu0@gmail.com
Natnael Tewodros Natnaeltewodros03@gmail.com
Muaz Kedir Mkedir3776@gmail.com
Ebeshin Terefe terefeebeshin@gmail.com

