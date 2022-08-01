import styles from "./Project.module.css";

import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

import Loading from "../layout/Loading";
import Container from "../layout/Container";
import ProjectForm from "../project/Projectform";
import Message from "../layout/Message";
import ServiceForm from "../service/ServiceForm";

import {parse, v4 as uuidv4 } from 'uuid'
import ServiceCard from "../service/ServiceCard";

export default function Project() {
  const { id } = useParams();

  const [project, setProject] = useState([]);
  const [showProjectform, setShowProjectForm] = useState(false);
  const [showServiceform, setShowServiceForm] = useState(false);
  const [message, setMessage] = useState()
  const [type, setType] = useState()
  const [services, setServices] = useState([])
  useEffect(() => {
    setTimeout(() => {
      fetch(`https://projetoheroku3.herokuapp.com/projects/${id}`, {
        method: "GET",
        headers: {
          "Content-type": "application/json",
        },
      })
        .then((resp) => resp.json())
        .then((data) => {
          setProject(data);
          setServices(data.services);
          console.log("ei olha eu", data);
        })
        .catch((err) => console.log(err));
    }, 1000);
  }, [id]);

  function editPost(project){
    setMessage('')

    // budget validation
    if(project.budget < project.cost){
       setMessage('O orçamento não pode ser menor que o custo do projeto!')
       setType('error')
       return false
    }
    fetch(`https://projetoheroku3.herokuapp.com/projects/${project._id}`, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(project),
    })
      .then((resp) => resp.json())
      .then((data) => {
        setProject(data);
        setShowProjectForm(!showProjectform);
        setMessage("Projeto atualizado");
        setType("success");
      })
      .catch((err) => console.log(err));
  }

  function createService(project){
    setMessage("");
    // last service
    const lastService = project.services[project.services.length-1]
    lastService.id = uuidv4()
    const lastServiceCost = lastService.cost
    const newCost = parseFloat(project.cost) + parseFloat(lastServiceCost)

    // maximun value validation
    if(newCost > parseFloat(project.budget)){
      setMessage('Orçamento ultrapassado, verifique o valor do serviço')
      setType('error')
      project.services.pop()
      return false
    }
    //add service cost to project total cost
    project.cost = newCost

    //update project

    fetch(`https://projetoheroku3.herokuapp.com/projects/${project._id}`, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(project),
    })
      .then((resp) => resp.json())
      .then((data) => {
        // exibir os serviços
        console.log(data);
        setMessage("Item adicionado com sucesso!");
        setType("success");
        setShowServiceForm(false);
        setServices(data.services);
      })
      .catch((err) => console.log(err));
  }
  function removeService(id, cost){
    const servicesUpdated =project.services.filter(
      (services) => services.id !== id
    )
    const projectUpdated = project

    projectUpdated.services = servicesUpdated
    projectUpdated.cost = parseFloat(projectUpdated.cost) - parseFloat(cost)

    fetch(
      `https://projetoheroku3.herokuapp.com/projects/${projectUpdated._id}`,
      {
        method: "PATCH",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(projectUpdated),
      }
    )
      .then((resp) => resp.json())
      .then((data) => {
        console.log(data);
        setServices(servicesUpdated);
        setProject(projectUpdated);
      })
      .catch((err) => console.log(err));
  }
  
  function toggleProjectForm() {
    setShowProjectForm(!showProjectform);
  }
  function toggleServiceForm() {
    setShowServiceForm(!showServiceform);
  }
    
  
  return (
    <>
      {project.name ? (
        <div className={styles.project_details}>
          <Container customClass="column">
            {message && <Message type={type} msg={message} />}
            <div className={styles.details_container}>
              <h1>Projeto: {project.name}</h1>
              <button className={styles.btn} onClick={toggleProjectForm}>
                {!showProjectform ? "Editar Projeto" : "Fechar"}
              </button>
              {!showProjectform ? (
                <div className={styles.project_info}>
                  <p>
                    <span>Categoria:</span> {project.category.name}
                  </p>
                  <p>
                    <span>Total de Orçamento:</span> R${project.budget}
                  </p>
                  <p>
                    <span>Total Utilizado:</span> R${project.cost}
                  </p>
                </div>
              ) : (
                <div className={styles.project_info}>
                  <ProjectForm
                    handleSubmit={editPost}
                    btnText="Concluir edição"
                    projectData={project}
                  />
                </div>
              )}
            </div>
            <div className={styles.service_form_container}>
              <h2>Adicione um serviço</h2>
              <button className={styles.btn} onClick={toggleServiceForm}>
                {!showServiceform ? "Adicionar serviço" : "Fechar"}
              </button>
              <div className={styles.project_info}>
                {showServiceform && (
                  <ServiceForm
                    handleSubmit={createService}
                    btnText="Adicionar serviço"
                    projectData={project}
                  />
                )}
              </div>
            </div>
            <h2>Serviços</h2>
            <Container customClass="flex">
              {services.length > 0 && (
                services.map(service => (
                  <ServiceCard
                  id={service.id}
                  name={service.name}
                  cost={service.cost}
                  description={service.description}
                  key={service.id}
                  handleRemove={removeService}
                  />
                ))
              )}
              {services.length == 0 && <p>Não há serviços cadastrados</p>}
            </Container>
          </Container>
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
}
