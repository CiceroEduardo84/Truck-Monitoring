import { Router } from "express";
import { vehicleControllers } from "../controllers/vehicleControllers";
import { isAdminMiddleware } from "../middlewares/isAdminMiddleware";
import { isPorterMiddleware } from "../middlewares/isPorterMiddleware";
import { checkStatusMiddleware } from "../middlewares/checkStatusMiddleware";

export const vehicleRoutes = Router();
vehicleRoutes.post("/vehicle", isPorterMiddleware, checkStatusMiddleware, vehicleControllers.create);
vehicleRoutes.get("/vehicle", vehicleControllers.read);
vehicleRoutes.put("/vehicle/:id",checkStatusMiddleware, vehicleControllers.update);

vehicleRoutes.delete("/vehicle/:id", isAdminMiddleware, vehicleControllers.delete);
