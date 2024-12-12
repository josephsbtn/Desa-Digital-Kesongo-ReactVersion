const express = require("express");
const router = express.Router();

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
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    if (user.password !== password) {
      return res.status(400).json({ message: "Invalid password" });
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

module.exports = router;
