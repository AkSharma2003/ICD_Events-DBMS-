import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="box">
      <h2>Cultural Event Management System</h2>

      <Link to="/login">
        <button>Login</button>
      </Link>
      <br /><br />
      <Link to="/register">
        <button>Register</button>
      </Link>
    </div>
  );
}

export default Home;
