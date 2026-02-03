import { useEffect, useState } from "react";

function Dashboard() {
  const [participants, setParticipants] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/participants")
      .then(res => res.json())
      .then(data => setParticipants(data))
      .catch(err => console.log(err));
  }, []);

  return (
    <div className="box">
      <h2>Participants List</h2>
      <table border="1" width="100%">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Event</th>
          </tr>
        </thead>
        <tbody>
          {participants.map(p => (
            <tr key={p.id}>
              <td>{p.id}</td>
              <td>{p.name}</td>
              <td>{p.event}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Dashboard;
