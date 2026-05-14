const express = require("express");
const router = express.Router();

const {
  getServices,
  addService,
  updateService,
  deleteService,
} = require("../controllers/serviceController");

// Guard (Middleware) import karein
const { protect } = require("../middleware/authMiddleware");
const upload = require("../config/cloudinary");

// Routes
router.get("/", getServices); // Ye sab dekh sakte hain
router.post("/add", protect, upload.single("image"), addService); // Sirf Admin add kar sakay
router.put('/:id', upload.single('image'), updateService); // Sirf Admin edit kar sakay
router.delete("/:id", protect, deleteService); // Sirf Admin delete kar sakay

module.exports = router;
