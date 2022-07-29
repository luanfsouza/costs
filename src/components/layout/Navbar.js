import { Link } from "react-router-dom";
import Container from "./Container";
import styles from "./Navbar.module.css";
import logo from "../../img/costs_logo.png";
function Navbar() {
  return (
    <nav className={styles.navbar}>
      <Container customClass='container_navbar'>
        <Link to="/">
          <img src={logo} alt="costs"></img>
        </Link>
        <ul className={styles.list}>
          <li className={styles.item}>
            <Link to="/">Home</Link>
          </li>
          <li className={styles.item}>
            <Link to="/Projects">Projects</Link>
          </li>
          <li className={styles.item}>
            <Link to="/Contact">Contact</Link>
          </li>
          <li className={styles.item}>
            <Link to="/Comapany">Comapany</Link>
          </li>
          {/* <li>
            <Link to="/NewNewProject">New Project</Link>
          </li> */}
        </ul>
      </Container>
    </nav>
  );
}
export default Navbar;
