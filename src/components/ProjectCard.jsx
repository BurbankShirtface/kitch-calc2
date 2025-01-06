const ProjectCard = ({ project, onDelete, onClick }) => {
  const handleClick = (e) => {
    // Prevent clicking the card when clicking the delete button
    if (e.target.closest(".delete-btn")) return;
    onClick(project.id);
  };

  return (
    <div
      className={`project-card ${
        project.status === "Finished" ? "finished" : ""
      }`}
      onClick={handleClick}
    >
      <button
        className="delete-btn"
        onClick={(e) => {
          e.stopPropagation();
          onDelete(project.id);
        }}
      >
        ×
      </button>

      <div className="project-image">
        <img src={project.mainImage} alt={project.projectName} />
      </div>

      <div className="project-content">
        <div className="project-header">
          <h3 className="project-name">{project.projectName}</h3>
          <span className="project-stage">
            {project.status === "Finished" ? "Finished" : project.currentStage}
          </span>
        </div>

        <div className="project-details">
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

        <div className="project-footer">
          <span className="project-type">{project.projectType}</span>
          <button className="view-project-btn">View Project</button>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
