import Message from "../layout/Message";
import styles from "./Projects.module.css";
import { useLocation } from "react-router-dom";
import Container from "../layout/Container";
import LinkButton from "../layout/LinkButton";
import ProjectCard from "../project/ProjectCard";
import { useState, useEffect } from "react";
import Loading from "../layout/Loading";

function Projects() {
  const [projects, setProjects] = useState([]);
  const [removeLoading, setRemoveLoading] = useState(false);
  const [projectMessage, setProjectMessage] = useState("");

  const location = useLocation();
  let message = "";
  if (location.state) {
    message = location.state.message;
  }

  useEffect(() => {
    setTimeout(() => {
      fetch("https://projetoheroku3.herokuapp.com/projects", {
        method: "GET",
        headers: {
          "Content-type": "application/json",
        },
      })
        .then((resp) => resp.json())
        .then((data) => {
          console.log(data);
          setProjects(data);
          setRemoveLoading(true);
        })
        .catch((err) => console.log("ei olha pra min", err));
    }, 800);
  }, []);
  function atualizaBancodeDados() {
    fetch("https://projetoheroku3.herokuapp.com/projects", {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((resp) => resp.json())
      .then((data) => {
        console.log(data);
        setProjects(data);
        setRemoveLoading(true);
      })
      .catch((err) => console.log(err));
  }
  function removeProject(id) {
    fetch(`https://projetoheroku3.herokuapp.com/projects/${id}`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((resp) => resp.json())
      .then((data) => {
        console.log(id);
        setProjects(projects.filter((project) => project._id !== id));
        setProjectMessage("Projeto removido com sucesso!");
      })
      .catch((err) => console.log(err));
  }

  return (
    <div className={styles.project_container}>
      <div className={styles.title_container}>
        <h1>My Projects</h1>
        <LinkButton to="/NewProject" text="Criar Projeto" />
      </div>

      {message && <Message type="success" msg={message} />}
      {projectMessage && <Message type="success" msg={projectMessage} />}
      {/* <Container customClass="start"> */}
      <Container customClass="container_projects">
        {projects.length > 0 &&
          projects.map((project) => (
            <ProjectCard
              id={project._id}
              budget={project.budget}
              category={project.category.name}
              key={project._id}
              name={project.name}
              handleRemove={removeProject}
            />
          ))}
        {!removeLoading && <Loading />}
        {removeLoading && projects.length === 0 && (
          <p>Não há projetos cadastrados</p>
        )}
      </Container>
    </div>
  );
}
export default Projects;
