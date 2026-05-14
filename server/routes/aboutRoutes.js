const express = require("express");
const router = express.Router();
const { getAbout, updateAbout } = require("../controllers/aboutController");
const { protect } = require("../middleware/authMiddleware");

router.get("/", getAbout); // Public
router.put("/", protect, updateAbout); // Protected (Sirf Admin)

module.exports = router;
