import { Router } from "express";
import ProjectController from "../Controllers/projectController.js";
import ProjectValidator from "./validators/ProjectRoutes.validators.js";

const projectRouter = Router();

projectRouter.post(
    '/save',
    ProjectValidator.saveValidator,
    ProjectController.saveProject, 
)

// For Fetching Single Project by using Project_ID
projectRouter.get(
    '/getProjectById',
    ProjectValidator.getValidatorById,
    ProjectController.getProjectById,
)

// For Fetching all Projects created by single User
projectRouter.get(
    '/get',
    ProjectValidator.getValidator,
    ProjectController.getProjects
);

projectRouter.patch(
    '/update',
    ProjectValidator.updatValidator,
    ProjectController.updateProject
)

projectRouter.delete(
    '/delete',
    ProjectValidator.deleValidator,
    ProjectController.deleteProject
)

export default projectRouter;

