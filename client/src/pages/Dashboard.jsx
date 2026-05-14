import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {
  Trash2,
  Clock,
  User,
  Phone,
  Mail,
  MessageSquare,
  LogOut,
  Calendar,
  AlertCircle,
  Search,
  Filter,
  Eye,
} from "lucide-react";

const Dashboard = () => {
  const [appointments, setAppointments] = useState([]);
  const [messages, setMessages] = useState([]);
  const [activeTab, setActiveTab] = useState("appointments");
  const [loading, setLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const navigate = useNavigate();
  const token = localStorage.getItem("adminToken");

  const fetchData = async () => {
    try {
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const [appRes, msgRes] = await Promise.all([
        axios.get("http://localhost:5000/api/appointments/all", config),
        axios.get("http://localhost:5000/api/contact/all", config),
      ]);
      if (appRes.data.success) setAppointments(appRes.data.data);
      if (msgRes.data.success) setMessages(msgRes.data.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      if (error.response?.status === 401) {
        localStorage.removeItem("adminToken");
        navigate("/login");
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // --- Badge Counts Logic ---
  const pendingCount = appointments.filter(
    (app) => app.status === "Pending",
  ).length;
  const newMsgCount = messages.filter((msg) => msg.status === "New").length;

  const filteredAppointments = appointments.filter((app) => {
    const matchesSearch =
      app.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.phoneNumber.includes(searchTerm);

    const matchesStatus = statusFilter === "All" || app.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const handleStatusUpdate = async (id, newStatus) => {
    try {
      await axios.put(
        `http://localhost:5000/api/appointments/status/${id}`,
        { status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } },
      );
      toast.success(`Status updated!`);
      fetchData();
    } catch (error) {
      toast.error("Update failed.");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this appointment?")) {
      try {
        await axios.delete(
          `http://localhost:5000/api/appointments/delete/${id}`,
          { headers: { Authorization: `Bearer ${token}` } },
        );
        toast.success("Deleted!");
        fetchData();
      } catch (error) {
        toast.error("Delete failed.");
      }
    }
  };

  const handleMessageStatus = async (id, newStatus) => {
    try {
      await axios.put(
        `http://localhost:5000/api/contact/status/${id}`,
        { status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } },
      );
      fetchData();
    } catch (error) {
      toast.error("Status update failed.");
    }
  };

  const handleMessageDelete = async (id) => {
    if (window.confirm("Delete message?")) {
      try {
        await axios.delete(`http://localhost:5000/api/contact/delete/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        fetchData();
      } catch (error) {
        toast.error("Delete failed.");
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/login");
  };

  const today = new Date().toISOString().split("T")[0];
  const stats = {
    totalApp: appointments.length,
    todayApp: appointments.filter((app) => app.date.split("T")[0] === today)
      .length,
    newMsgs: messages.filter((m) => m.status === "New").length,
  };

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        {/* HEADER */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
          <div>
            <h2 className="text-4xl font-black text-blue-950 tracking-tight italic">
              Clinic <span className="text-blue-600">Admin</span>
            </h2>
            <p className="text-gray-400 font-medium mt-1 text-sm">
              Welcome Back, Dr. Umair Rafique!
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="bg-white text-red-500 border border-red-100 px-6 py-3 rounded-2xl font-black text-xs flex items-center gap-2 hover:bg-red-500 hover:text-white transition-all shadow-sm"
          >
            <LogOut size={16} /> LOGOUT
          </button>
        </div>

        {/* SUMMARY CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-blue-600 p-8 rounded-[40px] text-white shadow-xl shadow-blue-100 relative overflow-hidden">
            <div className="relative z-10">
              <p className="text-blue-100 font-bold uppercase tracking-widest text-[10px] mb-1">
                Total Appointments
              </p>
              <h4 className="text-5xl font-black">{stats.totalApp}</h4>
            </div>
            <User className="absolute -right-4 -bottom-4 text-blue-500/30 w-32 h-32" />
          </div>

          <div className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm relative overflow-hidden">
            <div className="relative z-10">
              <p className="text-emerald-500 font-bold uppercase tracking-widest text-[10px] mb-1">
                Today's Visits
              </p>
              <h4 className="text-5xl font-black text-blue-950">
                {stats.todayApp}
              </h4>
            </div>
            <Calendar className="absolute -right-4 -bottom-4 text-emerald-50 w-32 h-32" />
          </div>

          <div className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm relative overflow-hidden">
            <div className="relative z-10">
              <p className="text-orange-500 font-bold uppercase tracking-widest text-[10px] mb-1">
                New Messages
              </p>
              <h4 className="text-5xl font-black text-blue-950">
                {stats.newMsgs}
              </h4>
            </div>
            <MessageSquare className="absolute -right-4 -bottom-4 text-orange-50 w-32 h-32" />
          </div>
        </div>

        {/* --- TABS WITH BADGES --- */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <div className="flex bg-gray-200/50 p-1 rounded-3xl w-full md:w-fit">
            <button
              onClick={() => setActiveTab("appointments")}
              className={`flex-1 md:flex-none px-8 py-3 rounded-2xl font-black text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-2 ${activeTab === "appointments" ? "bg-white text-blue-600 shadow-sm" : "text-gray-500"}`}
            >
              Appointments
              {pendingCount > 0 && (
                <span className="bg-blue-600 text-white text-[10px] px-2 py-0.5 rounded-full">
                  {pendingCount}
                </span>
              )}
            </button>
            <button
              onClick={() => setActiveTab("messages")}
              className={`flex-1 md:flex-none px-8 py-3 rounded-2xl font-black text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-2 ${activeTab === "messages" ? "bg-white text-blue-600 shadow-sm" : "text-gray-500"}`}
            >
              Inquiries
              {newMsgCount > 0 && (
                <span className="bg-orange-500 text-white text-[10px] px-2 py-0.5 rounded-full">
                  {newMsgCount}
                </span>
              )}
            </button>
          </div>

          {activeTab === "appointments" && (
            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
              <div className="relative flex-grow">
                <Search
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  size={16}
                />
                <input
                  type="text"
                  placeholder="Search name or phone..."
                  className="w-full pl-12 pr-6 py-3 bg-white border border-gray-100 rounded-2xl text-xs font-bold outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="relative">
                <Filter
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  size={16}
                />
                <select
                  className="pl-12 pr-8 py-3 bg-white border border-gray-100 rounded-2xl text-xs font-black uppercase tracking-widest outline-none appearance-none cursor-pointer shadow-sm"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option value="All">All Status</option>
                  <option value="Pending">Pending</option>
                  <option value="Completed">Completed</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>
            </div>
          )}
        </div>

        {activeTab === "appointments" ? (
          <div className="bg-white rounded-[45px] shadow-xl border border-gray-100 overflow-hidden">
            <div className="hidden md:block">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-blue-50/50 text-blue-950 uppercase text-[11px] font-black tracking-widest border-b border-blue-100/50">
                    <th className="px-8 py-6">Patient</th>
                    <th className="px-8 py-6">Schedule</th>
                    <th className="px-8 py-6">Patient Concern / Message</th>
                    <th className="px-8 py-6">Status</th>
                    <th className="px-8 py-6 text-center">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {filteredAppointments.map((app) => (
                    <tr
                      key={app._id}
                      className="hover:bg-blue-50/20 transition-all"
                    >
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 font-black">
                            {app.patientName[0]}
                          </div>
                          <div>
                            <p className="font-black text-blue-950 text-base">
                              {app.patientName}
                            </p>
                            <p className="text-gray-400 text-xs font-medium">
                              {app.phoneNumber}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <p className="text-blue-600 font-black text-sm">
                          {app.date.split("T")[0]}
                        </p>
                        <p className="text-gray-400 text-[10px] font-bold uppercase mt-1 tracking-wider">
                          {app.time}
                        </p>
                      </td>

                      <td className="px-8 py-6 max-w-[300px]">
                        <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100/50 group-hover:bg-white transition-all">
                          <p
                            className="text-blue-950 text-sm font-semibold leading-relaxed line-clamp-3"
                            title={app.message}
                          >
                            {app.message || (
                              <span className="text-gray-300 font-normal italic">
                                No message provided
                              </span>
                            )}
                          </p>
                        </div>
                      </td>

                      <td className="px-8 py-6">
                        <select
                          value={app.status}
                          onChange={(e) =>
                            handleStatusUpdate(app._id, e.target.value)
                          }
                          className={`text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-xl border-none shadow-sm transition-all ${
                            app.status === "Completed"
                              ? "bg-emerald-100 text-emerald-600"
                              : app.status === "Cancelled"
                                ? "bg-red-100 text-red-600"
                                : "bg-orange-100 text-orange-600"
                          }`}
                        >
                          <option value="Pending">Pending</option>
                          <option value="Completed">Completed</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                      </td>
                      <td className="px-8 py-6 text-center text-gray-300 hover:text-red-500 transition-colors">
                        <button onClick={() => handleDelete(app._id)}>
                          <Trash2 size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="md:hidden p-4 space-y-4">
              {filteredAppointments.map((app) => (
                <div
                  key={app._id}
                  className="p-6 bg-white rounded-[35px] border border-gray-100 shadow-sm relative overflow-hidden"
                >
                  <div className="absolute left-0 top-0 h-full w-2 bg-blue-500"></div>

                  <div className="flex justify-between mb-2">
                    <span className="font-black text-blue-950">
                      {app.patientName}
                    </span>
                    <span className="text-[10px] text-blue-600 font-bold uppercase tracking-wider">
                      {app.time}
                    </span>
                  </div>

                  {app.message && (
                    <div className="bg-blue-50 p-4 rounded-2xl border border-blue-100 mb-4">
                      <p className="text-xs text-blue-900 font-bold leading-snug">
                        "{app.message}"
                      </p>
                    </div>
                  )}

                  <p className="text-xs text-gray-400 mb-4 font-bold italic">
                    {app.phoneNumber}
                  </p>
                  <select
                    value={app.status}
                    onChange={(e) =>
                      handleStatusUpdate(app._id, e.target.value)
                    }
                    className="w-full p-3 rounded-2xl bg-gray-50 border-none text-[10px] font-black uppercase tracking-widest shadow-sm"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Completed">Completed</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </div>
              ))}
            </div>

            {filteredAppointments.length === 0 && (
              <div className="py-20 text-center text-gray-400 font-black uppercase tracking-widest text-[10px]">
                No matches found for "{searchTerm}"
              </div>
            )}
          </div>
        ) : (
          /* MESSAGES TAB */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {messages.map((msg) => (
              <div
                key={msg._id}
                className={`bg-white p-8 rounded-[40px] border transition-all ${msg.status === "New" ? "border-orange-100 shadow-xl shadow-orange-50/50" : "border-gray-100"}`}
              >
                <div className="flex justify-between items-start mb-6">
                  <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 font-black">
                    {msg.name[0]}
                  </div>
                  {msg.status === "New" && (
                    <span className="bg-orange-500 text-white text-[8px] font-black uppercase px-3 py-1 rounded-full tracking-widest">
                      New
                    </span>
                  )}
                </div>
                <h4 className="font-black text-blue-950 text-xl leading-tight mb-4">
                  {msg.name}
                </h4>
                <div className="bg-gray-50 p-6 rounded-3xl text-sm text-gray-800 font-medium leading-relaxed italic mb-6">
                  "{msg.message}"
                </div>
                <div className="flex gap-2 pt-4 border-t border-gray-50">
                  <button
                    onClick={() => handleMessageStatus(msg._id, "Read")}
                    className={`flex-1 p-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${msg.status === "Read" ? "bg-gray-100 text-gray-400" : "bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white"}`}
                  >
                    {msg.status === "Read" ? "Read" : "Mark as Read"}
                  </button>
                  <button
                    onClick={() => handleMessageDelete(msg._id)}
                    className="p-4 bg-red-50 text-red-500 rounded-2xl hover:bg-red-500 hover:text-white transition-all"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
