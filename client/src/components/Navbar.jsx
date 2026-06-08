import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
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
    { name: "Contact", path: "/#contact" },
  ];

  // --- 1. PERFECT SCROLL LOGIC ---
  useEffect(() => {
    if (location.hash === "#contact") {
      setTimeout(() => {
        const el = document.getElementById("contact");
        if (el) {
          // Navbar ke neechay chupne se bachanay ke liye exact offset
          const navbarHeight = 80;
          const elementPosition = el.getBoundingClientRect().top;
          const offsetPosition =
            elementPosition + window.pageYOffset - navbarHeight;
          window.scrollTo({ top: offsetPosition, behavior: "smooth" });
        }
      }, 100);
    } else if (location.pathname === "/" && !location.hash) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [location.pathname, location.hash]);

  // --- 2. 100% ACCURATE ACTIVE LINK CHECKER ---
  const checkIsActive = (path) => {
    if (path === "/") {
      // Home sirf tab active ho jab path "/" ho AUR uske agay "#contact" NA ho
      return location.pathname === "/" && !location.hash;
    }
    if (path === "/#contact") {
      // Contact tab active ho jab path "/" ho AUR hash "#contact" ho
      return location.pathname === "/" && location.hash === "#contact";
    }
    return location.pathname === path;
  };

  // --- 3. CLICK HANDLER (MASLA YAHAN HAL HUA HAI) ---
  const handleLinkClick = (e, path) => {
    e.preventDefault();
    setIsOpen(false);

    // Ab hum manually state nahi chher rahe, React Router (navigate) ko bata rahe hain
    // Is se active class foran update ho jayegi!
    navigate(path);
  };

  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo Section */}
          <Link
            to="/"
            className="flex items-center gap-2 group"
            onClick={(e) => handleLinkClick(e, "/")}
          >
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
              {navLinks.map((link) => {
                const isActive = checkIsActive(link.path);
                return (
                  <Link
                    key={link.name}
                    to={link.path}
                    onClick={(e) => handleLinkClick(e, link.path)}
                    className={`relative text-sm font-bold transition-all duration-300 flex flex-col items-center group ${
                      isActive
                        ? "text-blue-600"
                        : "text-gray-500 hover:text-blue-400"
                    }`}
                  >
                    {link.name}
                    <span
                      className={`absolute -bottom-1.5 w-1 h-1 bg-blue-600 rounded-full transition-transform duration-300 ${isActive ? "scale-100" : "scale-0"}`}
                    ></span>
                  </Link>
                );
              })}

              {/* Dashboard Link */}
              {isLoggedIn && (
                <Link
                  to="/dashboard"
                  onClick={(e) => handleLinkClick(e, "/dashboard")}
                  className={`relative text-sm font-bold transition-all duration-300 flex flex-col items-center group ${location.pathname === "/dashboard" ? "text-blue-600" : "text-gray-500 hover:text-blue-400"}`}
                >
                  <div className="flex items-center gap-2">
                    <LayoutDashboard size={14} /> Dashboard
                  </div>
                  <span
                    className={`absolute -bottom-1.5 w-1 h-1 bg-blue-600 rounded-full transition-transform duration-300 ${location.pathname === "/dashboard" ? "scale-100" : "scale-0"}`}
                  ></span>
                </Link>
              )}
            </div>

            <div className="flex items-center gap-3">
              <Link
                to="/appointment"
                onClick={(e) => handleLinkClick(e, "/appointment")}
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
          {navLinks.map((link) => {
            const isActive = checkIsActive(link.path);
            return (
              <Link
                key={link.name}
                to={link.path}
                onClick={(e) => handleLinkClick(e, link.path)}
                className={`block text-lg font-bold ${isActive ? "text-blue-600" : "text-gray-700"}`}
              >
                {link.name}
              </Link>
            );
          })}
          {isLoggedIn && (
            <Link
              to="/dashboard"
              onClick={(e) => handleLinkClick(e, "/dashboard")}
              className={`block text-lg font-bold ${location.pathname === "/dashboard" ? "text-blue-600" : "text-gray-700"}`}
            >
              Dashboard
            </Link>
          )}
          <div className="pt-4 flex flex-col gap-3">
            <Link
              to="/appointment"
              onClick={(e) => handleLinkClick(e, "/appointment")}
              className="w-full bg-blue-600 text-white text-center py-4 rounded-2xl font-black uppercase tracking-widest text-xs shadow-lg shadow-blue-50"
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
