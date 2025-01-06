import {
  BrowserRouter as Router,
  Routes,
  Route,
  createRoutesFromElements,
} from "react-router-dom";
import { useState } from "react";
import Dashboard from "./components/Dashboard";
import ProjectDetails from "./components/ProjectDetails";
import { ProjectProvider } from "./context/ProjectContext";
import houseImage from "./assets/house.jpg";
import "./App.css";

function App() {
  const [projects, setProjects] = useState([
    {
      id: 1,
      projectName: "Modern Farmhouse Kitchen",
      address: "123 Oak Street, Toronto, ON M5V 2K7",
      phoneNumber: "(416) 555-0101",
      emailAddress: "smith.family@email.com",
      mainImage: houseImage,
      projectType: "Renovation",
      currentStage: "Intake",
      stageHistory: [{ stage: "Intake", date: "2024-02-15" }],
      todos: {
        intake: [
          { id: 1, task: "Contact Information", completed: false },
          { id: 2, task: "Client Onboarding Email", completed: false },
          { id: 3, task: "Schedule Site Visit", completed: false },
        ],
        quote: [
          { id: 1, task: "Initial Site Visit", completed: false },
          { id: 2, task: "Measurements Taken", completed: false },
          { id: 3, task: "Quote Generated", completed: false },
          { id: 4, task: "Quote Sent to Client", completed: false },
        ],
        preConstruction: [
          { id: 1, task: "Contract Signed", completed: false },
          { id: 2, task: "Deposit Received", completed: false },
          { id: 3, task: "Materials Selected", completed: false },
          { id: 4, task: "Timeline Created", completed: false },
        ],
        construction: [
          { id: 1, task: "Demolition Complete", completed: false },
          { id: 2, task: "Plumbing Rough-in", completed: false },
          { id: 3, task: "Electrical Rough-in", completed: false },
          { id: 4, task: "Cabinets Installed", completed: false },
          { id: 5, task: "Countertops Installed", completed: false },
          { id: 6, task: "Appliances Installed", completed: false },
        ],
        closeOut: [
          { id: 1, task: "Final Inspection", completed: false },
          { id: 2, task: "Client Walkthrough", completed: false },
          { id: 3, task: "Final Payment Received", completed: false },
          { id: 4, task: "Warranty Documentation", completed: false },
        ],
      },
    },
    {
      id: 2,
      projectName: "Contemporary Condo Kitchen",
      address: "456 Oak Avenue, Ottawa, ON K2P 0G7",
      phoneNumber: "(613) 555-0102",
      emailAddress: "johnson.m@email.com",
      mainImage: houseImage,
      projectType: "New Construction",
      currentStage: "Intake",
      stageHistory: [{ stage: "Intake", date: "2024-02-15" }],
      todos: {
        intake: [
          { id: 1, task: "Contact Information", completed: false },
          { id: 2, task: "Client Onboarding Email", completed: false },
          { id: 3, task: "Schedule Site Visit", completed: false },
        ],
        quote: [
          { id: 1, task: "Site Measurements", completed: false },
          { id: 2, task: "Material Selections", completed: false },
          { id: 3, task: "Quote Generation", completed: false },
        ],
        preConstruction: [
          { id: 1, task: "Permits Obtained", completed: false },
          { id: 2, task: "Timeline Created", completed: false },
          { id: 3, task: "Materials Ordered", completed: false },
        ],
        construction: [
          { id: 1, task: "Demo Complete", completed: false },
          { id: 2, task: "Rough-ins Complete", completed: false },
          { id: 3, task: "Finishes Complete", completed: false },
        ],
        closeOut: [
          { id: 1, task: "Final Inspection", completed: false },
          { id: 2, task: "Client Walkthrough", completed: false },
          { id: 3, task: "Final Payment", completed: false },
        ],
      },
    },
    {
      id: 3,
      projectName: "Traditional Home Kitchen",
      address: "789 Pine Road, Ottawa, ON K1Z 7R9",
      phoneNumber: "(613) 555-0103",
      emailAddress: "williams.family@email.com",
      mainImage: houseImage,
      projectType: "Renovation",
      currentStage: "Intake",
      stageHistory: [{ stage: "Intake", date: "2024-02-15" }],
      todos: {
        intake: [
          { id: 1, task: "Contact Information", completed: false },
          { id: 2, task: "Client Onboarding Email", completed: false },
          { id: 3, task: "Schedule Site Visit", completed: false },
        ],
        quote: [
          { id: 1, task: "Site Measurements", completed: false },
          { id: 2, task: "Material Selections", completed: false },
          { id: 3, task: "Quote Generation", completed: false },
        ],
        preConstruction: [
          { id: 1, task: "Permits Obtained", completed: false },
          { id: 2, task: "Timeline Created", completed: false },
          { id: 3, task: "Materials Ordered", completed: false },
        ],
        construction: [
          { id: 1, task: "Demo Complete", completed: false },
          { id: 2, task: "Rough-ins Complete", completed: false },
          { id: 3, task: "Finishes Complete", completed: false },
        ],
        closeOut: [
          { id: 1, task: "Final Inspection", completed: false },
          { id: 2, task: "Client Walkthrough", completed: false },
          { id: 3, task: "Final Payment", completed: false },
        ],
      },
    },
  ]);

  return (
    <ProjectProvider>
      <Router
        future={{
          v7_startTransition: true,
          v7_relativeSplatPath: true,
        }}
      >
        <div className="app">
          <Routes>
            <Route
              path="/"
              element={
                <Dashboard projects={projects} setProjects={setProjects} />
              }
            />
            <Route
              path="/project/:id"
              element={
                <ProjectDetails projects={projects} setProjects={setProjects} />
              }
            />
          </Routes>
        </div>
      </Router>
    </ProjectProvider>
  );
}

export default App;
