import ProjectForm from '../project/Projectform';
import styles from './NewProject.module.css'
import {useNavigate} from 'react-router-dom'
function NewProject() {
  const history = useNavigate()
  function criatePost(project){
    // initialize cost and services
    project.cost = 0
    project.services = []

    fetch("https://projetoheroku3.herokuapp.com/projects", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(project),
    })
      .then((resp) => resp.json())
      .then((data) => {
        history("/projects", {
          state: { message: "Projeto criado com sucesso" },
        });
      })
      .catch((err) => console.log(err));
  }
  return (
    <div className={styles.newproject_container}>
      <h1>Criar Projeto</h1>
      <p>Crie seu projeto para depois adicionar os serviços</p>
      <ProjectForm handleSubmit={criatePost} btnText='Criar projeto'/>
    </div>
  )
}
export default NewProject;
