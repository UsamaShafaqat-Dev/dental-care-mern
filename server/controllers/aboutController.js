const About = require("../models/About");

// 1. Doctor ki details hasil karna (GET)
exports.getAbout = async (req, res) => {
  try {
    const aboutData = await About.findOne();
    res.status(200).json(aboutData);
  } catch (error) {
    res.status(500).json({ message: "About data nahi mil saka", error });
  }
};

// 2. Details ko Update ya Create karna (PUT)
exports.updateAbout = async (req, res) => {
  try {
    // logic: Agar data mojud ha to update karo, nahi to naya bana do (upsert)
    const updatedAbout = await About.findOneAndUpdate(
      {}, // Khali object ka matlab ha pehla jo bhi milay
      req.body,
      { new: true, upsert: true, runValidators: true },
    );
    res.status(200).json(updatedAbout);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
