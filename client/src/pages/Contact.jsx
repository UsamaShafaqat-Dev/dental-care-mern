import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Mail, Phone, MapPin, Send, MessageSquare, Clock } from "lucide-react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const loadingToast = toast.loading("Sending your message...");

    try {
      const response = await axios.post(
        "http://localhost:5000/api/contact/submit",
        formData,
      );

      if (response.data.success) {
        toast.success("Message sent! Hum jald hi aap se raabta karenge. ✨", {
          id: loadingToast,
        });
        setFormData({ name: "", email: "", subject: "", message: "" });
      }
    } catch (error) {
      toast.error("Message nahi bheja ja saka. Dobara koshish karein.", {
        id: loadingToast,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white min-h-screen">
      {/* --- 1. HERO SECTION --- */}
      <section className="bg-blue-50 py-20 px-6 text-center">
        <h1 className="text-5xl font-black text-blue-950 tracking-tighter mb-4">
          Get In <span className="text-blue-600">Touch</span>
        </h1>
        <p className="text-gray-500 max-w-xl mx-auto font-medium leading-relaxed">
          Koi sawal hai ya treatment ke bare mein maloomat chahiye? Humein
          message karein, humari team aap ki madad ke liye hazir hai.
        </p>
      </section>

      <section className="max-w-7xl mx-auto py-20 px-6">
        <div className="grid md:grid-cols-3 gap-12">
          {/* --- 2. CONTACT INFO CARDS --- */}
          <div className="md:col-span-1 space-y-6">
            <div className="bg-white p-8 rounded-[40px] border border-blue-50 shadow-sm hover:shadow-xl transition-all group">
              <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-600 mb-6 group-hover:bg-blue-600 group-hover:text-white transition-all">
                <Phone size={24} />
              </div>
              <h3 className="font-black text-blue-950 text-xl mb-2">Call Us</h3>
              <p className="text-gray-500 text-sm font-medium">
                +92 300 1234567
              </p>
              <p className="text-gray-500 text-sm font-medium">042 3456789</p>
            </div>

            <div className="bg-white p-8 rounded-[40px] border border-blue-50 shadow-sm hover:shadow-xl transition-all group">
              <div className="w-12 h-12 bg-emerald-100 rounded-2xl flex items-center justify-center text-emerald-600 mb-6 group-hover:bg-emerald-600 group-hover:text-white transition-all">
                <Mail size={24} />
              </div>
              <h3 className="font-black text-blue-950 text-xl mb-2">
                Email Us
              </h3>
              <p className="text-gray-500 text-sm font-medium">
                info@drumairdental.com
              </p>
              <p className="text-gray-500 text-sm font-medium">
                drumair@gmail.com
              </p>
            </div>

            <div className="bg-white p-8 rounded-[40px] border border-blue-50 shadow-sm hover:shadow-xl transition-all group">
              <div className="w-12 h-12 bg-orange-100 rounded-2xl flex items-center justify-center text-orange-600 mb-6 group-hover:bg-orange-600 group-hover:text-white transition-all">
                <MapPin size={24} />
              </div>
              <h3 className="font-black text-blue-950 text-xl mb-2">
                Location
              </h3>
              <p className="text-gray-500 text-sm font-medium leading-relaxed">
                Clinic #12, Medical Plaza, <br /> Near Main Market, Pakistan.
              </p>
            </div>
          </div>

          {/* --- 3. CONTACT FORM --- */}
          <div className="md:col-span-2 bg-white p-10 md:p-16 rounded-[50px] shadow-2xl shadow-blue-50 border border-gray-50">
            <div className="mb-10">
              <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest mb-4">
                <MessageSquare size={14} /> Send a Message
              </div>
              <h2 className="text-3xl font-black text-blue-950">
                We'd Love to Hear From You
              </h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input
                  type="text"
                  placeholder="Your Name"
                  required
                  className="w-full p-5 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all font-medium"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
                <input
                  type="email"
                  placeholder="Email Address"
                  required
                  className="w-full p-5 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all font-medium"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </div>

              <input
                type="text"
                placeholder="Subject"
                className="w-full p-5 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all font-medium"
                value={formData.subject}
                onChange={(e) =>
                  setFormData({ ...formData, subject: e.target.value })
                }
              />

              <textarea
                placeholder="How can we help you?"
                rows="5"
                required
                className="w-full p-5 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all font-medium"
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
              ></textarea>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 text-white p-6 rounded-2xl font-black uppercase tracking-widest text-sm hover:bg-blue-700 transition-all shadow-xl shadow-blue-100 flex items-center justify-center gap-3 active:scale-95 disabled:opacity-50"
              >
                {loading ? "Sending..." : "Submit Inquiry"}
                <Send size={18} />
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* --- 4. TIMING SECTION --- */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <div className="bg-blue-950 rounded-[50px] p-10 md:p-16 text-white flex flex-col md:flex-row items-center justify-between gap-10">
          <div className="flex items-center gap-6">
            <div className="w-16 h-16 bg-blue-600 rounded-3xl flex items-center justify-center text-3xl">
              <Clock size={32} />
            </div>
            <div>
              <h3 className="text-2xl font-black">Clinic Hours</h3>
              <p className="text-blue-300 font-medium italic">
                Monday to Saturday
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 text-center md:text-left">
            <div>
              <p className="text-blue-400 text-xs font-black uppercase tracking-[0.2em] mb-1">
                Morning
              </p>
              <p className="text-xl font-bold">10:00 AM - 02:00 PM</p>
            </div>
            <div>
              <p className="text-blue-400 text-xs font-black uppercase tracking-[0.2em] mb-1">
                Evening
              </p>
              <p className="text-xl font-bold">05:00 PM - 09:00 PM</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
