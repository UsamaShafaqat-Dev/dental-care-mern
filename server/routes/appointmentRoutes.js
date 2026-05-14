const express = require("express");
const router = express.Router();
const {
  bookAppointment,
  getAllAppointments,
  deleteAppointment,
  updateAppointmentStatus, // 1. Naya function import kiya
} = require("../controllers/appointmentController");

const { protect } = require("../middleware/authMiddleware");

// 2. Appointment book karna (Public)
router.post("/book", bookAppointment);

// 3. Appointments dekhna (Protected)
router.get("/all", protect, getAllAppointments);

// 4. Appointment Status Update karna (Protected - Naya Route)
router.put("/status/:id", protect, updateAppointmentStatus);

// 5. Appointment delete karna (Protected)
router.delete("/delete/:id", protect, deleteAppointment);

module.exports = router;
