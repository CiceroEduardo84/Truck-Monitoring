import { Router } from "express";
import { userControllers } from "../controllers/userControllers";
import { authMiddleware } from "../middlewares/authMiddlewares";

export const userRoutes = Router();

userRoutes.use(authMiddleware);
userRoutes.post("/user", userControllers.create);
userRoutes.get("/user", userControllers.read);
