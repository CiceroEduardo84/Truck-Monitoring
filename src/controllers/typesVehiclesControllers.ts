import { Request, Response, NextFunction, response } from "express";
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
};
