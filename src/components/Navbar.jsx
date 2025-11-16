import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav style={styles.nav}>
      <h2 style={styles.title}>Pizzeria Brother's 🍕</h2>
      <ul style={styles.links}>
        <li><Link style={styles.link} to="/">Home</Link></li>
        <li><Link style={styles.link} to="/menu">Menú</Link></li>
        <li><Link style={styles.link} to="/pedidos">Pedidos</Link></li>
        <li><Link style={styles.link} to="/login">Login</Link></li>
      </ul>
    </nav>
  );
}

const styles = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    padding: "15px 25px",
    background: "#ffcc66",
    alignItems: "center"
  },
  title: {
    margin: 0,
    fontSize: "22px",
    fontWeight: "bold"
  },
  links: {
    display: "flex",
    listStyle: "none",
    gap: "20px"
  },
  link: {
    textDecoration: "none",
    color: "#000",
    fontWeight: "600"
  }
};

export default Navbar;
