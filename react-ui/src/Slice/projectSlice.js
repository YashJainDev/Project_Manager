import { createApi,fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseProjectURl = (import.meta.env.VITE_APP_BASE_URL).concat("/app/project");
export const projectAPI = createApi({
    reducerPath: "projectApi",
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
    tagTypes:["Projects"],
    endpoints: (builder) => ({
        getProjects: builder.query({
            query: ({ title = "", status = "", page=1, limit=5 } = {}) => {
                let queryParams = new URLSearchParams();
                if (title) queryParams.append("title", title)
                if (status) queryParams.append("status", status)
                queryParams.append("page", page);
                queryParams.append("limit", limit);
                return {
                    url: `/get?${queryParams.toString()}`,
                    method: "GET"
                }
            },
            providesTags:["Projects"]
        }),
        getProjectById: builder.query({
            query: ({ project_id = ""} = {}) => {
                let queryParams = new URLSearchParams();
                if (project_id) queryParams.append("project_id", project_id)
                return {
                    url: `/getProjectById?${queryParams.toString()}`,
                    method: "GET"
                }
            },
            providesTags:["Projects"]
        }),
        saveProject: builder.mutation({
            query: ({ title = "", description = "", status = "active", createdOn = ""} = {}) => {
                return {
                    url: `/save`,
                    method: "POST",
                    body : {
                        title : title,
                        description : description,
                        status : status,
                    }
                }
            },
            invalidatesTags:["Projects"]
        }),
        deleteProject: builder.mutation({
            query: ({project_id = ""} = {}) =>{
                return{
                    url:"/delete",
                    method:"DELETE",
                    body:{
                        project_id : project_id
                    }
                }
            },
            invalidatesTags:["Projects"]
        }),
        updateProject: builder.mutation({
            query: ({project_id = "", title = "", description = "", status = ""} = {}) =>{
                const updateValues = {};
                updateValues.project_id = project_id;
                if (title) updateValues.title = title;
                if (description) updateValues.description = description;
                if (status) updateValues.status = status;
                return{
                    url:"/update",
                    method:"PATCH",
                    body:updateValues
                }
            },
            invalidatesTags:["Projects"]
        })
    }),
});

export const { useGetProjectsQuery,useGetProjectByIdQuery, useSaveProjectMutation, useDeleteProjectMutation, useUpdateProjectMutation } = projectAPI;
