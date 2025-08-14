// Nodemailer setup for sending emails from the server
const nodemailer = require('nodemailer');

// Create a reusable transporter object using SMTP transport
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER, // your gmail
    pass: process.env.EMAIL_PASS, // app password
  },
});

/**
 * Send an email with the given subject and text to the specified recipient.
 * @param {string} to - Recipient email address
 * @param {string} subject - Email subject
 * @param {string} text - Email body (plain text)
 * @returns {Promise}
 */
async function sendOrderNotification({ order }) {
  // Format cart items
  const cartItemsText = (order.cartItems || []).map(item =>
    `- ${item.title} (x${item.quantity}) @ ₹${item.price}`
  ).join("\n");

  // Format address
  const addressInfo = order.addressInfo || {};
  const addressText = `${addressInfo.address || ""}, ${addressInfo.city || ""}, ${addressInfo.state || ""}, ${addressInfo.country || ""}, ${addressInfo.pincode || ""}`;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: 'pradhikshaasilks@gmail.com',
    subject: `New Order Placed: ${order._id}`,
    text:
      `A new order has been placed.\n\n` +
      `Order ID: ${order._id}\n` +
      `User ID: ${order.userId}\n` +
      `Order Status: ${order.orderStatus}\n` +
      `Payment Method: ${order.paymentMethod}\n` +
      `Payment Status: ${order.paymentStatus}\n` +
      `Total Amount: ₹${order.totalAmount}\n` +
      `Order Date: ${order.orderDate}\n` +
      `Address: ${addressText}\n` +
      `Phone: ${addressInfo.phone || ""}\n` +
      (addressInfo.isGift ? `Gift: Yes\nGift Message: ${addressInfo.giftMessage || ""}\n` : "") +
      `\nCart Items:\n${cartItemsText}`,
  };

  try {
    let info = await transporter.sendMail(mailOptions);
    console.log("Order notification email sent:", info.response);
  } catch (err) {
    console.error("Email send error:", err);
  }
}

module.exports = { sendOrderNotification };
