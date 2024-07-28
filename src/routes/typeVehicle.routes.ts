import { Router } from "express";
import { isAdminMiddleware } from "../middlewares/isAdminMiddleware";
import { typesVehiclesControllers } from "../controllers/typesVehiclesControllers";

export const typeVehicleRoutes = Router();
typeVehicleRoutes.get("/typevehicles", typesVehiclesControllers.read);

typeVehicleRoutes.post("/typevehicles", isAdminMiddleware, typesVehiclesControllers.create);
typeVehicleRoutes.put("/typevehicles/:id", isAdminMiddleware, typesVehiclesControllers.update);
typeVehicleRoutes.delete("/typevehicles/:id", isAdminMiddleware, typesVehiclesControllers.delete);
