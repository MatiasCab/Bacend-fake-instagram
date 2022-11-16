import { Router } from "express";
import { createUser, getUserById } from "../controllers/userController.js";
const userRouter = Router();

userRouter.post('/', createUser);

userRouter.get('/:username', getUserById);

export default userRouter;