const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema(
  {
    patientName: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    email: { type: String },
    date: { type: Date, required: true },
    time: { type: String, required: true },
    message: { type: String },
    status: {
      type: String,
      // "Completed" add kiya hai taake treatment ke baad record rakha ja sakay
      enum: ["Pending", "Completed", "Cancelled"],
      default: "Pending",
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Appointment", appointmentSchema);
