import InputContact from "../form/InputContact";
import styles from "./Contact.module.css";

function Contact() {
  return (
    <div className={styles.container_contact}>
      <div className={styles.contact_form}>
        <h1 className={styles.title}>Fale com a gente</h1>
        <div className={styles.row}>
          <InputContact
            type="text"
            text="Nome"
            placeholder="Digite seu nome"
            name="nome"
            id="nome"
          />
        </div>
        <div className={styles.row}>
          <InputContact
            type="text"
            text="Email"
            placeholder="Digite seu email"
            name="email"
            id="email"
          />
        </div>
        <div className={styles.row}><button>Enviar</button></div>
        
      </div>
    </div>
  );
}
export default Contact;
