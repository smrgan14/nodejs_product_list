import userController from '../Controller/UserController';
import express from 'express';
import protectMiddleware from '../Middleware/ProtectRoutesMiddleware';

const userRouter = express.Router();

userRouter.post('/register', userController.createUser);
userRouter.post('/login', userController.logIn);
userRouter.patch('/change/password', protectMiddleware.protectMiddleware, userController.setUserPassword);

export default userRouter;
