const axios = require("axios");
const Payment = require("../models/paymentModel");
const Auction = require("../models/AuctionsModel");

// --- Initiate Payment with Chapa ---
// exports.initiatePayment = async (req, res) => {
//   console.log(process.env.CHAPA_CALLBACK_URL)
//   console.log(process.env.CHAPA_CALLBACK_URL)
//   console.log(process.env.CHAPA_CALLBACK_URL)
//   console.log(process.env.CHAPA_CALLBACK_URL)
//   console.log(process.env.CHAPA_CALLBACK_URL)
//   try {
//     const { auctionId, method } = req.body;
//     const userId = req.user.id;

//     const auction = await Auction.findById(auctionId);
//     if (!auction || auction.status !== "completed") {
//       return res.status(400).json({ message: "Auction not closed or invalid" });
//     }
//     if (auction.winnerId.toString() !== userId.toString()) {
//       return res.status(403).json({ message: "Only the winner can pay" });
//     }

//     // Create payment record in DB
//     const payment = await Payment.create({
//       auctionId,
//       payerId: userId,
//       amount: auction.finalPrice,
//       method,
//       status: "pending"
//     });

//     // Call Chapa API
//     const tx_ref = "txn_" + Date.now();
// try {
//       const response = await axios.post(
//       "https://api.chapa.co/v1/transaction/initialize",
//       {
//         amount: auction.finalPrice,
//         currency: "ETB",
//         email: req.user.email || "test@example.com",
//         first_name: req.user.name || "AuctionUser",
//         tx_ref,
//         callback_url: process.env.CHAPA_CALLBACK_URL,
//         return_url: process.env.CHAPA_RETURN_URL
//       },
//       {
//         headers: { Authorization: `Bearer ${process.env.CHAPA_SECRET_KEY}` }
//       }
//     );
// } catch (error) {
//   console.log(error.message)
// }

//     if (response.data.status === "success") {
//       payment.transactionId = tx_ref;
//       await payment.save();
//       return res.json({
//         checkout_url: response.data.data.checkout_url,
//         payment
//       });
//     } else {
//       return res.status(400).json({ message: "Chapa init failed" });
//     }
//   } catch (err) {
//     // console.error("[initiatePayment]", err);
//     res.status(500).json({ message: err.message });
//   }
// };
exports.initiatePayment = async (req, res) => {
  var myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${process.env.CHAPA_SECRET_KEY}`);
  myHeaders.append("Content-Type", "application/json");
  var raw = JSON.stringify({
    amount: "10",
    currency: "ETB",
    email: "abebech_bekele@gmail.com",
    first_name: "Bilen",
    last_name: "Gizachew",
    phone_number: "0912345678",
    tx_ref: "txn_" + Date.now(),
    callback_url: process.env.CHAPA_CALLBACK_URL,
    return_url: process.env.CHAPA_RETURN_URL,
    "customization[title]": "Payment for my favourite merchant",
    "customization[description]": "I love online payments",
    "meta[hide_receipt]": "true",
  });
  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };
  fetch("https://api.chapa.co/v1/transaction/initialize", requestOptions)
    .then((response) => response.text())
    .then((result) => {
      console.log("Successfully initiated payment:");
      res.json({
        message: "Payment initiated",
        checkoutUrl: JSON.parse(result).data.checkout_url,
      });
    })
    .catch((error) => {
      console.log("error", error);
      res.status(500).json({
        message: "Chapa API error",
        error: error.message,
      });
    });
};
// --- Handle Chapa Callback ---
// exports.chapaCallback = async (req, res) => {
//   try {
//     const { tx_ref, status } = req.query;
//     const payment = await Payment.findOne({ transactionId: tx_ref });
//     if (!payment) return res.status(404).json({ message: "Payment not found" });

//     if (status === "success") {
//       payment.status = "completed";
//     } else {
//       payment.status = "failed";
//     }
//     await payment.save();

//     return res.json({ message: "Payment updated", payment });
//   } catch (err) {
//     console.error("[chapaCallback]", err);
//     res.status(500).json({ message: err.message });
//   }
// };

// // --- Get Payment Status ---
// exports.getPaymentStatus = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const payment = await Payment.findById(id);
//     if (!payment) return res.status(404).json({ message: "Payment not found" });

//     res.json({
//       id: payment._id,
//       status: payment.status,
//       method: payment.method,
//       transactionId: payment.transactionId,
//       createdAt: payment.createdAt
//     });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// // --- Payment History ---
// exports.getPaymentHistory = async (req, res) => {
//   try {
//     const payments = await Payment.find({ payerId: req.user.id }).sort({ createdAt: -1 });
//     res.json(payments);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };
