const nodemailer = require('nodemailer');
const axios = require('axios'); // Add axios to make HTTP requests

// Create a reusable transporter using Ethereal
let transporter;
async function getTransporter() {
  if (transporter) return transporter;

  const testAccount = await nodemailer.createTestAccount();
  transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
      user: testAccount.user,
      pass: testAccount.pass
    }
  });

  console.log('Ethereal test account:', testAccount);
  return transporter;
}

// Account approval email (unchanged)
async function sendApprovalEmail(toEmail, username) {
  const transporter = await getTransporter();

  const info = await transporter.sendMail({
    from: '"Auction App" <no-reply@auctionapp.com>',
    to: toEmail,
    subject: 'Account Approved',
    text: `Hello ${username}, your account has been approved! You can now log in.`,
    html: `<p>Hello <strong>${username}</strong>, your account has been approved! You can now log in.</p>`
  });

  console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
}

// Updated winner email with payment link
async function sendWinnerEmail(toEmail, username, itemTitle, finalPrice, userToken) {
  const transporter = await getTransporter();

  // 1. Initiate payment and get checkout URL
  let checkoutUrl = '';
  try {
    const res = await axios.post(
      'http://localhost:5000/api/payments/initiate',
      {}, // no body needed
      { headers: { Authorization: `Bearer ${userToken}` } }
    );
    checkoutUrl = res.data.checkoutUrl;
  } catch (err) {
    console.error('Error initiating payment:', err);
    checkoutUrl = '#'; // fallback if payment initiation fails
  }

  // 2. Send email with payment link
  const info = await transporter.sendMail({
    from: '"Auction App" <no-reply@auctionapp.com>',
    to: toEmail,
    subject: `Congratulations! You won ${itemTitle}`,
    text: `Hi ${username}, you are the winner of the auction for "${itemTitle}" with a bid of $${finalPrice}. Click this link to pay: ${checkoutUrl}`,
    html: `<p>Hi <strong>${username}</strong>,</p>
           <p>You are the winner of the auction for "<strong>${itemTitle}</strong>" with a bid of <strong>$${finalPrice}</strong>.</p>
           <p>Click the button below to initiate payment:</p>
           <p><a href="${checkoutUrl}" style="padding:10px 20px; background-color:#4CAF50; color:white; text-decoration:none; border-radius:5px;">Pay Now</a></p>`
  });

  console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
}

module.exports = { sendApprovalEmail, sendWinnerEmail };
