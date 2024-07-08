import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddlewares";
import { isAdminMiddleware } from "../middlewares/isAdminMiddleware";
import { typesVehiclesControllers } from "../controllers/typesVehiclesControllers";

export const typeVehicleRoutes = Router();

typeVehicleRoutes.use(authMiddleware);
// typeVehicleRoutes.get("/typevehicles", typesVehiclesControllers.read);

typeVehicleRoutes.use(isAdminMiddleware);
typeVehicleRoutes.post("/typevehicles", typesVehiclesControllers.create);
// typeVehicleRoutes.put("/typevehicles/:id", typesVehiclesControllers.update);
// typeVehicleRoutes.delete("/typevehicles/:id", typesVehiclesControllers.delete);
