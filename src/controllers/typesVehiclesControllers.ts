import { Request, Response, NextFunction } from "express";
import { typeVehicleSchema } from "../validations/typeVehicleSchema";
import { typeVehicleService } from "../services/typeVehicleService";
import { typeVehicleRepository } from "../repositories/typeVehicleRepository";
import { UUIDSchema } from "../validations/UUIDSchema";

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

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = UUIDSchema("typeVehicle").parse(req.params);
      const { name } = typeVehicleSchema.parse(req.body);

      const typeUpdated = await typeVehicleService.update(
        { id, name },
        typeVehicleRepository
      );

      return res.status(201).json({ message: "Type updated!", typeUpdated });
    } catch (error) {
      return next(error);
    }
  },

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = UUIDSchema("typeVehicle").parse(req.params);

      const typeDeleted = await typeVehicleService.delete(
        id,
        typeVehicleRepository
      );

      return res.status(200).json({ message: "type deleted!", typeDeleted });
    } catch (error) {
      return next(error);
    }
  },
};
