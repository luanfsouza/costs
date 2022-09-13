import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Contact from "./components/pages/Contact";
import Home from "./components/pages/Home";
import NewProject from "./components/pages/NewProject";
import Projects from "./components/pages/Projects";
import Company from "./components/pages/Company";
import Project from "./components/pages/Project";

import Container from "./components/layout/Container";
import Footer from "./components/layout/Footer";
import Navbar from "./components/layout/Navbar"

function App() {
 
  return (
    <Router>
      <Navbar />
      <Container >
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/Contact" element={<Contact />} />
          <Route path="/Company" element={<Company />} />
          <Route path="/NewProject" element={<NewProject />} />
          <Route path="/Projects" element={<Projects />} />
          <Route path="/Project/:id" element={<Project />} />
        </Routes>
      </Container>
      <Footer />
    </Router>
  );
}

export default App;
