import React, { useState, useEffect } from "react";
import { NavLink, Link, useNavigate, useLocation } from "react-router-dom";
import { Menu, X, LogOut, LayoutDashboard, CalendarCheck } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    setIsLoggedIn(!!token);
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    setIsLoggedIn(false);
    navigate("/login");
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
    { name: "About", path: "/about" },
    { name: "Care Process", path: "/care-process" },
  ];

  // --- 🚀 Active Link Styling Logic ---
  const getLinkStyles = ({ isActive }) =>
    `relative text-sm font-bold transition-all duration-300 flex flex-col items-center group ${
      isActive ? "text-blue-600" : "text-gray-500 hover:text-blue-400"
    }`;

  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo Section */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white text-xl shadow-lg shadow-blue-100 group-hover:rotate-12 transition-transform">
              🦷
            </div>
            <div className="flex flex-col leading-tight">
              <span className="font-black text-blue-950 text-lg uppercase tracking-tighter">
                Dr. Umair Rafique
              </span>
              <span className="text-[10px] font-bold text-blue-500 uppercase tracking-widest">
                Dental Specialist
              </span>
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <div className="flex items-center gap-8 mr-4 border-r border-gray-100 pr-8">
              {navLinks.map((link) => (
                <NavLink
                  key={link.name}
                  to={link.path}
                  className={getLinkStyles}
                >
                  {link.name}
                  {/* 🚀 Active indicator (Chota sa Blue Dot) */}
                  <span className="absolute -bottom-1.5 w-1 h-1 bg-blue-600 rounded-full scale-0 transition-transform duration-300 group-[.active]:scale-100"></span>
                </NavLink>
              ))}

              {/* Login hone ke baad Dashboard */}
              {isLoggedIn && (
                <NavLink to="/dashboard" className={getLinkStyles}>
                  <div className="flex items-center gap-2">
                    <LayoutDashboard size={14} /> Dashboard
                  </div>
                  <span className="absolute -bottom-1.5 w-1 h-1 bg-blue-600 rounded-full scale-0 transition-transform duration-300 group-[.active]:scale-100"></span>
                </NavLink>
              )}
            </div>

            <div className="flex items-center gap-3">
              {/* ✅ Bilkul sahi link: /appointment */}
              <Link
                to="/appointment"
                className="bg-blue-600 text-white px-6 py-3 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-blue-700 transition-all shadow-lg shadow-blue-100 flex items-center gap-2 hover:-translate-y-0.5 active:scale-95"
              >
                <CalendarCheck size={16} /> Book Appointment
              </Link>

              {isLoggedIn && (
                <button
                  onClick={handleLogout}
                  className="p-3 text-red-500 hover:bg-red-50 rounded-2xl transition-all"
                  title="Logout"
                >
                  <LogOut size={20} />
                </button>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-blue-950"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu (Responsive) */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-50 p-6 space-y-4 animate-in slide-in-from-top duration-300">
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              className={({ isActive }) =>
                `block text-lg font-bold ${isActive ? "text-blue-600" : "text-gray-700"}`
              }
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </NavLink>
          ))}
          {isLoggedIn && (
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                `block text-lg font-bold ${isActive ? "text-blue-600" : "text-blue-600"}`
              }
              onClick={() => setIsOpen(false)}
            >
              Dashboard
            </NavLink>
          )}
          <div className="pt-4 flex flex-col gap-3">
            <Link
              to="/appointment"
              className="w-full bg-blue-600 text-white text-center py-4 rounded-2xl font-black uppercase tracking-widest text-xs shadow-lg shadow-blue-50"
              onClick={() => setIsOpen(false)}
            >
              Book Appointment
            </Link>
            {isLoggedIn && (
              <button
                onClick={handleLogout}
                className="w-full bg-red-50 text-red-500 py-4 rounded-2xl font-black uppercase tracking-widest text-xs flex items-center justify-center gap-2"
              >
                <LogOut size={16} /> Logout
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
