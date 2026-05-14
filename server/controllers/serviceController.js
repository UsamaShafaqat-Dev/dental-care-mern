const Service = require("../models/Services");

// 1. Saari Services hasil karna
exports.getServices = async (req, res) => {
  try {
    const services = await Service.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: services });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// 2. Nayi Service add karna
exports.addService = async (req, res) => {
  try {
    const { title, description, imageUrl } = req.body;

    // Agar file upload hui hai to uska path lein, warna manual URL
    let finalImageUrl = imageUrl;
    if (req.file) {
      finalImageUrl = req.file.path;
    }

    const newService = await Service.create({
      title,
      description,
      imageUrl: finalImageUrl,
    });

    res.status(201).json({ success: true, data: newService });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// 3. Service update/edit karna (Fixed Logic 🚀)
exports.updateService = async (req, res) => {
  try {
    const { title, description, imageUrl } = req.body;
    const updateData = { title, description };

    // 🛠️ Check karein agar nayi file upload hui hai
    if (req.file) {
      updateData.imageUrl = req.file.path; // Nayi image ka link
    } else if (imageUrl) {
      updateData.imageUrl = imageUrl; // Agar sirf text URL update kiya hai
    }

    const service = await Service.findByIdAndUpdate(
      req.params.id,
      updateData, // 👈 req.body ki jagah refined updateData bhej rahe hain
      {
        new: true,
        runValidators: true,
      },
    );

    if (!service) {
      return res
        .status(404)
        .json({ success: false, message: "Service nahi mili" });
    }

    res.status(200).json({ success: true, data: service });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// 4. Service delete karna
exports.deleteService = async (req, res) => {
  try {
    const service = await Service.findByIdAndDelete(req.params.id);
    if (!service)
      return res
        .status(404)
        .json({ success: false, message: "Service nahi mili" });
    res.status(200).json({ success: true, message: "Service delete ho gayi" });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
