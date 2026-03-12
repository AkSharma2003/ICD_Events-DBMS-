import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios"; // API fetch ke liye
import {
  ArrowRight,
  Star,
  Award,
  Users,
  Camera,
  Zap,
} from "lucide-react";

function Home() {
  // 1. Database se data store karne ke liye state
  const [gallery, setGallery] = useState([]);

  // 2. Page load hote hi data fetch karna
  useEffect(() => {
    const fetchGallery = async () => {
      try {
        // Aapka Backend API URL yahan aayega
        const res = await axios.get("http://localhost:5000/api/gallery");
        setGallery(res.data); 
      } catch (err) {
        console.error("Data load nahi ho paya", err);
      }
    };
    fetchGallery();
  }, []);

  return (
    <div className="pb-10 bg-slate-950 text-white selection:bg-amber-500 selection:text-slate-900">
      
      {/* 1. HERO SECTION (Aapka existing code) */}
      <section className="relative h-[85vh] flex items-center justify-center text-center px-6 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/bg1.png')] bg-cover bg-center scale-105 opacity-80" aria-hidden="true"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/20 via-slate-950/80 to-slate-950" />
        <div className="relative z-10 max-w-5xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-8 border border-amber-500/30 rounded-full bg-amber-500/10 backdrop-blur-md">
            <Zap size={14} className="text-amber-500 fill-amber-500" />
            <span className="text-amber-500 text-[11px] font-black tracking-[0.3em] uppercase">2026 Edition</span>
          </div>
          <h1 className="text-6xl md:text-8xl font-black mb-6 tracking-tighter leading-none">
            SHINE ON <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-500 to-pink-500 italic">STAGE</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed font-medium">
            The ultimate cultural battleground for MCA students. Unleash your talent in Music, Dance, and Arts.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <Link to="/register" className="group w-full sm:w-auto px-10 py-4 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black rounded-2xl flex items-center justify-center gap-2 transition-all hover:scale-105 shadow-xl shadow-amber-500/20">
              Register Now <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* 2. STATS SECTION */}
      <section className="max-w-6xl mx-auto px-6 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 -mt-16">
          {[
            { icon: <Star className="text-amber-500" />, title: "25+ Events", desc: "Non-stop excitement" },
            { icon: <Users className="text-orange-500" />, title: "1000+ Peers", desc: "Join the community" },
            { icon: <Award className="text-pink-500" />, title: "Big Prizes", desc: "Win & get featured" }
          ].map((item, i) => (
            <div key={i} className="bg-slate-900/60 backdrop-blur-2xl p-8 rounded-[2.5rem] border border-white/5 text-center shadow-2xl hover:border-amber-500/30 transition-all group hover:-translate-y-2">
              <div className="flex justify-center mb-4 transform group-hover:scale-110 transition-transform">{item.icon}</div>
              <h3 className="text-2xl font-black text-white">{item.title}</h3>
              <p className="text-gray-500 text-[10px] mt-2 uppercase tracking-widest font-bold">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 3. DYNAMIC GALLERY WITH DESCRIPTION OVERLAY */}
      <section className="max-w-6xl mx-auto px-6 mt-32">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-white/5 rounded-2xl border border-white/10 shadow-inner">
              <Camera size={28} className="text-amber-500" />
            </div>
            <div>
              <span className="text-amber-500 text-[11px] font-black uppercase tracking-[0.4em] mb-1 block">Full Collection</span>
              <h2 className="text-4xl font-black text-white italic tracking-tighter uppercase">#Memories_Unlimited</h2>
            </div>
          </div>
          <Link to="/events" className="text-xs font-black text-gray-500 hover:text-amber-500 tracking-widest uppercase flex items-center gap-2">
            Visit All <ArrowRight size={14} />
          </Link>
        </div>

        {/* Dynamic Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {gallery.length > 0 ? (
            gallery.map((item, i) => (
              <div key={i} className="group relative aspect-square overflow-hidden rounded-[2rem] bg-slate-900 border border-white/5 shadow-2xl">
                <img
                  src={item.img_url} 
                  className="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700"
                  alt={item.title}
                />
                
                {/* --- DESCRIPTION OVERLAY (Admin controlled) --- */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-6">
                  <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <h4 className="text-amber-400 text-sm font-black uppercase tracking-wider mb-1">{item.title}</h4>
                    <p className="text-gray-300 text-[10px] leading-relaxed line-clamp-2">{item.description}</p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            /* Fallback loader if DB is empty */
            <div className="col-span-full text-center py-20 text-gray-600 font-bold uppercase tracking-widest animate-pulse">
              Empty.....
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default Home;