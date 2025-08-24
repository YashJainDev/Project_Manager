import { SlOptionsVertical } from "react-icons/sl";
import DropdownMenu from "../../components/cardComponents/DropdownMenu";
import { useDeleteTaskMutation } from "../../Slice/taskSlice";
import { useToastMutation } from "../../hooks/useToastMutation";

export function TaskTableOptions({ task_id }){

    const [deleteTask, {}] = useDeleteTaskMutation();
    const deleteWithToast = useToastMutation(deleteTask,{
        loadingMessage: "Deleting project...",
        successMessage: "Project deleted successfully!",
        errorMessage: "Failed to delete project."
    });

    const handleDelete = async()=>{
        await deleteWithToast({task_id:task_id});
    }

    return (
        <DropdownMenu button={<SlOptionsVertical className="cursor-pointer" />}>
            <ul className="menu">
                <li><button className=" hover:bg-base-300" onClick={() => console.log()}>Update</button></li>
                <li><button className=" hover:bg-base-300" onClick={handleDelete}>Delete</button></li>
                <li><button className=" hover:bg-base-300" onClick={() => console.log()}>Done</button></li>
            </ul>
        </DropdownMenu>
    );
}