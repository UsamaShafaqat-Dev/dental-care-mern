const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

// Logic: Password save hone se pehle usey encrypt karna
// Humne 'next' nikal diya ha kyunke async function khud flow handle krta ha
userSchema.pre("save", async function () {
  // Agar password change nahi hua to aagay barh jao
  if (!this.isModified("password")) return;

  // Password ko hash karo
  this.password = await bcrypt.hash(this.password, 10);
});

module.exports = mongoose.model("User", userSchema);
