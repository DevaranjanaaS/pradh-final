const mongoose = require("mongoose");

const AddressSchema = new mongoose.Schema(
  {
    userId: String,
    address: String,
    city: String,
    pincode: String,
    phone: String,
    notes: String,
    isGift: { type: Boolean, default: false },
    giftMessage: { type: String, default: "" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Address", AddressSchema);
