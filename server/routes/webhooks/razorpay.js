const express = require("express");
const crypto = require("crypto");
const Order = require("../../models/Order");

const router = express.Router();

// Razorpay webhook endpoint
router.post("/razorpay", express.json({ type: "*/*" }), async (req, res) => {
  const secret = process.env.RAZORPAY_WEBHOOK_SECRET;
  const signature = req.headers["x-razorpay-signature"];
  const body = JSON.stringify(req.body);

  // Verify webhook signature
  const expectedSignature = crypto
    .createHmac("sha256", secret)
    .update(body)
    .digest("hex");

  if (signature !== expectedSignature) {
    return res.status(400).json({ success: false, message: "Invalid signature" });
  }

  const event = req.body.event;
  const payload = req.body.payload;

  if (event === "payment.captured") {
    const paymentId = payload.payment.entity.id;
    const orderId = payload.payment.entity.order_id;
    // Update your order in DB by razorpayOrderId
    await Order.findOneAndUpdate(
      { razorpayOrderId: orderId },
      { paymentStatus: "captured", paymentId },
      { new: true }
    );
  }
  // Add more event handling as needed

  res.status(200).json({ success: true });
});

module.exports = router;
