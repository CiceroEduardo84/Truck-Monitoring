import { Router } from "express";
import { vehicleControllers } from "../controllers/vehicleControllers";
import { isAdminMiddleware } from "../middlewares/isAdminMiddleware";
import { isPorterMiddleware } from "../middlewares/isPorterMiddleware";

export const vehicleRoutes = Router();
vehicleRoutes.post("/vehicle", isPorterMiddleware, vehicleControllers.create);
vehicleRoutes.get("/vehicle", vehicleControllers.read);
vehicleRoutes.put("/vehicle/:id", vehicleControllers.update);

vehicleRoutes.delete("/vehicle/:id", isAdminMiddleware, vehicleControllers.delete);
