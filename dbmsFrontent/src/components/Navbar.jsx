import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav style={styles.nav}>
      <h3 style={styles.logo}>Cultural Event</h3>

      <div style={styles.links}>
        <Link to="/"
        className="font-bold text-amber-50"
        >
        Home
        </Link>

        <Link to="/dashboard"
        className="font-bold text-amber-50"
        >Dashboard</Link>

        <Link to="/login" className="font-bold text-amber-50">Login</Link>
        <Link to="/register" className="font-bold text-amber-50">Register</Link>
      </div>
    </nav>
  );
}

const styles = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    padding: "15px 30px",
    backgroundColor: "#1e293b",
  },
  logo: {
    color: "white",
  },
  links: {
    display: "flex",
    gap: "20px",
  },
};

export default Navbar;
