const ProjectCard = ({ project, onClick }) => {
  const handleClick = () => {
    onClick(project.id);
  };

  // Calculate progress
  const calculateProgress = () => {
    const allTodos = Object.values(project.todos).flat();
    const completedTodos = allTodos.filter((todo) => todo.completed);
    return allTodos.length > 0
      ? Math.round((completedTodos.length / allTodos.length) * 100)
      : 0;
  };

  // Format phone number for display
  const formatPhone = (phone) => {
    return phone.replace(/[()]/g, "");
  };

  // Truncate email if too long
  const formatEmail = (email) => {
    return email.length > 20 ? email.substring(0, 17) + "..." : email;
  };

  // Format address to show only street
  const formatAddress = (address) => {
    return address.split(",")[0];
  };

  return (
    <div
      className={`project-card ${
        project.status === "Finished" ? "finished" : ""
      }`}
      onClick={handleClick}
    >
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
          <div className="detail-item">
            <i className="fas fa-map-marker-alt"></i>
            {formatAddress(project.address)}
          </div>
          <div className="detail-item">
            <i className="fas fa-phone"></i>
            {formatPhone(project.phoneNumber)}
          </div>
          <div className="detail-item">
            <i className="fas fa-envelope"></i>
            {formatEmail(project.emailAddress)}
          </div>
        </div>

        <div className="project-progress">
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{ width: `${calculateProgress()}%` }}
            ></div>
          </div>
          <span className="progress-text">{calculateProgress()}% Complete</span>
        </div>

        <div className="project-footer-container">
          <div className="project-footer">
            <span className="project-type">{project.projectType}</span>
            <button className="view-project-btn">View Project</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
