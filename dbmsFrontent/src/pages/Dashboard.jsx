import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Trash2, Users, Lock, GraduationCap, PlusCircle, X, Calendar, Edit, Search, Camera, ImagePlus } from "lucide-react";

function Dashboard() {
  const [participants, setParticipants] = useState([]);
  const [events, setEvents] = useState([]);
  const [gallery, setGallery] = useState([]); // NEW: Gallery state
  
  const [showModal, setShowModal] = useState(false);
  const [showUserModal, setShowUserModal] = useState(false);
  const [showGalleryModal, setShowGalleryModal] = useState(false); // NEW: Gallery Modal state
  
  const [searchTerm, setSearchTerm] = useState("");
  const [editingId, setEditingId] = useState(null); 
  const [editingUser, setEditingUser] = useState({ id: "", name: "", email: "", event: "" });

  const [newEvent, setNewEvent] = useState({ title: "", description: "", image_url: "", event_date: "" });
  const [newGallery, setNewGallery] = useState({ title: "", description: "", img_url: "" }); // NEW: Gallery form state
  
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const fetchData = async () => {
    try {
      const usersRes = await axios.get("http://localhost:5000/api/users");
      setParticipants(usersRes.data);
      const eventsRes = await axios.get("http://localhost:5000/api/events");
      setEvents(eventsRes.data);
      const galleryRes = await axios.get("http://localhost:5000/api/gallery"); // NEW: Fetch Gallery
      setGallery(galleryRes.data);
    } catch (err) { console.error("Error fetching data:", err); }
  };

  useEffect(() => {
    if (!user || user.role !== 'admin') {
      const timer = setTimeout(() => { navigate("/"); }, 3000);
      return () => clearTimeout(timer);
    } else {
      fetchData();
    }
  }, [user, navigate]);

  // --- GALLERY ACTIONS ---
  const handleGallerySubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/gallery", newGallery);
      alert("📸 Photo Added to Gallery!");
      setShowGalleryModal(false);
      setNewGallery({ title: "", description: "", img_url: "" });
      fetchData();
    } catch (err) { alert("Upload failed!"); }
  };

  const handleDeleteGallery = async (id) => {
    if (window.confirm("Delete this memory from gallery?")) {
      try {
        await axios.delete(`http://localhost:5000/api/gallery/${id}`);
        fetchData();
      } catch (err) { alert("Delete failed!"); }
    }
  };

  // --- FILTER & OTHER ACTIONS (Same as yours) ---
  const filteredParticipants = participants.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    p.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.event.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEventSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await axios.put(`http://localhost:5000/api/events/${editingId}`, newEvent);
        alert("🆙 Event Updated!");
      } else {
        await axios.post("http://localhost:5000/api/events", newEvent);
        alert("✨ Event Added Successfully!");
      }
      closeEventModal();
      fetchData();
    } catch (err) { alert("Action failed!"); }
  };

  const openEditEvent = (ev) => {
    setNewEvent({ title: ev.title, description: ev.description, image_url: ev.image_url, event_date: ev.event_date.split('T')[0] });
    setEditingId(ev.id);
    setShowModal(true);
  };

  const closeEventModal = () => {
    setShowModal(false);
    setEditingId(null);
    setNewEvent({ title: "", description: "", image_url: "", event_date: "" });
  };

  const handleUserUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/users/${editingUser.id}`, editingUser);
      alert("👤 User Updated!");
      setShowUserModal(false);
      fetchData();
    } catch (err) { alert("Update failed!"); }
  };

  const handleDeleteUser = async (id) => {
    if (window.confirm("Are you sure?")) {
      try { await axios.delete(`http://localhost:5000/api/users/${id}`); fetchData(); } catch (err) { alert("Delete failed!"); }
    }
  };

  const handleDeleteEvent = async (id) => {
    if (window.confirm("Delete this event?")) {
      try { await axios.delete(`http://localhost:5000/api/events/${id}`); fetchData(); } catch (err) { alert("Failed to delete event."); }
    }
  };

  if (!user || user.role !== 'admin') {
    return (
      <div className="min-h-[80vh] flex items-center justify-center bg-slate-950 text-white p-6 text-center">
        <div className="space-y-4 max-w-md bg-slate-900 p-10 rounded-3xl border border-red-500/20 shadow-2xl">
          <Lock size={40} className="mx-auto text-red-500" />
          <h2 className="text-2xl font-black uppercase tracking-tighter">Access Denied</h2>
          <p className="text-slate-400">Redirecting to home...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 lg:p-12 max-w-7xl mx-auto space-y-12 pb-24">
      
      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="space-y-1">
          <h1 className="text-4xl font-black text-white">Admin <span className="text-amber-500">Dashboard</span></h1>
          <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">Control Center</p>
        </div>
        <div className="flex gap-3">
          <button onClick={() => setShowGalleryModal(true)} className="flex items-center gap-2 bg-slate-800 text-white font-bold px-6 py-4 rounded-[1.5rem] border border-white/10 hover:bg-slate-700 transition-all">
            <ImagePlus size={20} className="text-amber-500" /> Gallery
          </button>
          <button onClick={() => setShowModal(true)} className="flex items-center gap-2 bg-amber-500 text-slate-950 font-bold px-6 py-4 rounded-[1.5rem] hover:bg-amber-400 transition-all shadow-xl shadow-amber-500/20">
            <PlusCircle size={20} /> Event
          </button>
        </div>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard title="Total Users" count={participants.length} icon={<Users size={24}/>} color="text-amber-500" />
        <StatCard title="Events Live" count={events.length} icon={<Calendar size={24}/>} color="text-blue-500" />
        <StatCard title="Gallery Pics" count={gallery.length} icon={<Camera size={24}/>} color="text-pink-500" />
        <StatCard title="Total Depts" count={2} icon={<GraduationCap size={24}/>} color="text-emerald-500" />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-10">
        {/* USERS TABLE */}
        <div className="xl:col-span-2 space-y-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <h2 className="text-xl font-bold text-white flex items-center gap-2 italic"><Users size={20} className="text-amber-500" /> Participants</h2>
            <div className="relative w-full sm:w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
              <input type="text" placeholder="Search..." className="w-full bg-slate-900 border border-white/10 rounded-xl py-2 pl-10 pr-4 text-sm text-white outline-none focus:border-amber-500" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
            </div>
          </div>
          <div className="bg-slate-900 rounded-[2rem] border border-white/10 overflow-hidden shadow-2xl">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-white/5 border-b border-white/10 italic text-amber-500 text-[10px] uppercase tracking-widest">
                    <th className="p-5 font-black">User Info</th>
                    <th className="p-5 font-black">Dept</th>
                    <th className="p-5 font-black text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {filteredParticipants.map((p) => (
                    <tr key={p.id} className="hover:bg-white/[0.02] transition-colors">
                      <td className="p-5">
                        <p className="font-semibold text-slate-200">{p.name}</p>
                        <p className="text-xs text-slate-500">{p.email}</p>
                      </td>
                      <td className="p-5"><span className="bg-slate-800 text-amber-500 px-3 py-1 rounded-full text-[10px] font-bold border border-amber-500/20">{p.event}</span></td>
                      <td className="p-5 flex justify-center gap-2">
                        <button onClick={() => { setEditingUser(p); setShowUserModal(true); }} className="p-2 text-blue-500 hover:bg-blue-500/10 rounded-lg"><Edit size={18} /></button>
                        <button onClick={() => handleDeleteUser(p.id)} className="p-2 text-red-500 hover:bg-red-500/10 rounded-lg"><Trash2 size={18} /></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
          </div>
        </div>

        {/* SIDEBAR: EVENTS & GALLERY LIST */}
        <div className="space-y-8">
          {/* EVENTS */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-white flex items-center gap-2 italic"><Calendar size={20} className="text-blue-500" /> Live Events</h2>
            <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
              {events.map((ev) => (
                <div key={ev.id} className="bg-slate-900 p-4 rounded-2xl border border-white/5 flex justify-between items-center group">
                  <div className="flex items-center gap-3">
                    <img src={ev.image_url} alt="" className="w-10 h-10 rounded-lg object-cover" />
                    <h4 className="text-white font-bold text-xs truncate w-24">{ev.title}</h4>
                  </div>
                  <div className="flex gap-1">
                     <button onClick={() => openEditEvent(ev)} className="p-1.5 text-blue-500 hover:bg-blue-500/10 rounded-md"><Edit size={14} /></button>
                     <button onClick={() => handleDeleteEvent(ev.id)} className="p-1.5 text-red-500 hover:bg-red-500/10 rounded-md"><Trash2 size={14} /></button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* GALLERY MINI LIST */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-white flex items-center gap-2 italic"><Camera size={20} className="text-pink-500" /> Gallery</h2>
            <div className="grid grid-cols-3 gap-2">
              {gallery.map((img) => (
                <div key={img.id} className="relative group aspect-square rounded-xl overflow-hidden border border-white/10">
                  <img src={img.img_url} className="w-full h-full object-cover" alt="" />
                  <button onClick={() => handleDeleteGallery(img.id)} className="absolute inset-0 bg-red-600/80 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all">
                    <Trash2 size={16} className="text-white" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* --- MODALS --- */}
      
      {/* GALLERY MODAL */}
      {showGalleryModal && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-md z-[120] flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-white/10 p-10 rounded-[3rem] w-full max-w-md relative shadow-2xl">
            <button onClick={() => setShowGalleryModal(false)} className="absolute top-8 right-8 text-slate-500 hover:text-white"><X size={28} /></button>
            <h2 className="text-3xl font-black text-white mb-8 italic">Add <span className="text-pink-500 underline">Photo</span></h2>
            <form onSubmit={handleGallerySubmit} className="space-y-5">
              <input type="text" placeholder="Photo Title" required className="w-full bg-slate-800 p-4 rounded-2xl text-white outline-none border border-white/5 focus:border-pink-500" onChange={(e) => setNewGallery({...newGallery, title: e.target.value})} />
              <textarea placeholder="Description" rows="2" className="w-full bg-slate-800 p-4 rounded-2xl text-white outline-none border border-white/5 focus:border-pink-500" onChange={(e) => setNewGallery({...newGallery, description: e.target.value})}></textarea>
              <input type="text" placeholder="Image URL (Unsplash/Lorem Picsum)" required className="w-full bg-slate-800 p-4 rounded-2xl text-white outline-none border border-white/5 focus:border-pink-500" onChange={(e) => setNewGallery({...newGallery, img_url: e.target.value})} />
              <button type="submit" className="w-full bg-pink-500 text-white font-black p-5 rounded-2xl hover:scale-105 transition-all text-lg shadow-lg shadow-pink-500/20">Upload to Gallery</button>
            </form>
          </div>
        </div>
      )}

      {/* EVENT MODAL (Existing) */}
      {showModal && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-md z-[100] flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-white/10 p-10 rounded-[3rem] w-full max-w-md relative">
            <button onClick={closeEventModal} className="absolute top-8 right-8 text-slate-500 hover:text-white"><X size={28} /></button>
            <h2 className="text-3xl font-black text-white mb-8 italic">{editingId ? 'Edit' : 'Create'} <span className="text-amber-500 underline">Event</span></h2>
            <form onSubmit={handleEventSubmit} className="space-y-5">
              <input type="text" placeholder="Event Name" required value={newEvent.title} className="w-full bg-slate-800 p-4 rounded-2xl text-white outline-none border border-white/5 focus:border-amber-500" onChange={(e) => setNewEvent({...newEvent, title: e.target.value})} />
              <textarea placeholder="Description" rows="3" required value={newEvent.description} className="w-full bg-slate-800 p-4 rounded-2xl text-white outline-none border border-white/5 focus:border-amber-500" onChange={(e) => setNewEvent({...newEvent, description: e.target.value})}></textarea>
              <input type="text" placeholder="Image URL" required value={newEvent.image_url} className="w-full bg-slate-800 p-4 rounded-2xl text-white outline-none border border-white/5 focus:border-amber-500" onChange={(e) => setNewEvent({...newEvent, image_url: e.target.value})} />
              <input type="date" required value={newEvent.event_date} className="w-full bg-slate-800 p-4 rounded-2xl text-white outline-none border border-white/5 focus:border-amber-500" onChange={(e) => setNewEvent({...newEvent, event_date: e.target.value})} />
              <button type="submit" className="w-full bg-amber-500 text-slate-950 font-bold p-5 rounded-2xl hover:scale-105 transition-all text-lg">{editingId ? 'Update Event' : 'Post Event'}</button>
            </form>
          </div>
        </div>
      )}

      {/* USER MODAL (Existing) */}
      {showUserModal && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-md z-[110] flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-white/10 p-10 rounded-[3rem] w-full max-w-md relative text-white">
            <button onClick={() => setShowUserModal(false)} className="absolute top-8 right-8 text-slate-500 hover:text-white"><X size={28} /></button>
            <h2 className="text-3xl font-black mb-8 italic">Edit <span className="text-blue-500">User</span></h2>
            <form onSubmit={handleUserUpdate} className="space-y-5">
              <input type="text" value={editingUser.name} className="w-full bg-slate-800 p-4 rounded-2xl text-white outline-none border border-white/5" onChange={(e) => setEditingUser({...editingUser, name: e.target.value})} />
              <input type="email" value={editingUser.email} className="w-full bg-slate-800 p-4 rounded-2xl text-white outline-none border border-white/5" onChange={(e) => setEditingUser({...editingUser, email: e.target.value})} />
              <select value={editingUser.event} className="w-full bg-slate-800 p-4 rounded-2xl text-white outline-none border border-white/5" onChange={(e) => setEditingUser({...editingUser, event: e.target.value})}>
                <option value="MCA">MCA</option><option value="BCA">BCA</option>
              </select>
              <button type="submit" className="w-full bg-blue-500 text-white font-bold p-5 rounded-2xl">Update User</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

function StatCard({ title, count, icon, color }) {
  return (
    <div className="bg-slate-900 p-8 rounded-[2rem] border border-white/10 flex items-center justify-between shadow-lg hover:border-white/20 transition-all">
      <div>
        <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">{title}</p>
        <h2 className={`text-3xl font-black mt-1 ${color}`}>{count}</h2>
      </div>
      <div className={`p-4 bg-white/5 rounded-2xl ${color} shadow-inner`}>{icon}</div>
    </div>
  );
}

export default Dashboard;