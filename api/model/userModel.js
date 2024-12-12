const { Double } = require("bson");
const mongoose = require("mongoose");
const { type } = require("os");

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
  },
  saldo: {
    type: Double,
    default: 0,
  },
  point: {
    type: Number,
    default: 0,
  },
  isVerivied: {
    type: Boolean,
    default: false,
  },
  foto: {
    type: String,
  },
});

const userModel = mongoose.model("User", userSchema);
module.exports = userModel;
