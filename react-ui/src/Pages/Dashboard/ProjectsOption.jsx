import { useToastMutation } from "../../hooks/useToastMutation";
import { useDeleteProjectMutation } from "../../Slice/projectSlice";
import DropdownMenu from "../../components/cardComponents/DropdownMenu";
import { SlOptionsVertical } from "react-icons/sl";


export function ProjectsOption({ projectID}) {
    const [deleteProject] = useDeleteProjectMutation();
    const deleteWithToast = useToastMutation(deleteProject, {
        loadingMessage: "Deleting project...",
        successMessage: "Project deleted successfully!",
        errorMessage: "Failed to delete project."
    });

    const handleDelete = async () => {
        await deleteWithToast({ project_id: projectID });
    };

    return (
        <DropdownMenu button={<SlOptionsVertical className="cursor-pointer" />}>
            <ul className="menu">
                <li><button className=" hover:bg-base-300" onClick={() => console.log(projectID)}>Update</button></li>
                <li><button className=" hover:bg-base-300" onClick={handleDelete}>Delete</button></li>
                <li><button className=" hover:bg-base-300" onClick={() => console.log(projectID)}>Completed</button></li>
            </ul>
        </DropdownMenu>
    )
}
