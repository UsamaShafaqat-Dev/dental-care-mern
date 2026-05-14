import React from "react";
import { Link } from "react-router-dom";
import { MapPin, Phone, Mail, MessageCircle, Globe } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-blue-50 pt-20 pb-10 border-t border-blue-100/50">
      <div className="max-w-7xl mx-auto px-6">
        {/* Centered Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center items-start">
          {/* Column 1: Dr. Info (Centered) */}
          <div className="flex flex-col items-center space-y-6">
            <div className="flex flex-col items-center gap-3">
              <div className="w-14 h-14 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-lg text-3xl font-bold">
                🦷
              </div>
              <div className="mt-2">
                <h4 className="text-xl font-black text-blue-950 leading-none">
                  DR.UMAIR RAFIQUE
                </h4>
                <p className="text-[10px] text-blue-500 font-bold uppercase tracking-widest mt-2">
                  Dental Specialist
                </p>
              </div>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed max-w-xs mx-auto">
              Professional dental care in Rahim Yar Khan for healthy teeth,
              confident smiles, and comfortable treatment.
            </p>
          </div>

          {/* Column 2: Quick Links (Centered) */}
          <div className="flex flex-col items-center">
            <h4 className="text-blue-950 font-bold text-sm uppercase tracking-widest mb-6 border-b-2 border-blue-200 pb-2 w-fit">
              Quick Links
            </h4>
            <ul className="space-y-4 text-gray-600 text-sm font-semibold">
              <li>
                <Link to="/" className="hover:text-blue-600 transition-all">
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/services"
                  className="hover:text-blue-600 transition-all"
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  to="/appointment"
                  className="hover:text-blue-600 transition-all"
                >
                  Appointment
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact Info (Centered) */}
          <div className="flex flex-col items-center">
            <h4 className="text-blue-950 font-bold text-sm uppercase tracking-widest mb-6 border-b-2 border-blue-200 pb-2 w-fit">
              Contact Info
            </h4>

            <div className="space-y-4 flex flex-col items-center">
              <div className="flex items-center gap-3 text-gray-600 text-sm">
                <MapPin size={18} className="text-blue-600" />
                <span>Khanpur Adda, Rahim Yar Khan</span>
              </div>

              <div className="flex items-center gap-3 text-gray-600 text-sm">
                <Phone size={18} className="text-blue-600" />
                <span>+92 310 6247898</span>
              </div>

              <div className="flex items-center gap-3 text-gray-600 text-sm">
                <Mail size={18} className="text-blue-600" />
                <span className="break-all font-medium">
                  ur03177627645@gmail.com
                </span>
              </div>
            </div>

            {/* Social Icons Centered */}
            <div className="flex gap-4 mt-8">
              <a
                href="https://wa.me/923106247898"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-full bg-white border border-blue-100 flex items-center justify-center text-emerald-500 hover:bg-emerald-500 hover:text-white transition-all shadow-sm"
              >
                <MessageCircle size={18} />
              </a>
              <a
                href="https://www.facebook.com/share/17jLNRi6rj/"
                className="w-10 h-10 rounded-full bg-white border border-blue-100 flex items-center justify-center text-blue-600 hover:bg-blue-600 hover:text-white transition-all font-bold shadow-sm"
              >
                f
              </a>
              <a
                href="https://www.instagram.com/dr.umair_rafique?igsh=MWxleDkzNWo0OG1vbw=="
                className="w-10 h-10 rounded-full bg-white border border-blue-100 flex items-center justify-center text-pink-600 hover:bg-pink-600 hover:text-white transition-all font-bold shadow-sm text-sm"
              >
                ig
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white border border-blue-100 flex items-center justify-center text-gray-400 hover:bg-blue-400 hover:text-white transition-all shadow-sm"
              >
                <Globe size={18} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar Centered */}
        <div className="pt-12 mt-12 border-t border-blue-100 flex flex-col items-center gap-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest text-center">
          <p>© 2026 DR. UMAIR RAFIQUE DENTAL CLINIC. ALL RIGHTS RESERVED.</p>
          <p className="text-blue-600/50">Developed by USAMA MERN-STACK</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
