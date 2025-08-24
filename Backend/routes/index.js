import { Router } from "express";
import userRouter from './User.js';
import projectRouter from './Project.js';
import taskRouter from './Task.js';
import authenticateToken from "../middlewares/auth.js";

const router = Router();

router.use('/user',userRouter);
router.use('/project',authenticateToken,projectRouter);
router.use('/task',authenticateToken,taskRouter);

export default router; 