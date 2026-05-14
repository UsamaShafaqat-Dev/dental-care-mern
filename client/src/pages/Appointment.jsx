import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const Appointment = () => {
  const [formData, setFormData] = useState({
    patientName: "",
    email: "",
    phoneNumber: "",
    service: "",
    date: "",
    time: "",
    message: "",
  });

  // Errors state validation ke liye
  const [errors, setErrors] = useState({});

  // Validation Logic
  const validateForm = () => {
    let newErrors = {};

    // 1. Name Check
    if (formData.patientName.trim().length < 3) {
      newErrors.patientName = "Naam kam az kam 3 characters ka hona chahiye";
    }

    // 2. Email Check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      newErrors.email = "Sahi email address likhen (e.g. name@gmail.com)";
    }

    // 3. Phone Check (Exactly 11 digits)
    const phoneRegex = /^[0-9]{11}$/;
    if (!phoneRegex.test(formData.phoneNumber)) {
      newErrors.phoneNumber = "Sahi phone number likhen (11 digits hone chahiye)";
    }

    // 4. Service/Date/Time Check
    if (!formData.service) newErrors.service = "Aik service select karna zaroori hai";
    if (!formData.date) newErrors.date = "Date select karein";
    if (!formData.time) newErrors.time = "Time select karein";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Pehle validation check karein
    if (!validateForm()) {
      toast.error("Form mein ghaltiyan hain, sahi se bharein!");
      return;
    }

    const loadingToast = toast.loading("Booking your appointment...");

    try {
      const response = await axios.post(
        "http://localhost:5000/api/appointments/book",
        formData,
      );

      if (response.data.success) {
        toast.success("Success! Apka appointment book ho gaya ha. ✨", {
          id: loadingToast,
          duration: 5000,
        });

        setFormData({
          patientName: "",
          email: "",
          phoneNumber: "",
          service: "",
          date: "",
          time: "",
          message: "",
        });
        setErrors({}); // Errors saaf kar den
      }
    } catch (error) {
      toast.error("Error: Appointment book nahi ho saka.", {
        id: loadingToast,
      });
    }
  };

  return (
    <div className="max-w-2xl mx-auto my-12 p-8 bg-white shadow-2xl rounded-3xl border border-gray-100">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-4">
          📅
        </div>
        <h2 className="text-3xl font-black text-blue-900 tracking-tight">
          Book Your Appointment
        </h2>
        <p className="text-gray-400 text-sm font-medium mt-2">
          Dr. Umair Rafique Clinic - Online Booking
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Patient Name */}
        <div className="space-y-1">
          <input
            type="text"
            placeholder="Your Full Name"
            className={`w-full p-4 border rounded-2xl outline-none transition-all font-medium ${
              errors.patientName ? "border-red-500 bg-red-50" : "border-gray-100 bg-gray-50 focus:ring-2 focus:ring-blue-500"
            }`}
            onChange={(e) => setFormData({ ...formData, patientName: e.target.value })}
            value={formData.patientName}
          />
          {errors.patientName && <p className="text-red-500 text-[10px] ml-4 font-bold uppercase">{errors.patientName}</p>}
        </div>

        {/* Email & Phone */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1">
            <input
              type="email"
              placeholder="Email Address"
              className={`w-full p-4 border rounded-2xl outline-none transition-all font-medium ${
                errors.email ? "border-red-500 bg-red-50" : "border-gray-100 bg-gray-50 focus:ring-2 focus:ring-blue-500"
              }`}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              value={formData.email}
            />
            {errors.email && <p className="text-red-500 text-[10px] ml-4 font-bold uppercase">{errors.email}</p>}
          </div>

          <div className="space-y-1">
            <input
              type="tel"
              placeholder="Phone Number (11 digits)"
              className={`w-full p-4 border rounded-2xl outline-none transition-all font-medium ${
                errors.phoneNumber ? "border-red-500 bg-red-50" : "border-gray-100 bg-gray-50 focus:ring-2 focus:ring-blue-500"
              }`}
              onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
              value={formData.phoneNumber}
            />
            {errors.phoneNumber && <p className="text-red-500 text-[10px] ml-4 font-bold uppercase">{errors.phoneNumber}</p>}
          </div>
        </div>

        {/* Services Dropdown */}
        <div className="space-y-1">
          <select
            className={`w-full p-4 border rounded-2xl outline-none transition-all font-medium ${
              errors.service ? "border-red-500 bg-red-50" : "border-gray-100 bg-gray-50 focus:ring-2 focus:ring-blue-500 text-gray-500"
            }`}
            onChange={(e) => setFormData({ ...formData, service: e.target.value })}
            value={formData.service}
          >
            <option value="">Select a Dental Service</option>
            <option value="Root Canal Treatment">Root Canal Treatment</option>
            <option value="Dental Veneers">Dental Veneers</option>
            <option value="Dental Crowns">Dental Crowns</option>
            <option value="Dental Bridge">Dental Bridge</option>
            <option value="Dental Extractions">Dental Extractions</option>
            <option value="Dental Braces">Dental Braces</option>
            <option value="Scaling & Polishing">Scaling & Polishing</option>
            <option value="Dental Fillings">Dental Fillings</option>
          </select>
          {errors.service && <p className="text-red-500 text-[10px] ml-4 font-bold uppercase">{errors.service}</p>}
        </div>

        {/* Date & Time */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-[10px] font-black uppercase text-gray-400 ml-4 tracking-widest">Select Date</label>
            <input
              type="date"
              className={`w-full p-4 border rounded-2xl outline-none transition-all font-medium ${
                errors.date ? "border-red-500 bg-red-50" : "border-gray-100 bg-gray-50 focus:ring-2 focus:ring-blue-500"
              }`}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              value={formData.date}
            />
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-black uppercase text-gray-400 ml-4 tracking-widest">Select Time</label>
            <input
              type="time"
              className={`w-full p-4 border rounded-2xl outline-none transition-all font-medium ${
                errors.time ? "border-red-500 bg-red-50" : "border-gray-100 bg-gray-50 focus:ring-2 focus:ring-blue-500"
              }`}
              onChange={(e) => setFormData({ ...formData, time: e.target.value })}
              value={formData.time}
            />
          </div>
        </div>

        {/* Message */}
        <textarea
          placeholder="Any specific concerns or symptoms? (Optional)"
          rows="3"
          className="w-full p-4 border border-gray-100 bg-gray-50 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all font-medium"
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          value={formData.message}
        ></textarea>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-5 rounded-2xl font-black uppercase tracking-widest text-sm hover:bg-blue-700 transition-all shadow-xl shadow-blue-100 transform hover:-translate-y-1 active:scale-95"
        >
          Confirm Appointment
        </button>
      </form>
    </div>
  );
};

export default Appointment;