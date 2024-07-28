import { Router } from "express";
import { authRoutes } from "./auth.routes";
import { userRoutes } from "./user.routes";
import { typeVehicleRoutes } from "./typeVehicle.routes";
import { vehicleRoutes } from "./vehicle.routes";
import { authMiddleware } from "../middlewares/authMiddlewares";

export const routers = Router();
routers.use(authRoutes);

routers.use(authMiddleware);
routers.use(userRoutes);
routers.use(typeVehicleRoutes);
routers.use(vehicleRoutes);
