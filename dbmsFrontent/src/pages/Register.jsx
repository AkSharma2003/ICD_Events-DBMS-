import { useState } from "react";
import { UserPlus, Mail, Building, Lock } from "lucide-react";
import axios from "axios";

function Register() {
  // 1. State for Form Data
  const [formData, setFormData] = useState({ 
    name: "", 
    email: "", 
    dept: "", 
    password: "" 
  });

  // 2. Handle Input Changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 3. Handle Form Submission (Backend API Call)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/register", {
        name: formData.name,
        email: formData.email,
        event: formData.dept, // MySQL table uses 'event'
        password: formData.password
      });

      alert("🎉 " + response.data.message);
      // Success ke baad form reset karein
      setFormData({ name: "", email: "", dept: "", password: "" });
      
    } catch (err) {
      console.error("Connection Error:", err);
      alert("❌ Registration failed! Make sure Backend is running on Port 5000.");
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-6">
      <div className="bg-slate-900 p-10 rounded-3xl border border-white/10 shadow-2xl w-full max-w-md">
        <h2 className="text-3xl font-black text-center mb-8 text-white">Join the Fest</h2>
        
        <form className="space-y-5" onSubmit={handleSubmit}>
          {/* Name Field */}
          <div className="relative">
            <UserPlus className="absolute left-4 top-4 text-slate-400" size={20} />
            <input 
              type="text" 
              name="name" 
              value={formData.name}
              onChange={handleChange} 
              placeholder="Full Name" 
              required
              className="w-full bg-slate-800 p-4 pl-12 rounded-xl focus:ring-2 focus:ring-amber-500 outline-none transition-all text-white" 
            />
          </div>

          {/* Email Field */}
          <div className="relative">
            <Mail className="absolute left-4 top-4 text-slate-400" size={20} />
            <input 
              type="email" 
              name="email" 
              value={formData.email}
              onChange={handleChange} 
              placeholder="Email Address" 
              required
              className="w-full bg-slate-800 p-4 pl-12 rounded-xl focus:ring-2 focus:ring-amber-500 outline-none transition-all text-white" 
            />
          </div>

          {/* Department Field */}
          <div className="relative">
            <Building className="absolute left-4 top-4 text-slate-400" size={20} />
            <input 
              type="text" 
              name="dept" 
              value={formData.dept}
              onChange={handleChange} 
              placeholder="Department" 
              required
              className="w-full bg-slate-800 p-4 pl-12 rounded-xl focus:ring-2 focus:ring-amber-500 outline-none transition-all text-white" 
            />
          </div>

          {/* Password Field */}
          <div className="relative">
            <Lock className="absolute left-4 top-4 text-slate-400" size={20} />
            <input 
              type="password" 
              name="password" 
              value={formData.password}
              onChange={handleChange} 
              placeholder="Password" 
              required
              className="w-full bg-slate-800 p-4 pl-12 rounded-xl focus:ring-2 focus:ring-amber-500 outline-none transition-all text-white" 
            />
          </div>

          <button 
            type="submit" 
            className="w-full py-4 bg-gradient-to-r from-amber-500 to-orange-600 rounded-xl font-bold text-lg hover:shadow-lg hover:shadow-amber-500/20 transition-all active:scale-95 text-white"
          >
            Create Account
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;