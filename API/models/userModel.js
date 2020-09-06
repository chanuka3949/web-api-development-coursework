const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
  address1: { type: String, required: true },
  address2: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, default: null },
  country: { type: String, required: true },
  postalCode: { type: String, required: true },
  contactNumber: { type: Number, required: true },
});

const userSchema = new mongoose.Schema({
  uid: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  picture: {
    type: String,
  },
  address: {
    type: addressSchema,
  },
});

const User = mongoose.model("User", userSchema);
module.exports = User;
