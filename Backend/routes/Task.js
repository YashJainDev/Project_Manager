import { Router } from "express";
import { validationResult } from 'express-validator';
import Task from "../models/Task.js";
import authenticateToken from "../middlewares/auth.js";
import mongoose from "mongoose";
import TaskValidator from "./validators/TaskRoutes.validators.js"
import TaskController from "../Controllers/taskController.js";

const taskRouter = Router();

taskRouter.post(
    '/save',
    authenticateToken,
    TaskValidator.saveValidator,
    TaskController.saveTask,
);


taskRouter.get(
    '/get',
    authenticateToken,
    TaskValidator.getvalidator,
    TaskController.getTask,
);

taskRouter.patch(
    '/update',
    authenticateToken,
    TaskValidator.updateValidator,
    TaskController.updatetask,    
);

taskRouter.delete(
    '/delete',
    authenticateToken,
    TaskValidator.deleteValidator,
    TaskController.deletTask,
);

export default taskRouter;

