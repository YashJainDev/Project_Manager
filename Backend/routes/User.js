import { Router,} from 'express';
import AuthController from '../Controllers/userController.js';
import authenticateToken from '../middlewares/auth.js';
import AuthValidators from './validators/UserRoutes.validators.js';

const userRouter = Router();

userRouter.post(
    '/register',
    AuthValidators.registerValidator,
    AuthController.registerUser,
);

userRouter.post(
    '/login',
    AuthValidators.registerValidator,
    AuthController.loginUser,
);

userRouter.get(
    '/auth',
    authenticateToken,
    AuthController.authUser,
);



export default userRouter;