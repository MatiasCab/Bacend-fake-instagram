import { Router } from "express";
import { createUser, getUsersPreview } from "../controllers/userController.js";
const userPreviewRouter = Router();

userPreviewRouter.get('/', getUsersPreview);

export default userPreviewRouter;