import { createContext, useContext, useReducer, useEffect } from "react";

const ProjectContext = createContext();

const initialState = {
  projects: [],
  loading: false,
  error: null,
  filters: {
    search: "",
    status: "all",
    dateRange: null,
    projectType: "all",
  },
  sortBy: {
    field: "projectName",
    direction: "asc",
  },
};

function projectReducer(state, action) {
  switch (action.type) {
    case "SET_PROJECTS":
      return { ...state, projects: action.payload };
    case "SET_FILTERS":
      return { ...state, filters: { ...state.filters, ...action.payload } };
    case "SET_SORT":
      return { ...state, sortBy: action.payload };
    default:
      return state;
  }
}

export function ProjectProvider({ children }) {
  const [state, dispatch] = useReducer(projectReducer, initialState);

  // Load from localStorage on mount
  useEffect(() => {
    const savedProjects = localStorage.getItem("projects");
    if (savedProjects) {
      dispatch({ type: "SET_PROJECTS", payload: JSON.parse(savedProjects) });
    }
  }, []);

  // Save to localStorage on changes
  useEffect(() => {
    localStorage.setItem("projects", JSON.stringify(state.projects));
  }, [state.projects]);

  return (
    <ProjectContext.Provider value={{ state, dispatch }}>
      {children}
    </ProjectContext.Provider>
  );
}

export const useProjects = () => useContext(ProjectContext);
