import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "./ProjectDetails.css";

const STAGE_CONFIG = [
  {
    key: "intake",
    displayName: "Intake",
    heading: "Intake Information",
  },
  {
    key: "quote",
    displayName: "Quote",
    heading: "Quote Information",
  },
  {
    key: "preConstruction",
    displayName: "Pre-Construction",
    heading: "Pre-Construction Information",
  },
  {
    key: "construction",
    displayName: "Construction",
    heading: "Construction Information",
  },
  {
    key: "closeOut",
    displayName: "Close-Out",
    heading: "Close-Out Information",
  },
];

const ProjectDetails = ({ projects, setProjects }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedStage, setSelectedStage] = useState(null);

  const project = projects.find((p) => p.id === parseInt(id));

  useEffect(() => {
    if (project && project.currentStage) {
      setSelectedStage(project.currentStage);
    }
  }, [project]);

  const handleTodoToggle = (stageKey, todoId) => {
    const updatedProjects = projects.map((p) => {
      if (p.id === parseInt(id)) {
        return {
          ...p,
          todos: {
            ...p.todos,
            [stageKey]: p.todos[stageKey].map((todo) =>
              todo.id === todoId
                ? { ...todo, completed: !todo.completed }
                : todo
            ),
          },
        };
      }
      return p;
    });
    setProjects(updatedProjects);
  };

  const handleStageChange = (newStageDisplayName) => {
    const updatedProjects = projects.map((p) => {
      if (p.id === parseInt(id)) {
        return {
          ...p,
          currentStage: newStageDisplayName,
          stageHistory: [
            ...p.stageHistory,
            {
              stage: newStageDisplayName,
              date: new Date().toISOString().split("T")[0],
            },
          ],
        };
      }
      return p;
    });
    setProjects(updatedProjects);
    setSelectedStage(newStageDisplayName);
  };

  const handleFinishProject = () => {
    const updatedProjects = projects.map((p) => {
      if (p.id === parseInt(id)) {
        return {
          ...p,
          status: "Finished",
          currentStage: "Finished",
        };
      }
      return p;
    });
    setProjects(updatedProjects);
    navigate("/");
  };

  const canAdvanceStage = () => {
    if (!project) return false;
    // Look up the key for the project’s currentStage (display name)
    const stageConfig = STAGE_CONFIG.find(
      (cfg) => cfg.displayName === project.currentStage
    );
    if (!stageConfig) return false; // If not found, can't proceed

    const stageKey = stageConfig.key; // e.g. "preConstruction" or "closeOut"
    if (!project.todos[stageKey]) return false;

    return project.todos[stageKey].every((todo) => todo.completed);
  };

  const renderStageContent = (stageDisplayName) => {
    if (!stageDisplayName || !project) return null;

    // Convert the stage’s display name (e.g. “Pre-Construction”) to its key (e.g. “preConstruction”)
    const currentStageConfig = STAGE_CONFIG.find(
      (cfg) => cfg.displayName === stageDisplayName
    );
    if (!currentStageConfig) return null;

    const stageKey = currentStageConfig.key; // This matches the todos property

    const showNextStageButton =
      project.currentStage === currentStageConfig.displayName &&
      STAGE_CONFIG.findIndex((cfg) => cfg.key === stageKey) <
        STAGE_CONFIG.length - 1;

    const showFinishButton =
      currentStageConfig.displayName === "Close-Out" &&
      project.currentStage === "Close-Out";

    return (
      <div className={`stage-content ${stageKey}-stage`}>
        <div className="stage-header">
          <h3>{currentStageConfig.heading}</h3>

          {showNextStageButton && (
            <button
              className="next-stage-btn"
              onClick={() => {
                // Lookup the *next* stage’s displayName
                const currentIndex = STAGE_CONFIG.findIndex(
                  (cfg) => cfg.key === stageKey
                );
                const nextStage = STAGE_CONFIG[currentIndex + 1];
                handleStageChange(nextStage.displayName);
              }}
              disabled={!canAdvanceStage()}
            >
              Next Stage →
            </button>
          )}

          {showFinishButton && (
            <button
              className="finish-btn"
              onClick={handleFinishProject}
              disabled={!canAdvanceStage()}
            >
              Complete Project
            </button>
          )}
        </div>
        <div className="todo-list">
          <h4>Required Tasks</h4>
          {project.todos[stageKey].map((todo) => (
            <div key={todo.id} className="todo-item">
              <label className="todo-label">
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => handleTodoToggle(stageKey, todo.id)}
                />
                <span className="todo-text">{todo.task}</span>
              </label>
            </div>
          ))}
        </div>
      </div>
    );
  };

  if (!project) {
    return <div>Project not found</div>;
  }

  return (
    <div className="project-details-page">
      <button className="back-btn" onClick={() => navigate("/")}>
        ← Back to Dashboard
      </button>

      <div className="project-details-container">
        <div className="project-info-section">
          <div className="project-header">
            <h1>{project.projectName}</h1>
            {project.status === "Finished" && (
              <span className="status-badge finished">Finished</span>
            )}
          </div>

          <div className="project-content">
            <div className="project-image">
              <img src={project.mainImage} alt={project.projectName} />
            </div>

            <div className="project-details">
              <div className="detail-group">
                <h3>Contact Information</h3>
                <p>
                  <strong>Address:</strong> {project.address}
                </p>
                <p>
                  <strong>Phone:</strong> {project.phoneNumber}
                </p>
                <p>
                  <strong>Email:</strong> {project.emailAddress}
                </p>
              </div>
              <div className="detail-group">
                <h3>Project Details</h3>
                <p>
                  <strong>Type:</strong> {project.projectType}
                </p>
                <p>
                  <strong>Start Date:</strong> {project.stageHistory[0].date}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="project-stages-section">
          <div className="stages-header">
            <h2>Project Progress</h2>
            <div className="current-stage">
              Current Stage:{" "}
              <span className="stage-badge">{project.currentStage}</span>
            </div>
          </div>

          <div className="stages-navigation">
            {STAGE_CONFIG.map((stage) => (
              <button
                key={stage.key}
                className={`stage-tab 
                  ${stage.displayName === selectedStage ? "active" : ""} 
                  ${stage.displayName === project.currentStage ? "current" : ""}
                  ${
                    STAGE_CONFIG.findIndex(
                      (cfg) => cfg.displayName === stage.displayName
                    ) <
                    STAGE_CONFIG.findIndex(
                      (cfg) => cfg.displayName === project.currentStage
                    )
                      ? "completed"
                      : ""
                  }`}
                onClick={() => setSelectedStage(stage.displayName)}
              >
                {stage.displayName}
              </button>
            ))}
          </div>

          <div className="stage-content-container">
            {/* Render the current stage’s content if selectedStage is set */}
            {!!selectedStage && renderStageContent(selectedStage)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;
