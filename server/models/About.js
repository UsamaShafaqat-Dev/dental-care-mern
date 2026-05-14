const mongoose = require("mongoose");

const aboutSchema = new mongoose.Schema(
  {
    name: { type: String, default: "Dr. Usama" },
    bio: { type: String, required: true },
    specialization: { type: String, required: true },
    experience: { type: String },
    education: { type: String },
  },
  { timestamps: true },
);

module.exports = mongoose.model("About", aboutSchema);
