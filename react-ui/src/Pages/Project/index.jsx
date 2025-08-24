import { TaskTable } from './TaskTable';
import { useLocation, useSearchParams } from "react-router-dom";
import { useGetTasksQuery } from "../../Slice/taskSlice";
import { useGetProjectByIdQuery } from "../../Slice/projectSlice";
import { ProgressCard } from '../../components/cardComponents/ProgressCard';
import { CreateCard } from '../../components/cardComponents/CreateCard';

export default function Project(){

    const { state: projectFromState } = useLocation();
    const [searchParams] = useSearchParams();
    const project_id = searchParams.get("id");
    const { data,isLoading,isError } = useGetProjectByIdQuery({
            project_id:project_id,
            skip: !!projectFromState
        });
    const projectFromApi = data?.data[0] || {};
    const project = projectFromState ?? projectFromApi;
    const { data:task_data } = useGetTasksQuery({project_id : project_id});
    const tasks = task_data?.data.tasks ?? [];

    return (
        <div className="p-6 bg-base-200 min-h-screen">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">{project.title}</h1>
                <span
                    className={`badge text-sm ${project.status === "active" ? "badge-warning" : "badge-success"
                        }`}
                >
                    {project.status}
                </span>
            </div>

            <div className="mb-4">
                <p className="text-sm text-gray-600">
                    Created on{" "}
                    {new Date(project.createdAt).toLocaleDateString(undefined, {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                    })}
                </p>
            </div>

            <div className="mb-6">
                <h2 className="text-lg font-semibold mb-2">Description</h2>
                <p className="text-gray-700 whitespace-pre-line">
                    {project.description || "No description provided."}
                </p>
            </div>
            <div className="grid grid-cols-12 gap-6 py-5">
                <CreateCard type={"Task"} project_id={project_id}/>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <TaskTable tasks={tasks} loading={isLoading} isError={isError} />
                <ProgressCard
                    items={tasks}
                    title="Task Progress"
                    loading={isLoading} 
                    isError={isError}
                    statusOptions={[
                        { label: "Done", value: "done", color: "text-success" },
                        { label: "In Progress", value: "in-progress", color: "text-warning" },
                        { label: "Todo", value: "todo", color: "text-info" }
                    ]}
                    />
            </div>
        </div>
    )
}