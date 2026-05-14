import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast"; // Alert ki jagah Toast import karein
import { Lock, User } from "lucide-react";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    // Loading dikhane ke liye
    const loginToast = toast.loading("Verifying credentials...");

    try {
      const res = await axios.post("https://dental-care-mern.onrender.com/api/auth/login", {
        username,
        password,
      });

      // console.log("Login Response:", res.data); // Debugging ke liye lazmi dekhen

      if (res.data.success) {
        // TOKEN CHECK: Agar backend res.data.token bhej raha ha to ye line sahi ha
        // Agar res.data.data.token bhej rha ha to apko change krna pry ga
        const token = res.data.token;

        if (token) {
          localStorage.setItem("adminToken", token);
          toast.success("Welcome Back, Dr. Umair! 👋", { id: loginToast });
          navigate("/dashboard");
        } else {
          toast.error("Token nahi mila! Backend check karein.", {
            id: loginToast,
          });
        }
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Invalid Username or Password!",
        {
          id: loginToast,
        },
      );
    }
  };

  return (
    <div className="min-h-screen bg-blue-50 flex items-center justify-center p-6">
      <div className="bg-white p-10 rounded-[40px] shadow-2xl w-full max-w-md border border-blue-100">
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center text-white text-3xl mx-auto mb-4 shadow-lg">
            🦷
          </div>
          <h2 className="text-3xl font-black text-blue-950 tracking-tight">
            Admin Login
          </h2>
          <p className="text-gray-400 font-bold text-[10px] uppercase tracking-widest mt-2">
            Dr. Umair Rafique Clinic
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="relative">
            <User className="absolute left-4 top-4 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Username"
              className="w-full pl-12 pr-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition-all font-medium text-blue-950"
              onChange={(e) => setUsername(e.target.value)}
              value={username}
              required
            />
          </div>
          <div className="relative">
            <Lock className="absolute left-4 top-4 text-gray-400" size={20} />
            <input
              type="password"
              placeholder="Password"
              className="w-full pl-12 pr-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition-all font-medium text-blue-950"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black py-4 rounded-2xl shadow-xl shadow-blue-100 transition-all transform hover:-translate-y-1 active:scale-95"
          >
            Sign In to Dashboard
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
