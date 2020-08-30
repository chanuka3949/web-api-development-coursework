const mongoose = require("mongoose");

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
    address1: {type: String, default: null},
    address2: {type: String, default: null},
    city: {type: String, default: null},
    state: {type: String, default: null},
    country: {type: String, default: null},
    postalCode: {type: String, default: null},
    contactNumber: {type: String, default: null},
  },
});

const User = mongoose.model("User", userSchema);
module.exports = User;
