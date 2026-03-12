import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { LogIn, Lock, Mail, Eye, EyeOff } from "lucide-react";
import axios from "axios";

function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [credentials, setCredentials] = useState({ email: "", password: "" });

  // 1. Input handle karne ke liye function (Ye miss tha)
  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  // 2. Login Submit Logic
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/login", {
        email: credentials.email,
        password: credentials.password
      });

      // User data ko browser ki memory mein save karein
      localStorage.setItem("user", JSON.stringify(response.data.user)); 
      
      alert("🎉 Welcome back, " + response.data.user.name + "!");
      
      // Dashboard par bhejien aur page reload karein taaki Navbar update ho jaye
      navigate("/dashboard");
      window.location.reload(); 
      
    } catch (err) {
      alert("❌ " + (err.response?.data?.message || "Login failed! Check credentials."));
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-6">
      <div className="bg-slate-900/60 backdrop-blur-2xl p-8 rounded-[2rem] border border-white/10 shadow-2xl w-full max-w-sm relative overflow-hidden">
        
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-amber-500/10 blur-[60px] rounded-full"></div>
        <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-indigo-500/10 blur-[60px] rounded-full"></div>

        <div className="relative z-10">
          <div className="text-center mb-8">
            <div className="inline-flex p-3 bg-amber-500/10 rounded-xl text-amber-500 mb-3 font-bold">
              <LogIn size={28} />
            </div>
            <h2 className="text-2xl font-black text-white">Welcome Back</h2>
            <p className="text-[11px] text-gray-400 mt-1 uppercase tracking-widest font-semibold">Student Portal</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-400 ml-1 uppercase tracking-wider">Email Address</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-amber-500 transition-colors" size={18} />
                <input 
                  name="email"
                  type="email" 
                  placeholder="name@college.edu" 
                  required
                  value={credentials.email}
                  onChange={handleChange}
                  className="w-full bg-slate-800/40 border border-white/10 p-3.5 pl-12 rounded-xl focus:ring-2 focus:ring-amber-500 outline-none transition-all text-sm text-white placeholder:text-gray-600" 
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between items-end ml-1">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Password</label>
                <a href="#" className="text-[10px] text-amber-500 hover:underline font-bold">Forgot?</a>
              </div>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-amber-500 transition-colors" size={18} />
                <input 
                  name="password"
                  type={showPassword ? "text" : "password"} 
                  placeholder="••••••••" 
                  required
                  value={credentials.password}
                  onChange={handleChange}
                  className="w-full bg-slate-800/40 border border-white/10 p-3.5 pl-12 pr-12 rounded-xl focus:ring-2 focus:ring-amber-500 outline-none transition-all text-sm text-white placeholder:text-gray-600" 
                />

                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors z-30 p-1"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button 
              type="submit"
              className="w-full py-4 bg-amber-500 text-slate-950 font-black rounded-xl hover:bg-amber-400 transition-all active:scale-95 shadow-lg shadow-amber-500/10 mt-2 uppercase tracking-widest text-sm"
            >
              Sign In
            </button>
          </form>

          <p className="text-center mt-8 text-xs text-gray-400 font-medium">
            Don't have an account?{" "}
            <Link to="/register" className="text-amber-500 font-bold hover:text-amber-400 transition-colors">
              Create Account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;