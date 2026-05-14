const Appointment = require("../models/Appointment");

// 1. Naya appointment book karna (Public)
exports.bookAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.create(req.body);
    res.status(201).json({ success: true, data: appointment });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// 2. Saare appointments dekhna (Admin/Doctor)
exports.getAllAppointments = async (req, res) => {
  try {
    // .sort({ createdAt: -1 }) se naye appointments sab se upar ayenge
    const appointments = await Appointment.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: appointments.length,
      data: appointments,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// 3. Appointment Status Update karna (Naya Function)
exports.updateAppointmentStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    // Sirf wahi status allow karein jo humne model mein define kiye hain
    const allowedStatuses = ["Pending", "Completed", "Cancelled"];
    if (!allowedStatuses.includes(status)) {
      return res
        .status(400)
        .json({ success: false, message: "Ghalat status bheja gaya hai" });
    }

    const appointment = await Appointment.findByIdAndUpdate(
      id,
      { status },
      { new: true, runValidators: true },
    );

    if (!appointment) {
      return res
        .status(404)
        .json({ success: false, message: "Appointment nahi mila" });
    }

    res.status(200).json({ success: true, data: appointment });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// 4. Appointment delete karna (Admin/Doctor)
exports.deleteAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findByIdAndDelete(req.params.id);

    if (!appointment) {
      return res
        .status(404)
        .json({ success: false, message: "Appointment nahi mila" });
    }

    res
      .status(200)
      .json({ success: true, message: "Appointment khatam kar di gayi" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
