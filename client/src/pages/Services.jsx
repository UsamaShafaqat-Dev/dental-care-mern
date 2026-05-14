import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Plus, Edit2, Trash2, X, Upload, Link as LinkIcon } from "lucide-react";

const Services = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [useUrl, setUseUrl] = useState(false);

  const token = localStorage.getItem("adminToken");
  const isAdmin = !!token;

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    imageUrl: "",
  });

  const fetchServices = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/services");
      if (res.data.success) setServices(res.data.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  // --- 1. HANDLE SUBMIT (ADD & UPDATE) ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    const loadingToast = toast.loading(
      isEditing ? "Updating service..." : "Saving service...",
    );

    try {
      const data = new FormData();
      data.append("title", formData.title);
      data.append("description", formData.description);

      // Image Logic: Check if new file is selected or URL is used
      if (!useUrl && imageFile) {
        data.append("image", imageFile); // Field name should match backend multer config
      } else {
        data.append("imageUrl", formData.imageUrl);
      }

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      };

      let response;
      if (isEditing) {
        // Edit Mode
        response = await axios.put(
          `http://localhost:5000/api/services/${currentId}`,
          data,
          config
        );
      } else {
        // Add Mode
        response = await axios.post(
          "http://localhost:5000/api/services/add",
          data,
          config
        );
      }

      if (response.data.success) {
        toast.success(isEditing ? "Service updated! ✨" : "Service added! ✨", { id: loadingToast });
        closeModal();
        fetchServices();
      } else {
        toast.error("Process failed on server.", { id: loadingToast });
      }

    } catch (error) {
      console.error("Error details:", error.response?.data);
      toast.error(error.response?.data?.message || "Something went wrong.", { id: loadingToast });
    }
  };

  // --- 2. HANDLE DELETE ---
  const handleDelete = async (id) => {
    if (window.confirm("Kya aap waqayi ye service khatam karna chahte hain?")) {
      try {
        await axios.delete(`http://localhost:5000/api/services/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        toast.success("Service deleted!");
        fetchServices();
      } catch (error) {
        toast.error("Delete nahi ho saka.");
      }
    }
  };

  // --- 3. OPEN EDIT MODAL ---
  const openEditModal = (service) => {
    setFormData({
      title: service.title,
      description: service.description,
      imageUrl: service.imageUrl,
    });
    setCurrentId(service._id);
    setIsEditing(true);
    setUseUrl(true); 
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setIsEditing(false);
    setCurrentId(null);
    setFormData({ title: "", description: "", imageUrl: "" });
    setImageFile(null);
  };

  if (loading) return <div className="text-center py-20 font-black text-blue-900">Loading Services...</div>;

  return (
    <div className="bg-white py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-16">
          <h2 className="text-5xl font-black text-blue-950 tracking-tighter">
            Dental Services
          </h2>
          {isAdmin && (
            <button
              onClick={() => {
                setIsEditing(false);
                setShowModal(true);
              }}
              className="bg-emerald-500 text-white px-8 py-4 rounded-3xl font-black flex items-center gap-2 shadow-xl shadow-emerald-100 transition-all hover:-translate-y-1"
            >
              <Plus size={20} /> Add New Service
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service) => (
            <div
              key={service._id}
              className="bg-white rounded-[40px] border border-blue-50 shadow-sm hover:shadow-2xl transition-all group overflow-hidden flex flex-col relative"
            >
              {isAdmin && (
                <div className="absolute top-4 right-4 flex gap-2 z-10">
                  <button
                    onClick={() => openEditModal(service)}
                    className="p-3 bg-white/90 backdrop-blur rounded-2xl text-blue-600 shadow-lg hover:bg-blue-600 hover:text-white transition-all"
                  >
                    <Edit2 size={16} />
                  </button>
                  <button
                    onClick={() => handleDelete(service._id)}
                    className="p-3 bg-white/90 backdrop-blur rounded-2xl text-red-500 shadow-lg hover:bg-red-500 hover:text-white transition-all"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              )}

              <div className="h-52 overflow-hidden">
                <img
                  src={service.imageUrl}
                  alt={service.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-all duration-700"
                />
              </div>
              <div className="p-8">
                <h3 className="text-xl font-black text-blue-950 mb-3">
                  {service.title}
                </h3>
                <p className="text-gray-500 text-sm font-medium">
                  {service.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* --- MODAL --- */}
      {showModal && (
        <div className="fixed inset-0 bg-blue-950/20 backdrop-blur-md flex items-center justify-center z-50 p-4">
          <div className="bg-white w-full max-w-lg rounded-[50px] p-10 shadow-2xl relative">
            <button
              onClick={closeModal}
              className="absolute top-8 right-8 text-gray-400 hover:text-red-500"
            >
              <X />
            </button>

            <h3 className="text-3xl font-black text-blue-950 mb-8">
              {isEditing ? "Edit Service" : "New Service"}
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Service Title"
                required
                className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
              />
              <textarea
                placeholder="Description"
                required
                rows="3"
                className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
              ></textarea>

              <div className="flex bg-gray-100 p-1 rounded-2xl mb-4">
                <button
                  type="button"
                  onClick={() => setUseUrl(false)}
                  className={`flex-1 py-2 rounded-xl text-xs font-black flex items-center justify-center gap-2 ${!useUrl ? "bg-white shadow-sm text-blue-600" : "text-gray-400"}`}
                >
                  <Upload size={14} /> Gallery
                </button>
                <button
                  type="button"
                  onClick={() => setUseUrl(true)}
                  className={`flex-1 py-2 rounded-xl text-xs font-black flex items-center justify-center gap-2 ${useUrl ? "bg-white shadow-sm text-blue-600" : "text-gray-400"}`}
                >
                  <LinkIcon size={14} /> URL
                </button>
              </div>

              {useUrl ? (
                <input
                  type="text"
                  placeholder="Image URL..."
                  required
                  className="w-full p-4 bg-blue-50/50 border border-blue-100 rounded-2xl outline-none"
                  value={formData.imageUrl}
                  onChange={(e) =>
                    setFormData({ ...formData, imageUrl: e.target.value })
                  }
                />
              ) : (
                <div className="border-2 border-dashed border-gray-200 rounded-2xl p-8 text-center relative">
                  <input
                    type="file"
                    className="absolute inset-0 opacity-0 cursor-pointer"
                    onChange={(e) => setImageFile(e.target.files[0])}
                  />
                  <Upload className="mx-auto text-gray-300 mb-2" />
                  <p className="text-xs font-bold text-gray-400">
                    {imageFile ? imageFile.name : "Select from Gallery"}
                  </p>
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-blue-600 text-white p-5 rounded-3xl font-black uppercase tracking-widest text-sm hover:bg-blue-700 shadow-xl mt-4 transition-all"
              >
                {isEditing ? "Update Service" : "Publish Service"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Services;