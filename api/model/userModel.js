const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  nama: {
    type: String,
    required: true,
  },
  nomorHP: {
    type: String,
    unique: true,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  pin: {
    type: Number,
    min: 1000,
    max: 9999,
  },
  saldo: {
    type: Number,
    default: 0,
  },
  point: {
    type: Number,
    default: 0,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  foto: {
    type: String,
    default: null,
  },
});

const userModel = mongoose.model("User", userSchema);

module.exports = userModel;
