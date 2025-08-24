import { useMemo, useState } from "react";
import { FilterList } from "../../utils/FilterHelpers";
import { TaskTableOptions } from "./TaskTableOptions";

export function TaskTable({
    tasks,
    isLoading,
    isError
}) {

    const [ sortCriteria,setSortCriteria ] = useState("all");
    const statusColor = {
        todo : "badge badge-info",
        "in-progress" : "badge badge-warning",
        done : "badge badge-success"
    }

    const handleSortChange = (e)=>{
        setSortCriteria(e.target.value);
    }

    const filterTask = useMemo(()=>{
        return FilterList(tasks,sortCriteria);
    },[tasks,sortCriteria]);

    if (isLoading) return(
        <div className="col-span-2 skeleton card shadow-md h-auto w-min-h flex justify-center items-center">
            <span className="loading loading-bars loading-xl "></span>
        </div>
    )

    if (isError) return (
        <div className="col-span-2 skeleton card shadow-md h-64 w-min-h flex justify-center items-center">
            <p className="loading loading-bars loading-xl ">
                Failed to Load task Please refresh the page
            </p>
        </div>
    )

    return (
        <div className="col-span-2 card bg-base-100 shadow-md ">
            <div className="card-body">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold">Task Summary</h2>
                    <div className="flex gap-2">
                        <select className="select select-sm select-primary" onChange={handleSortChange} value={sortCriteria}>
                            <option value="all">All</option>
                            <option value="todo">Todo</option>
                            <option value="in-progress">In-Progerss</option>
                            <option value="done">Done</option>
                        </select>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="table table-sm">
                        <thead>
                            <tr key="table-column-key">
                                <th></th>
                                <th>Title</th>
                                <th>Description</th>
                                <th>Status</th>
                                <th>Deadline</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filterTask.map((task,index) => <tr key={task._id} className="hover:bg-base-300 cursor-pointer">
                                <td>{index + 1}</td>
                                <td className="font-bold">{task.title}</td>
                                <td className="truncate">{task.description ? task.description : "~No Description Provided~"}</td>
                                <td>
                                    <span className={statusColor[task.status]}>
                                        {task.status}
                                    </span>
                                </td>
                                <td>
                                    {new Date(task.deadline).toLocaleDateString(undefined, {
                                        year: "numeric",
                                        month: "long",
                                        day: "numeric",
                                    })}
                                </td>
                                <td onClick={e => {
                                    e.stopPropagation();
                                }}>
                                <TaskTableOptions task_id={task._id}/>
                                </td>

                            </tr>)}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
};
  