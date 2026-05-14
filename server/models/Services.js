const mongoose = require("mongoose");

// Service ka blueprint (Schema)
const serviceSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Service ka naam hona zaroori hai"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Service ki details likhna zaroori hain"],
    },
    imageUrl: {
      type: String,
      required: [true, "Service ki image ka link hona zaroori hai"],
    },
  },
  {
    timestamps: true, // Ye khud hi 'createdAt' aur 'updatedAt' add kar dega
  },
);

// Model banana taake hum isay database operations ke liye use kar saken
const Service = mongoose.model("Service", serviceSchema);

module.exports = Service;
