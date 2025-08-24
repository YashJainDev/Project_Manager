import { ProjectsOption } from "./ProjectsOption";
import { useNavigate } from "react-router-dom";

export function ProjectTable({
  projects,
  isLoading,
  setProjectTitle,
  projectTitle,
  projectStatus,
  setProjectStatus,
  isError
}) {
  const navigate = useNavigate();
  
  const navigateProject = (project) => {
    navigate(`/project?id=${project._id}`, { state: project });
  }


  if (isLoading) return(
    <div className="col-span-2 skeleton card shadow-md h-64 w-min-h flex justify-center items-center">
      <span className="loading loading-dots loading-xl h-10 w-10"></span>
    </div>
  )
  if (isError) return <div className="col-span-2 card bg-base-100 shadow-md flex justify-center items-center">Failed to load projects</div>;

  return (
    <div className="col-span-2 card bg-base-100 shadow-md ">
      <div className="card-body">
        <div className="flex justify-between items-center mb-4">
          <label className="input">
            <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <g
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2.5"
                fill="none"
                stroke="currentColor"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.3-4.3"></path>
              </g>
            </svg>
            <input type="search" className="grow" placeholder="Search" value={projectTitle} onChange={(e)=>{setProjectTitle(e.target.value)}}/>
          </label>
          <div className="flex gap-2">
            <select
              className="select w-auto select-sm select-primary"
              onChange={(e) => setSortCriteria({
                ...sortCriteria,
                date : e.target.value
              })}
            >
              <option value="ascending">Created On ↑</option>
              <option value="descending">created On ↓</option>
            </select>
            <select
              className="select select-sm select-primary"
              onChange={(e)=> setProjectStatus(e.target.value)}
              value={projectStatus}
            >
              <option value="">All</option>
              <option value="completed">Completed</option>
              <option value="active">Active</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="table table-sm">
            <thead>
              <tr key="table-column-key">
                <th>Name</th>
                <th>Created on</th>
                <th>Status</th>
              </tr>
            </thead>
              <tbody>
            {projects.map((project,index) => (
                <tr key={project._id} className="hover:bg-base-300 cursor-pointer" onClick={()=>{navigateProject(project)}}>
                  <td>{index + 1}</td>
                  <td className="font-bold">{project.title}</td>
                  <td>{new Date(project.createdAt).toLocaleDateString(undefined, {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                    })}</td>
                  <td>
                    <span
                      className={`badge ${project.status === "active"
                          ? "badge-warning"
                          : "badge-success"
                        }`}
                    >
                      {project.status}
                    </span>
                  </td>
                  <td onClick={(e)=>{e.stopPropagation();}}>
                    <ProjectsOption projectID={project._id} />
                  </td>

                </tr>
            ))}
              </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
