import styles from "../project/ProjectForm.module.css";
import { useState } from "react";
import Input from "../form/Input";
import subBtn from "../form/SubmitButton";

export default function ServiceForm({ handleSubmit, btnText, projectData }) {
  const [service, setService] = useState([]);
  function Submit(e) {
    e.preventDefault();
    projectData.services.push(service);
    handleSubmit(projectData);
  }
  function handleChange(e) {
    setService({ ...service, [e.target.name]: e.target.value });
  }
  return (
    <form onSubmit={Submit} className={styles.form}>
      <Input
        type="text"
        text="Nome do serviço"
        name="name"
        placeholder="Insira o nome do serviço"
        handleOnChange={handleChange}
      />
      <Input
        type="number"
        text="Custo do serviço"
        name="cost"
        placeholder="Insira o valor total"
        handleOnChange={handleChange}
      />
      <Input
        type="text"
        text="Descrição do serviço"
        name="description"
        placeholder="Descreva o serviço"
        handleOnChange={handleChange}
      />
      <subBtn text={btnText} />
    </form>
  );
}
