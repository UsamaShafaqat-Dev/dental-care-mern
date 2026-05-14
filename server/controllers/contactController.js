const Contact = require("../models/Contact");

// 1. Naya message save karna (Public - Website se)
exports.submitMessage = async (req, res) => {
  try {
    const newMessage = await Contact.create(req.body);
    res.status(201).json({ success: true, data: newMessage });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// 2. Saare messages dekhna (Admin - Dashboard ke liye)
exports.getAllMessages = async (req, res) => {
  try {
    const messages = await Contact.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: messages.length,
      data: messages,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// 3. Message Status Update karna (Admin - Mark as Read)
exports.updateMessageStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const updatedMessage = await Contact.findByIdAndUpdate(
      id,
      { status },
      { new: true, runValidators: true },
    );

    if (!updatedMessage) {
      return res
        .status(404)
        .json({ success: false, message: "Message nahi mila" });
    }

    res.status(200).json({ success: true, data: updatedMessage });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// 4. Message Delete karna (Admin)
exports.deleteMessage = async (req, res) => {
  try {
    const message = await Contact.findByIdAndDelete(req.params.id);

    if (!message) {
      return res
        .status(404)
        .json({ success: false, message: "Message nahi mila" });
    }

    res
      .status(200)
      .json({ success: true, message: "Message delete kar diya gaya" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
