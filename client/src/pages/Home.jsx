import doctorPic from "../assets/dr-umair.jpg";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import toast from "react-hot-toast"; // Naya Import
import {
  CheckCircle,
  Star,
  ShieldCheck,
  HeartPulse,
  Sparkles,
  Microscope,
  ArrowRight,
  Send, // Naya Icon
  MessageSquare, // Naya Icon
} from "lucide-react";

const Home = () => {
  // --- Dynamic Services Logic ---
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  // --- Inquiry Form State ---
  const [inquiryData, setInquiryData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleInquirySubmit = async (e) => {
    e.preventDefault();
    const loadingToast = toast.loading("Sending your message...");
    try {
      const res = await axios.post(
        "https://dental-care-mern.onrender.com/api/contact/submit",
        inquiryData,
      );
      if (res.data.success) {
        toast.success("Message sent! Check Dashboard Inquiries. ✨", {
          id: loadingToast,
        });
        setInquiryData({ name: "", email: "", message: "" });
      }
    } catch (error) {
      toast.error("Masla aya hai, dobara koshish karen.", { id: loadingToast });
    }
  };

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await axios.get("https://dental-care-mern.onrender.com/api/services");
        if (res.data.success) {
          setServices(res.data.data.slice(0, 8));
        }
        setLoading(false);
      } catch (error) {
        console.error("Home services fetch error:", error);
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  return (
    <div className="bg-white">
      {/* --- 1. HERO SECTION --- */}
      <section className="bg-blue-50 px-6 py-16 md:py-24">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="animate-in fade-in slide-in-from-left-8 duration-1000">
            <h1 className="text-5xl md:text-7xl font-black text-blue-950 leading-tight">
              Your Smile, <br />
              <span className="text-blue-600 italic">Our Priority.</span>
            </h1>
            <p className="mt-6 text-lg text-gray-600 max-w-md font-medium leading-relaxed">
              Expert Dental Care for a Brighter, Healthier You. We use latest
              technology to provide painless treatments in a friendly
              environment.
            </p>
            <div className="mt-10">
              <Link
                to="/appointment"
                className="bg-emerald-500 hover:bg-emerald-600 text-white px-10 py-5 rounded-full font-black text-lg transition-all shadow-xl hover:shadow-emerald-200 inline-block"
              >
                Schedule Your Visit
              </Link>
            </div>
          </div>

          <div className="relative animate-in fade-in slide-in-from-right-8 duration-1000">
            <img
              src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=800"
              alt="Doctor and Patient"
              className="rounded-[40px] shadow-2xl border-[12px] border-white w-full h-[500px] object-cover"
            />
          </div>
        </div>
      </section>

      {/* --- 2. MEET YOUR DOCTOR --- */}
      <section className="bg-white py-24 px-8">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <div className="absolute -top-6 -left-6 w-32 h-32 bg-blue-50 rounded-full -z-10"></div>
            <img
              src={doctorPic}
              alt="Dr. Umair Rafique"
              className="rounded-[50px] shadow-2xl h-[550px] w-full object-cover border-[16px] border-blue-50/30"
            />
            <div className="absolute -bottom-8 -right-4 bg-white p-8 rounded-[30px] shadow-2xl border border-blue-50 text-center min-w-[160px]">
              <p className="text-blue-600 font-black text-3xl">5+ Years</p>
              <p className="text-gray-400 font-bold uppercase tracking-widest text-[10px] mt-1">
                Experience
              </p>
            </div>
          </div>

          <div className="space-y-8">
            <div className="inline-block bg-blue-100/50 text-blue-700 px-6 py-2 rounded-full font-black text-xs uppercase tracking-[0.2em] shadow-sm">
              About the Specialist
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-blue-950 tracking-tighter leading-tight">
              Meet Your Doctor
            </h2>
            <h3 className="text-2xl md:text-3xl font-bold text-blue-600 mt-2 whitespace-nowrap">
              Dr. Umair Rafique (BDS, RDS)
            </h3>

            <p className="text-gray-600 text-lg leading-relaxed font-medium">
              With over 5 years of experience in clinical dentistry, Dr. Umair Rafique
              provides comprehensive dental solutions. We specialize in
              aesthetic dentistry and painless procedures to ensure you leave
              with a confident smile.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-4">
              {[
                "Specialist in Root Canal",
                "24/7 Dental Emergency",
                "Aesthetic Dentistry",
                "Painless Treatment",
              ].map((feature, idx) => (
                <div key={idx} className="flex items-center gap-4 group">
                  <div className="w-8 h-8 bg-emerald-50 rounded-xl flex items-center justify-center group-hover:bg-emerald-500 transition-colors">
                    <CheckCircle
                      className="text-emerald-500 group-hover:text-white"
                      size={18}
                    />
                  </div>
                  <span className="text-blue-950 font-bold text-sm tracking-tight">
                    {feature}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* --- 3. DYNAMIC SERVICES SECTION --- */}
      <section className="py-24 px-6 bg-blue-50/30">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl font-black text-blue-950 mb-4 tracking-tighter">
            Our Services
          </h2>
          <div className="w-20 h-1.5 bg-emerald-400 mx-auto rounded-full mb-16"></div>

          {loading ? (
            <div className="text-blue-900 font-bold">Updating services...</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {services.map((service) => (
                <div
                  key={service._id}
                  className="bg-white rounded-[40px] border border-blue-50 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all group overflow-hidden"
                >
                  <div className="h-48 overflow-hidden">
                    <img
                      src={service.imageUrl}
                      alt={service.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                  </div>
                  <div className="p-8">
                    <h3 className="font-black text-blue-900 tracking-tight text-lg">
                      {service.title}
                    </h3>
                    <p className="text-gray-500 text-xs mt-2 font-medium line-clamp-2">
                      {service.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="mt-16 text-center">
            <Link
              to="/services"
              className="inline-flex items-center gap-2 text-blue-600 font-black uppercase tracking-widest text-xs hover:gap-4 transition-all"
            >
              View All Services & Details <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* --- 4. WHY CHOOSE US --- */}
      <section className="py-24 px-6 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="flex justify-center mb-6">
              <span className="bg-blue-50 text-blue-700 px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.3em] border border-blue-100 shadow-sm">
                Commitment to Care
              </span>
            </div>
            <h3 className="text-5xl font-black text-blue-950 tracking-tighter">
              Why Choose <span className="text-blue-600">Our Clinic?</span>
            </h3>
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            {[
              {
                title: "Modern Technology",
                desc: "Hum latest digital X-rays aur laser dentistry use karte hain.",
                icon: <Microscope size={32} />,
              },
              {
                title: "Expert Care",
                desc: "Certified specialists jo har procedure bari maharat se karte hain.",
                icon: <HeartPulse size={32} />,
              },
              {
                title: "Painless Experience",
                desc: "Advanced techniques taake aap sakoon se treatment karwa saken.",
                icon: <Sparkles size={32} />,
              },
            ].map((feature, i) => (
              <div
                key={i}
                className="group p-12 rounded-[50px] bg-blue-50/50 hover:bg-blue-600 transition-all duration-700 border border-blue-100 hover:border-transparent"
              >
                <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center text-blue-600 mb-8 shadow-sm group-hover:scale-110 group-hover:bg-blue-500 group-hover:text-white transition-all">
                  {feature.icon}
                </div>
                <h4 className="text-2xl font-black text-blue-950 group-hover:text-white mb-4 transition-colors tracking-tight">
                  {feature.title}
                </h4>
                <p className="text-gray-500 group-hover:text-blue-50 leading-relaxed transition-colors font-medium">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- 5. MODERN STANDARDS SECTION --- */}
      <section className="py-24 px-8 bg-white border-y border-gray-50">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-20 items-center">
          <div className="relative order-2 md:order-1">
            <img
              src="https://images.unsplash.com/photo-1516062423079-7ca13cdc7f5a?q=80&w=800"
              alt="Hygienic Equipment"
              className="rounded-[50px] shadow-2xl h-[480px] w-full object-cover border-[14px] border-blue-50/50"
            />
          </div>

          <div className="space-y-8 order-1 md:order-2 text-left">
            <h2 className="text-4xl md:text-5xl font-black text-blue-950 leading-[1.1] tracking-tighter">
              Careful Treatment With <br />{" "}
              <span className="text-blue-600">Modern Standards</span>
            </h2>
            <p className="text-gray-600 leading-relaxed font-medium text-lg">
              Dr. Umair Rafique Dental Clinic focuses on high-quality dental
              treatment with hygiene, comfort, and clear communication.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                {
                  title: "Hygienic Care",
                  icon: <ShieldCheck className="text-emerald-500" />,
                },
                {
                  title: "Professional Guidance",
                  icon: <CheckCircle className="text-blue-500" />,
                },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-4 p-5 rounded-3xl bg-blue-50/40 border border-blue-100/50"
                >
                  {item.icon}
                  <span className="font-black text-blue-900 text-xs uppercase tracking-wider">
                    {item.title}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* --- 6. SIMPLE CARE PROCESS --- */}
      <section className="py-24 px-8 bg-blue-50/50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <h3 className="text-5xl font-black text-blue-950 mb-4 tracking-tighter">
            Simple Care Process
          </h3>
          <p className="text-gray-500 max-w-2xl mx-auto mb-20 font-bold uppercase tracking-widest text-xs">
            From consultation to follow-up, keeping it clear.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                num: "01",
                title: "Consultation",
                desc: "Discuss your concern and examination.",
              },
              {
                num: "02",
                title: "Diagnosis",
                desc: "Understand options and expected outcome.",
              },
              {
                num: "03",
                title: "Treatment",
                desc: "Hygienic and careful clinical practice.",
              },
              {
                num: "04",
                title: "Follow-Up",
                desc: "Aftercare for healing and oral health.",
              },
            ].map((step, idx) => (
              <div
                key={idx}
                className="bg-white border border-blue-100 p-10 rounded-[45px] text-left hover:shadow-2xl transition-all group"
              >
                <span className="inline-block bg-blue-600 text-white font-black px-4 py-2 rounded-2xl text-sm mb-8 shadow-lg shadow-blue-100 group-hover:scale-110 transition-transform">
                  {step.num}
                </span>
                <h4 className="text-2xl font-black text-blue-950 mb-4 tracking-tight">
                  {step.title}
                </h4>
                <p className="text-gray-500 text-sm leading-relaxed font-medium">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- 7. TESTIMONIALS --- */}
      <section className="py-24 px-6 max-w-7xl mx-auto text-center">
        <h2 className="text-4xl font-black text-blue-950 tracking-tighter mb-16">
          What Our Patients Say
        </h2>
        <div className="grid md:grid-cols-3 gap-10 text-left">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="bg-white p-10 rounded-[40px] shadow-sm border border-gray-100 hover:shadow-xl transition-all"
            >
              <div className="flex text-yellow-400 mb-6 gap-1">
                {[...Array(5)].map((_, star) => (
                  <Star key={star} size={18} fill="currentColor" />
                ))}
              </div>
              <p className="text-gray-600 italic font-medium leading-relaxed">
                "Bohat achi service ha. Dr. Sahab ne bohat sakoon se kaam kiya
                aur dard bilkul nahi hua."
              </p>
              <div className="mt-8 flex items-center gap-4">
                <div className="w-10 h-10 bg-blue-100 rounded-full"></div>
                <h4 className="font-black text-blue-900 text-sm">
                  - Patient Name {i}
                </h4>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* --- 8. QUICK INQUIRY SECTION (Footer se pehle) --- */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="bg-blue-600 rounded-[60px] p-10 md:p-20 overflow-hidden relative shadow-2xl shadow-blue-200">
            {/* Background Decoration */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500 rounded-full -mr-20 -mt-20 blur-3xl opacity-50"></div>

            <div className="grid md:grid-cols-2 gap-16 items-center relative z-10">
              <div>
                <div className="inline-flex items-center gap-2 bg-blue-500/30 text-white px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-6 border border-white/10">
                  <MessageSquare size={14} /> Quick Inquiry
                </div>
                <h2 className="text-4xl md:text-6xl font-black text-white leading-tight tracking-tighter">
                  Have a Question? <br />{" "}
                  <span className="text-blue-200">Ask Us Anything.</span>
                </h2>
                <p className="mt-6 text-blue-100 text-lg font-medium leading-relaxed max-w-sm">
                  Aap ka koi bhi sawal ho, humari team 24 ghantay ke andar reply
                  karegi.
                </p>
              </div>

              <div className="bg-white p-8 md:p-12 rounded-[40px] shadow-2xl">
                <form onSubmit={handleInquirySubmit} className="space-y-4">
                  <input
                    type="text"
                    placeholder="Your Name"
                    required
                    className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 transition-all font-medium"
                    value={inquiryData.name}
                    onChange={(e) =>
                      setInquiryData({ ...inquiryData, name: e.target.value })
                    }
                  />
                  <input
                    type="email"
                    placeholder="Email Address"
                    required
                    className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 transition-all font-medium"
                    value={inquiryData.email}
                    onChange={(e) =>
                      setInquiryData({ ...inquiryData, email: e.target.value })
                    }
                  />
                  <textarea
                    placeholder="Describe your concern..."
                    rows="3"
                    required
                    className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 transition-all font-medium"
                    value={inquiryData.message}
                    onChange={(e) =>
                      setInquiryData({
                        ...inquiryData,
                        message: e.target.value,
                      })
                    }
                  ></textarea>
                  <button
                    type="submit"
                    className="w-full bg-blue-600 text-white p-5 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-blue-700 transition-all flex items-center justify-center gap-2 active:scale-95 shadow-xl shadow-blue-100"
                  >
                    Send Message <Send size={16} />
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
