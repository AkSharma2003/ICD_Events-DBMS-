import { useEffect, useState } from "react";
import axios from "axios";

function Participants() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Backend se data mangwane ka function
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/users");
        setUsers(res.data);
      } catch (err) {
        console.log("Data fetch nahi ho paya", err);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="p-8 text-white bg-slate-900 min-h-screen">
      <h2 className="text-3xl font-bold mb-6 text-amber-500">Registered Participants</h2>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-slate-700">
          <thead>
            <tr className="bg-slate-800">
              <th className="p-3 border border-slate-700">ID</th>
              <th className="p-3 border border-slate-700">Name</th>
              <th className="p-3 border border-slate-700">Email</th>
              <th className="p-3 border border-slate-700">Department</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="text-center hover:bg-slate-800 transition-colors">
                <td className="p-3 border border-slate-700">{user.id}</td>
                <td className="p-3 border border-slate-700">{user.name}</td>
                <td className="p-3 border border-slate-700">{user.email}</td>
                <td className="p-3 border border-slate-700">{user.event}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Participants;