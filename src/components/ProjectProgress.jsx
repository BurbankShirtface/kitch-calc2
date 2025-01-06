import React from "react";
import "./ProjectProgress.css";

const ProjectProgress = ({ todos }) => {
  const calculateProgress = () => {
    const allTodos = Object.values(todos).flat();
    const completedTodos = allTodos.filter((todo) => todo.completed);
    return Math.round((completedTodos.length / allTodos.length) * 100);
  };

  const progress = calculateProgress();

  return (
    <div className="project-progress">
      <div className="progress-bar">
        <div className="progress-fill" style={{ width: `${progress}%` }} />
      </div>
      <div className="progress-details">
        <span className="progress-percentage">{progress}%</span>
        <span className="progress-label">Complete</span>
      </div>
    </div>
  );
};

export default ProjectProgress;
