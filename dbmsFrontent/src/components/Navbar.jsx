import { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import logo from "../assets/logo.png"; 
import { Home as HomeIcon, Calendar, LayoutDashboard, LogOut, User as UserIcon } from "lucide-react";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation(); // 1. Current page check karne ke liye
  const [isScrolled, setIsScrolled] = useState(false);
  
  const user = JSON.parse(localStorage.getItem("user"));

  // 2. Scroll Logic: Navbar background change on scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      localStorage.removeItem("user");
      navigate("/login");
      window.location.reload();
    }
  };

  // 3. Helper function active link highlight karne ke liye
  const isActive = (path) => location.pathname === path;

  return (
    <nav className={`flex justify-between items-center px-10 py-4 sticky top-0 z-50 border-b transition-all duration-300 ${
      isScrolled ? "bg-slate-950/90 backdrop-blur-xl border-white/10 py-3" : "bg-transparent border-transparent"
    }`}>
      
      {/* --- LOGO SECTION --- */}
      <Link to="/" className="flex items-center gap-3 group">
        <div className="h-11 w-11 overflow-hidden rounded-full border-2 border-amber-500 bg-white p-0.5 transition-transform group-hover:rotate-12">
          <img src={logo} alt="Logo" className="h-full w-full object-contain" />
        </div>
        <div className="flex flex-col">
          <h3 className="text-xl font-black text-white leading-none tracking-tight">CULT-FEST</h3>
          <span className="text-[9px] text-amber-500 font-bold uppercase tracking-[0.2em]">MCA Department</span>
        </div>
      </Link>

      {/* --- DYNAMIC NAV LINKS --- */}
      <div className="flex gap-8 items-center">
        <NavLink to="/" icon={<HomeIcon size={16}/>} label="Home" active={isActive("/")} />
        <NavLink to="/events" icon={<Calendar size={16}/>} label="Events" active={isActive("/events")} />
        
        {/* Logic: Sirf Admin ko hi Dashboard dikhega */}
        {user?.role === 'admin' && (
          <NavLink to="/dashboard" icon={<LayoutDashboard size={16}/>} label="Admin" active={isActive("/dashboard")} />
        )}

        {/* --- USER SECTION --- */}
        <div className="ml-4 pl-8 border-l border-white/10 flex items-center gap-4">
          {user ? (
            <div className="flex items-center gap-4">
              <div className="flex flex-col items-end">
                <p className="text-xs font-bold text-white leading-none">{user.name}</p>
                <span className={`text-[9px] font-black uppercase px-1.5 rounded ${
                  user.role === 'admin' ? "bg-amber-500 text-slate-950" : "bg-slate-800 text-amber-500"
                }`}>
                  {user.role}
                </span>
              </div>
              <button 
                onClick={handleLogout}
                className="p-2.5 rounded-full bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-all border border-red-500/20"
                title="Logout"
              >
                <LogOut size={16}/>
              </button>
            </div>
          ) : (
            <Link to="/login" className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-amber-500 text-slate-950 font-bold hover:bg-amber-400 hover:scale-105 active:scale-95 transition-all text-sm shadow-lg shadow-amber-500/20">
              <UserIcon size={16}/> Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}

// Chhota reusable component Navigation Links ke liye
function NavLink({ to, icon, label, active }) {
  return (
    <Link to={to} className={`flex items-center gap-2 font-semibold text-sm transition-all ${
      active ? "text-amber-500 scale-110" : "text-gray-400 hover:text-white"
    }`}>
      {icon} {label}
    </Link>
  );
}

export default Navbar;