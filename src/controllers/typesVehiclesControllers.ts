import { Request, Response, NextFunction } from "express";
import { typeVehicleSchema } from "../validations/typeVehicleSchema";
import { typeVehicleService } from "../services/typeVehicleService";
import { typeVehicleRepository } from "../repositories/typeVehicleRepository";

export const typesVehiclesControllers = {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { name } = typeVehicleSchema.parse(req.body);

      const typeCreated = await typeVehicleService.create(
        name,
        typeVehicleRepository
      );

      return res.status(201).json({ message: "Type created!", typeCreated });
    } catch (error) {
      return next(error);
    }
  },

  async read(_req: Request, res: Response, next: NextFunction) {
    try {
      const types = await typeVehicleService.read(typeVehicleRepository);

      return res.status(201).json({ types });
    } catch (error) {
      return next(error);
    }
  },
};
