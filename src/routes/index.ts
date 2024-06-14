import { Router } from "express";
import { authRoutes } from "./auth.routes";

export const routers = Router();

routers.use(authRoutes);
