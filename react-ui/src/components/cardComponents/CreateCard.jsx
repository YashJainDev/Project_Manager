import { FormModal } from '../../components/cardComponents/FormModal';
import { useToastMutation } from '../../hooks/useToastMutation';
import { useSaveProjectMutation } from '../../Slice/projectSlice';
import { useState } from 'react';
import { useSaveTasksMutation } from '../../Slice/taskSlice';

export function CreateCard({ 
    type,
    project_id
 }) {

    const [ saveProject ] = useSaveProjectMutation();
    const [ saveTask ] = useSaveTasksMutation();
    const [ title,setTitle ] = useState("");
    const [ description,setDescription ] = useState("");
    const saveTaskWithToast = useToastMutation(saveTask, {
        loadingMessage: "Saving task...",
        successMessage: "Task Saved successfully!",
        errorMessage: "Failed to Save task."
    });
    const saveProjectWithToast = useToastMutation(saveProject, {
        loadingMessage: "Saving project...",
        successMessage: "Project Saved successfully!",
        errorMessage: "Failed to Save project."
    });
    const handleForm = async(deadline="")=>{
        if (type === "Task"){
            await saveTaskWithToast({
                title:title,
                description:description,
                project_id:project_id,
                deadline:deadline
            });
        }else{
            await saveProjectWithToast({
                title:title,
                description:description,
            });
        }
    }

    return (
        <div className="card bg-base-100 shadow-md col-span-2 h-40 flex items-center justify-center">
            <div className="text-center">
                <div className="bg-purple-100 p-3 rounded-full mx-auto mb-2 cursor-pointer btn" onClick={()=>document.getElementById('my_modal_2').showModal()}>
                    ➕
                </div>
                <dialog id="my_modal_2" className="modal">
                    <FormModal  title={title} setTitle={setTitle} description={description} setDescription={setDescription} handleForm={handleForm} type={type} />
                </dialog>
                <h2 className="text-sm font-bold">Create {type}</h2>
            </div>
        </div>
    )
}
  