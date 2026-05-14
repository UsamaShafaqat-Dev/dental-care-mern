const express = require("express");
const router = express.Router();
const {
  submitMessage,
  getAllMessages,
  updateMessageStatus,
  deleteMessage,
} = require("../controllers/contactController");

// Middleware import karein protection ke liye
const { protect } = require("../middleware/authMiddleware");

// 1. Message send karna (Public - Website se koi bhi bhej sakay)
router.post("/submit", submitMessage);

// 2. Saare messages dekhna (Protected - Sirf Admin/Dr. Umair ke liye)
router.get("/all", protect, getAllMessages);

// 3. Message Status Update (Protected - Mark as Read)
router.put("/status/:id", protect, updateMessageStatus);

// 4. Message Delete karna (Protected)
router.delete("/delete/:id", protect, deleteMessage);

module.exports = router;
