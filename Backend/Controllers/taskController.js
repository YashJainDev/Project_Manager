import AsyncHandler from "express-async-handler";
import Task from "../models/Task.js";
import { validationResult } from "express-validator";
import mongoose from "mongoose";
import ApiResponse from "./ApiResponse/index.js";
import ValidationError from "../Error/ValidationError.js"

const saveTask = AsyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
        throw new ValidationError("Validation Error",errors.array());
    const { title, description,project_id, deadline } = req.body;
    const formateDate = new Date(deadline).toLocaleDateString("en-GB");
    const newTask = new Task({ title, description, status:'todo', project_id, deadline:formateDate })
    await newTask.save();
    ApiResponse(res,201,true,"Task Created Succesfully",null);
});

const getTask = AsyncHandler(async(req,res)=>{
    const { title, status, project_id } = req.query;
    const filters = {
        project_id: new mongoose.Types.ObjectId(project_id),
    };

    if (title) 
    filters.title = { $regex: title, $options: "i" };            // i for case-insensitive

    if (status)
    filters.status = status;
    let tasks = await Task.find(filters);
    ApiResponse(res,200,true,"Succesfull",{tasks : tasks});
});

const updatetask = AsyncHandler(async(req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty())
        throw new ValidationError("Validation Error",errors.array());
    const { task_id,title,description,status,deadline } = req.body;
    let update = {};
    if (title)
        update.title = title;
    if (description)
        update.description = description;
    if (status)
        update.status = status;
    if (deadline)
        update.deadline = deadline;
    await Task.findByIdAndUpdate(task_id,update)
    ApiResponse(res,204,true,"Task Updated Succesfully");
});

const deletTask = AsyncHandler(async(req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty())
        throw new ValidationError("Validation Error",errors.array());
    const { task_id } = req.body;
    await Task.findByIdAndDelete(task_id);
    ApiResponse(res,204,true,"Task Deleted Succesfully");
});

export default {
    saveTask,
    updatetask,
    getTask,
    deletTask,
}