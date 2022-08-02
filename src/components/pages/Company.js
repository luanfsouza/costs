import styles from './Company.module.css'
import Container from '../layout/Container'
import { FaBuilding, FaLandmark, FaLaptop, FaUserTie } from "react-icons/fa";
function Company() {
  return (
    <Container customClass="container_company">
      
      <div className={styles.card}>
        <span>
          <FaBuilding />
        </span>
        <h2>Sua empresa</h2>
        <p>made with love</p>
      </div>
      <div className={styles.card}>
        <span>
          <FaLandmark />
        </span>
        <h2>Negocio</h2>
        <p>made with love</p>
      </div>
      <div className={styles.card}>
        <span>
          <FaLaptop />
        </span>
        <h2>Tecnologias</h2>
        <p>made with love</p>
      </div>
      <div className={styles.card}>
        <span>
          <FaUserTie />
        </span>
        <h2>Com segurança</h2>
        <p>made with love</p>
      </div>
    </Container>
  );
}
export default Company;
