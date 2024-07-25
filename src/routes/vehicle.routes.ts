import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddlewares";
import { vehicleControllers } from "../controllers/vehicleControllers";

export const vehicleRoutes = Router();
vehicleRoutes.use(authMiddleware);

vehicleRoutes.post("/vehicle", vehicleControllers.create);
vehicleRoutes.get("/vehicle", vehicleControllers.read);
vehicleRoutes.put("/vehicle/:id");
vehicleRoutes.delete("/vehicle/:id",vehicleControllers.delete);
