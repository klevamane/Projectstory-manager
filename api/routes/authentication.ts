import { Router } from 'express';
import AuthController from '../controller/authentication';


const authController = new AuthController();
const authRouter = Router();
authRouter.post('/login', authController.login);
authRouter.post('/signup', authController.registerUser);

export default authRouter;
