import { Router } from "express";
import { authRoutes } from "./auth.routes";
import { userRoutes } from "./user.routes";
import { typeVehicleRoutes } from "./typeVehicle.routes";
import { vehicleRoutes } from "./vehicle.routes";

export const routers = Router();

routers.use(authRoutes);
routers.use(userRoutes);
routers.use(typeVehicleRoutes);
routers.use(vehicleRoutes);
