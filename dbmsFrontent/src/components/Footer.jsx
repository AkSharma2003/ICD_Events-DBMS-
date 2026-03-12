import { Github, Instagram, Mail, MapPin, Phone, Users } from "lucide-react";

function Footer() {
  return (
    <footer className="bg-slate-950 border-t border-white/5 pt-20 pb-10 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
        
        {/* 1. BRAND SECTION */}
        <div className="col-span-1 md:col-span-1">
          <h2 className="text-2xl font-black italic tracking-tighter mb-4">
            SHINE<span className="text-amber-500">ON</span>
          </h2>
          <p className="text-gray-500 text-sm leading-relaxed">
            The most awaited MCA cultural fest. Empowering students to showcase their creativity and talent on the grand stage.
          </p>
          <div className="flex gap-4 mt-6">
            <a href="#" className="p-2 bg-white/5 rounded-lg hover:bg-amber-500 hover:text-slate-950 transition-all"><Instagram size={18} /></a>
            <a href="#" className="p-2 bg-white/5 rounded-lg hover:bg-amber-500 hover:text-slate-950 transition-all"><Github size={18} /></a>
            <a href="#" className="p-2 bg-white/5 rounded-lg hover:bg-amber-500 hover:text-slate-950 transition-all"><Mail size={18} /></a>
          </div>
        </div>

        {/* 2. QUICK LINKS */}
        <div>
          <h3 className="text-sm font-black uppercase tracking-widest text-white mb-6">Quick Links</h3>
          <ul className="space-y-4 text-gray-500 text-sm font-medium">
            <li><a href="/" className="hover:text-amber-500 transition-colors">Home</a></li>
            <li><a href="/events" className="hover:text-amber-500 transition-colors">Competitions</a></li>
            <li><a href="/register" className="hover:text-amber-500 transition-colors">Registration</a></li>
            <li><a href="/schedule" className="hover:text-amber-500 transition-colors">Event Schedule</a></li>
          </ul>
        </div>

        {/* 3. CONTACT INFO */}
        <div>
          <h3 className="text-sm font-black uppercase tracking-widest text-white mb-6">Contact Us</h3>
          <ul className="space-y-4 text-gray-500 text-sm">
            <li className="flex items-start gap-3">
              <MapPin size={18} className="text-amber-500 shrink-0" />
              <span>IIIT VADODARA, DIU Campus,<br/>DIU</span>
            </li>
            <li className="flex items-center gap-3">
              <Phone size={18} className="text-amber-500 shrink-0" />
              <span>+91 7255866812</span>
            </li>
          </ul>
        </div>

        {/* 4. NEWSLETTER / STATUS */}
        <div>
          <h3 className="text-sm font-black uppercase tracking-widest text-white mb-6">Live Updates</h3>
          <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
            <p className="text-[10px] text-amber-500 font-bold uppercase mb-2">Next Major Event</p>
            <p className="text-sm font-bold text-white italic">Dance Battle 2026</p>
            <p className="text-xs text-gray-500 mt-1">Starts in 12h : 30m</p>
          </div>
        </div>
      </div>

     {/* --- CENTERED TEAM SECTION --- */}
<div className="max-w-7xl mx-auto mb-10 p-8 bg-white/[0.02] border border-white/5 rounded-[2rem] text-center">
  
  {/* Header Section Centered */}
  <div className="flex items-center justify-center gap-3 mb-8">
    <Users size={16} className="text-amber-500" />
    <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">
      Project Contributors
    </h3>
  </div>

  {/* Members Row - Centered with justify-center */}
  <div className="flex flex-wrap justify-center gap-x-16 gap-y-6">
    
    {/* Member 1 */}
    <div className="flex flex-col items-center">
      <span className="text-white text-sm font-bold tracking-tight">Ankit Kumar Sharma</span>
      <span className="text-gray-500 text-[10px] uppercase font-bold tracking-widest mt-1">Full Stack Lead</span>
    </div>

    {/* Member 2 */}
    <div className="flex flex-col items-center">
      <span className="text-white text-sm font-bold tracking-tight">Kirty</span>
      <span className="text-gray-500 text-[10px] uppercase font-bold tracking-widest mt-1">UI Design</span>
    </div>

    {/* Member 3 */}
    <div className="flex flex-col items-center">
      <span className="text-white text-sm font-bold tracking-tight">Neetu Bharti</span>
      <span className="text-gray-500 text-[10px] uppercase font-bold tracking-widest mt-1">Data Base</span>
    </div>

  </div>
</div>

      {/* BOTTOM BAR */}
      <div className="max-w-7xl mx-auto pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-gray-600 text-[11px] font-medium tracking-wide">
          © 2026 SHINE ON FEST. MANAGED BY MCA DEPARTMENT.
        </p>
        <div className="flex gap-6 text-[11px] font-black text-gray-600 uppercase tracking-widest">
          <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-white transition-colors">Terms of Use</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;