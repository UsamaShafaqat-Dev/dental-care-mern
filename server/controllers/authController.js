const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// 1. Register (Sirf aik bar admin banane ke liye)
exports.register = async (req, res) => {
  const { username, password } = req.body;
  try {
    const existingUser = await User.findOne({ username });
    if (existingUser)
      return res.status(400).json({ message: "Admin pehle se mojud ha" });

    // Password model mein hash ho jayega (agar aapne pre-save hook lagaya ha)
    const newUser = await User.create({ username, password });
    res.status(201).json({ success: true, message: "Admin Created!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 2. Login (Ab ye Database se check karega)
exports.login = async (req, res) => {
  const { username, password } = req.body; // Login mein bhi username use karein jo register mein kiya tha

  try {
    // Database mein user dhoondna
    const user = await User.findOne({ username });
    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "Ghalat Username ya Password!" });
    }

    // Password match karna (Bcrypt use karke)
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ success: false, message: "Ghalat Username ya Password!" });
    }

    // Asli JWT Token banana (secret key apni .env file mein rakhein)
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.status(200).json({
      success: true,
      message: "Login Successful",
      token: token, // Ab ye real token ha
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
