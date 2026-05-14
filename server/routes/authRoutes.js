const express = require("express");
const router = express.Router();
// Register ko bhi import karein
const { login, register } = require("../controllers/authController");

// Login route
router.post("/login", login);

// Register route (Sirf pehli baar admin banane ke liye, baad mein aap isey delete ya comment kar sakte hain)
router.post("/register", register);

module.exports = router;
