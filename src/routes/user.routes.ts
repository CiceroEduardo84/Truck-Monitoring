import { Router } from "express";
import { userControllers } from "../controllers/userControllers";
import { isAdminMiddleware } from "../middlewares/isAdminMiddleware";

export const userRoutes = Router();
userRoutes.get("/user", userControllers.read);

userRoutes.post("/user", isAdminMiddleware, userControllers.create);
userRoutes.get("/users", isAdminMiddleware, userControllers.readings);
userRoutes.put("/user/:id", isAdminMiddleware, userControllers.update);
userRoutes.delete("/user/:id", isAdminMiddleware, userControllers.delete);
