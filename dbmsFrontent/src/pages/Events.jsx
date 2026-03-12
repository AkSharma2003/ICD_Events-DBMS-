import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Zap, Calendar, ArrowRight, Star, Loader2, AlertCircle } from "lucide-react";

function Events() {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/events");
        setEvents(res.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching events:", err);
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  // Readable Date Helper
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const goToRegister = (eventName) => {
    navigate("/register", { state: { selectedEvent: eventName } });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <Loader2 className="text-amber-500 animate-spin" size={48} />
      </div>
    );
  }

  return (
    <div className="p-6 lg:p-10 max-w-7xl mx-auto min-h-screen bg-slate-950">
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 mb-4">
          <Star size={14} className="text-amber-500 fill-amber-500" />
          <span className="text-amber-500 text-[10px] font-black uppercase tracking-widest">Live Events</span>
        </div>
        <h2 className="text-5xl font-black text-white italic tracking-tighter uppercase">Pick Your <span className="text-amber-500">Battle</span></h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {events.length > 0 ? (
          events.map(event => (
            <div key={event.id} className="group bg-slate-900/50 backdrop-blur-xl rounded-[2.5rem] overflow-hidden border border-white/5 shadow-2xl hover:border-amber-500/50 transition-all duration-500 hover:-translate-y-2">
              
              {/* Image Section */}
              <div className="relative h-56 overflow-hidden bg-slate-800">
                <img 
                  src={event.image_url} 
                  alt={event.title} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-all duration-700 opacity-80 group-hover:opacity-100" 
                  onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?q=80&w=1000"; }}
                />
                <div className="absolute top-4 left-4 bg-slate-950/80 backdrop-blur-md px-4 py-1.5 rounded-full flex items-center gap-2 border border-white/10">
                  <span className="text-amber-500 animate-pulse"><Zap size={16}/></span>
                  <span className="text-[10px] font-black text-white uppercase tracking-widest">Active</span>
                </div>
              </div>

              {/* Content Section */}
              <div className="p-8">
                <h3 className="text-2xl font-bold text-white mb-3 truncate group-hover:text-amber-500 transition-colors">{event.title}</h3>
                <p className="text-gray-400 text-sm mb-6 line-clamp-3 leading-relaxed">{event.description}</p>
                <div className="flex items-center gap-2 text-slate-300 mb-8 text-sm font-semibold bg-white/5 w-fit px-4 py-2 rounded-xl">
                  <Calendar size={16} className="text-amber-500" />
                  <span>{formatDate(event.event_date)}</span>
                </div>

                <button 
                  onClick={() => goToRegister(event.title)}
                  className="w-full py-4 bg-white text-slate-950 font-black rounded-2xl flex items-center justify-center gap-2 group-hover:bg-amber-500 transition-all active:scale-95 shadow-lg group-hover:shadow-amber-500/30"
                >
                  Register Now <ArrowRight size={18} />
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full flex flex-col items-center justify-center py-32 text-gray-500 bg-slate-900/20 rounded-[3rem] border border-dashed border-white/10">
             <AlertCircle size={48} className="mb-4 text-slate-700" />
             <p className="text-xl italic font-medium tracking-tight">No battles found. Check back later!</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Events;