const express = require("express");
const router = express.Router();
const textflow = require("textflow.js");
textflow.useKey(
  "ahSpTG4yfwIgOLuhigV4ZJewzqtWQETSbfW7WVU5r8c28QnPLLoe9glYe18CIwdL"
);
const twilio = require("twilio");
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

const userModel = require("../model/userModel");

router.post("/register", async (req, res) => {
  const { nama, email, password, nomorHP } = req.body;
  try {
    const existingUser = await userModel.findOne({ nomorHP });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    const user = await userModel.create({
      nama,
      email,
      password,
      nomorHP,
    });
    res.send(user);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
});

router.post("/login", async (req, res) => {
  const { authentication, password } = req.body;
  try {
    const user = await userModel.findOne({
      $or: [{ email: authentication }, { nomorHP: authentication }],
    });
    if (!user.isVerified) {
      return res
        .status(400)
        .json({ message: "Akun belum melakukan verifikasi!" });
    }
    if (!user) {
      return res.status(400).json({ message: "Akun tidak ditemukan!" });
    }
    if (user.password !== password) {
      return res.status(400).json({ message: "Password salah!" });
    }
    res.send(user);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
});

router.get("/profile", async (req, res) => {
  const { id } = req.body;
  try {
    const user = await userModel.findById(id);
    res.send(user);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
});

router.put("/updateProfile", async (req, res) => {
  const { id, nama, email, foto } = req.body;
  try {
    const update = await userModel.findByIdAndUpdate(id, { nama, email, foto });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
});

const sendOTP = async (toPhoneNumber) => {
  const otpCode = Math.floor(1000 + Math.random() * 9000).toString();
  try {
    await client.messages.create({
      body: `Your OTP code is: ${otpCode}`,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: `whatsapp:${toPhoneNumber}`,
    });
    storedOTP = otpCode;
    console.log("OTP sent:", otpCode);
    return otpCode;
  } catch (error) {
    console.error("Error sending OTP:", error);
  }
};

router.post("/send-code", async (req, res) => {
  try {
    const { phone_number } = req.body;

    if (!phone_number || !/^\+?[1-9]\d{1,14}$/.test(phone_number)) {
      return res.status(400).json({ message: "Nomor telepon tidak valid" });
    }

    const result = await sendOTP(phone_number);
    if (result.status !== 200) {
      return res.status(result.status).json({ message: result.message });
    }
    res.send(result);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server Error!!!" });
  }
});

// router.post("/verify-code", async (req, res) => {
//   try {
//     const { phone_number, code } = req.body;

//     if (!phone_number || !code) {
//       return res
//         .status(400)
//         .json({ message: "Nomor telepon dan kode verifikasi harus diisi!!" });
//     }

//     const result = await textflow.verifyCode(phone_number, code);

//     if (result.valid) {
//       return res.status(200).json({ message: "Wrong code" });
//     }

//     return res.status(result.status).json({ message: result.message });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ message: "Server Error!!!" });
//   }
// });

module.exports = router;
