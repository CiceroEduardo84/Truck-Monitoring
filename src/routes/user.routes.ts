import { Router } from "express";
import { userControllers } from "../controllers/userControllers";
import { authMiddleware } from "../middlewares/authMiddlewares";
import { isAdminMiddleware } from "../middlewares/isAdminMiddleware";

export const userRoutes = Router();

userRoutes.use(authMiddleware);
userRoutes.get("/user", userControllers.read);
userRoutes.post("/user", isAdminMiddleware, userControllers.create);
