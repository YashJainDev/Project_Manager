import AsyncHandler from "express-async-handler";
import Project from "../models/Project.js";
import { validationResult } from "express-validator";
import ValidationError from "../Error/ValidationError.js";
import ApiResponse from "./ApiResponse/index.js"
import paginate from "../utils/pagination.js";

const saveProject = AsyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
        throw new ValidationError("Validation Error",errors.array());
    const { title, description } = req.body;
    const user_id = req.user._id;
    const newProject = new Project({ title, description, status: 'active', createdBy: user_id })
    await newProject.save();
    ApiResponse(res,201,"Project Created Succesfully", {project_id : newProject._id});
});

const getProjectById = AsyncHandler(async (req, res) => {
    const { project_id } = req.query;
    let project = await Project.find({ _id: project_id });
    ApiResponse(res,200,true,"Succesfull",{project : project});
})

const getProjects = AsyncHandler(async (req,res) => {
    const { title, status, page = 1, limit = 5 } = req.query;
    const filters = { createdBy: req.user._id, };
    if (title)  filters.title = { $regex: title, $options: "i" };            // i for case-insensitive
    if (status) filters.status = status;
    
    const query = Project.find(filters);
    const projects = await paginate(query,Number(page),Number(limit));
    const total = await Project.countDocuments(filters);
    ApiResponse(res,200,true,"Projects Fetched Succesfully",{
        projects,
        pagination:{
            total,
            page: Number(page),
            limit: Number(limit),
            totalPages: Math.ceil(total / limit)
        }
    })
});

const updateProject = AsyncHandler(async (req,res) =>{
    const errors = validationResult(req);
    if (!errors.isEmpty())
        throw new ValidationError("Validation Error",errors.array());
    const { project_id,title, description,status } = req.body;
    let update = {};
    const options = {
        returnDocument:'after'              // return the document after the update was applied.
    }
    if (title)
        update.title = title;
    if (description)
        update.description = description;
    if (status)
        update.status = status;
    await Project.findByIdAndUpdate(project_id,update,options)
    ApiResponse(res,204,true,"Project Updated Succesfully");
});

const deleteProject = AsyncHandler(async (req,res) =>{
    const errors = validationResult(req);
    if (!errors.isEmpty())
        throw new ValidationError("Validation Error",errors.array());
    const { project_id } = req.body;
    await Project.findByIdAndDelete(project_id);
    ApiResponse(res,204,true,"Project Deleted Succesfully");
})

export default {
    saveProject,
    getProjectById,
    getProjects,
    updateProject,
    deleteProject,
}