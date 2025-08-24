import { useGetProjectsQuery } from '../../Slice/projectSlice';
import {ProgressCard} from "../../components/cardComponents/ProgressCard"
import { CreateCard } from '../../components/cardComponents/CreateCard';
import { ProjectTable } from './ProjectTable';
import { useEffect, useState } from 'react';


export default function Dashboard() {

    const [projectTitle,setProjectTitle] = useState("");
    const [projectStatus,setProjectStatus] = useState("");
    const [debouncedTitle, setDebouncedTitle] = useState(projectTitle);
    const [debouncedStatus, setDebouncedStatus] = useState(projectStatus);
    
    // Debounce Effect
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedTitle(projectTitle);
            setDebouncedStatus(projectStatus);
        }, 500); // 500ms debounce

        return () => clearTimeout(handler);
    }, [projectTitle, projectStatus]);
    
    const { data, isError, isLoading } = useGetProjectsQuery({
        title  : debouncedTitle,
        status : debouncedStatus
    });
    const projects = data?.data.projects ?? [];
    
    return (
        <>
            <div className='bg-base-200 p-4 z-10'>
                <h1 className="text-4xl font-bold">Dashboard</h1>
            </div>
            <div className="p-6 bg-base-200 min-h-screen space-y-6">
                <div className="grid grid-cols-12 gap-6">
                    <CreateCard type={"Project"} project_id={""}/>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <ProjectTable projects={projects} isLoading={isLoading} isError={isError} projectTitle={projectTitle} setProjectTitle={setProjectTitle} projectStatus={projectStatus} setProjectStatus={setProjectStatus}/>
                    <ProgressCard
                        items={projects}
                        title="Project Progress"
                        statusOptions={[
                            { label: "Completed", value: "completed", color: "text-success" },
                            { label: "In Progress", value: "active", color: "text-warning" }
                        ]}
                    />
                </div>
            </div>

        </>
    );
}
  