import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";
import houseImage from "../assets/house.jpg";
import FilterBar from "./FilterBar";
import ProjectCard from "./ProjectCard";

const Dashboard = ({ projects, setProjects }) => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [newProject, setNewProject] = useState({
    projectName: "",
    address: "",
    phoneNumber: "",
    emailAddress: "",
    mainImage: null,
    projectType: "",
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [filters, setFilters] = useState({
    status: "all",
    projectType: "all",
    dateRange: null,
  });
  const [sortConfig, setSortConfig] = useState({
    field: "projectName",
    direction: "asc",
  });

  useEffect(() => {
    if (isModalOpen) {
      document.body.classList.add("modal-open");
    } else {
      document.body.classList.remove("modal-open");
      // Clear image preview when modal closes
      setImagePreview(null);
    }
    return () => {
      document.body.classList.remove("modal-open");
    };
  }, [isModalOpen]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProject((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setNewProject((prev) => ({
          ...prev,
          mainImage: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newId =
      projects.length > 0 ? Math.max(...projects.map((p) => p.id)) + 1 : 1;

    setProjects([
      ...projects,
      {
        ...newProject,
        id: newId,
        mainImage: newProject.mainImage || houseImage,
        currentStage: "Intake",
        stageHistory: [
          { stage: "Intake", date: new Date().toISOString().split("T")[0] },
        ],
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
    ]);

    // Reset form
    setNewProject({
      projectName: "",
      address: "",
      phoneNumber: "",
      emailAddress: "",
      mainImage: null,
      projectType: "",
    });
    setImagePreview(null);
    setIsModalOpen(false);
  };

  const handleProjectClick = (projectId) => {
    navigate(`/project/${projectId}`);
  };

  // Calculate project progress
  const calculateProgress = (project) => {
    const allTodos = Object.values(project.todos).flat();
    const completedTodos = allTodos.filter((todo) => todo.completed);
    return Math.round((completedTodos.length / allTodos.length) * 100);
  };

  // Apply filters and sorting
  const getFilteredAndSortedProjects = () => {
    let filtered = projects.filter((project) => {
      const matchesSearch = searchQuery
        .toLowerCase()
        .split(" ")
        .every((term) =>
          Object.values(project).some((value) =>
            String(value).toLowerCase().includes(term)
          )
        );

      const matchesStatus =
        filters.status === "all" || project.currentStage === filters.status;
      const matchesType =
        filters.projectType === "all" ||
        project.projectType === filters.projectType;

      return matchesSearch && matchesStatus && matchesType;
    });

    // Apply sorting
    return filtered.sort((a, b) => {
      const aValue = a[sortConfig.field];
      const bValue = b[sortConfig.field];

      if (sortConfig.direction === "asc") {
        return aValue > bValue ? 1 : -1;
      }
      return aValue < bValue ? 1 : -1;
    });
  };

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>Kitchen Renovation Manager</h1>
        <div className="header-controls">
          <div className="search-container">
            <input
              type="text"
              placeholder="Search projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
            {searchQuery && (
              <button
                className="clear-search"
                onClick={() => setSearchQuery("")}
                aria-label="Clear search"
              >
                ×
              </button>
            )}
          </div>
          <button
            className="new-project-btn"
            onClick={() => setIsModalOpen(true)}
          >
            + New Project
          </button>
        </div>
      </header>

      <FilterBar
        filters={filters}
        setFilters={setFilters}
        sortConfig={sortConfig}
        setSortConfig={setSortConfig}
      />

      <div className="projects-list">
        <h2>Current Projects</h2>
        {getFilteredAndSortedProjects().length === 0 ? (
          <div className="no-results">
            No projects match your search criteria
          </div>
        ) : (
          <div className="projects-grid">
            {getFilteredAndSortedProjects().map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onClick={handleProjectClick}
              />
            ))}
          </div>
        )}
      </div>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h2>New Project</h2>
              <button
                className="close-btn"
                onClick={() => setIsModalOpen(false)}
              >
                ×
              </button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="image-upload-group">
                <div className="image-preview-container">
                  {imagePreview ? (
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="image-preview"
                    />
                  ) : (
                    <div className="image-placeholder">Upload Image</div>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="image-input"
                  />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="projectName">Project Name *</label>
                <input
                  type="text"
                  id="projectName"
                  name="projectName"
                  value={newProject.projectName}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="address">Address</label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={newProject.address}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="phoneNumber">Phone Number</label>
                <input
                  type="tel"
                  id="phoneNumber"
                  name="phoneNumber"
                  value={newProject.phoneNumber}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="emailAddress">Email Address</label>
                <input
                  type="email"
                  id="emailAddress"
                  name="emailAddress"
                  value={newProject.emailAddress}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="projectType">Project Type *</label>
                <select
                  id="projectType"
                  name="projectType"
                  value={newProject.projectType}
                  onChange={handleInputChange}
                  required
                  className="form-select"
                >
                  <option value="">Select Project Type</option>
                  <option value="Renovation">Renovation</option>
                  <option value="New Construction">New Construction</option>
                </select>
              </div>
              <div className="form-actions">
                <button
                  type="button"
                  className="cancel-btn"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="submit-btn">
                  Add Project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
