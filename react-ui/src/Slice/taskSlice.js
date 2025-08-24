import { createApi,fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseProjectURl = (import.meta.env.VITE_APP_BASE_URL).concat("/app/task");
export const taskAPI = createApi({
    reducerPath: "taskApi",
    baseQuery: fetchBaseQuery({ 
        baseUrl: baseProjectURl,
        prepareHeaders: (headers, { getState }) => {
            const token = getState().auth.token;
            if (token) {
                headers.set("authorization", `Bearer ${token}`);
                return headers;
            }
            throw new Error("Could not find auth token");
        }
    }),
    tagTypes:["Tasks"],
    endpoints: (builder) => ({
        getTasks: builder.query({
            query: ({ project_id = "", title = "", status = "" } = {}) => {
                let queryParams = new URLSearchParams();
                if (project_id) queryParams.append("project_id", project_id)
                if (title) queryParams.append("title", title)
                if (status) queryParams.append("status", status)
                return {
                    url: `/get?${queryParams.toString()}`,
                    method: "GET"
                }
            },
            providesTags:["Tasks"]
        }),
        saveTasks: builder.mutation({
            query: ({ project_id = "", title = "", description = "", status = "todo", deadline = ""} = {}) => {
                return {
                    url: `/save`,
                    method: "POST",
                    body : {
                        title : title,
                        description : description,
                        status : status,
                        deadline : deadline,
                        project_id : project_id
                    }
                }
            },
            invalidatesTags:["Tasks"]
        }),
        deleteTask: builder.mutation({
            query: ({task_id = ""} = {}) =>{
                return{
                    url:"/delete",
                    method:"DELETE",
                    body:{
                        task_id : task_id
                    }
                }
            },
            invalidatesTags:["Tasks"]
        }),
        updateTask: builder.mutation({
            query: ({task_id = "", title = "", description = "", status = "", deadline = ""} = {}) =>{
                const updateValues = {
                    task_id : task_id,
                    title : title,
                    description : description,
                    status : status,
                    deadline : deadline
                };
                updateValues.task_id = task_id;
                return{
                    url:"/update",
                    method:"PATCH",
                    body:updateValues
                }
            },
            invalidatesTags:["Tasks"]
        })
    }),
});

export const { useGetTasksQuery,useSaveTasksMutation,useUpdateTaskMutation,useDeleteTaskMutation } = taskAPI;