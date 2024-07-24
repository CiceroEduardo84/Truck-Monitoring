import { NextFunction, Request, Response } from "express";
import { vehicleSchema } from "../validations/vehicleSchema";
import { vehicleService } from "../services/vehicleService";
import { VehicleRepository } from "../repositories/vehicleRepository";
import { UUIDSchema } from "../validations/UUIDSchema";
import { vehiclePaginationSchema } from "../validations/vehiclePaginationSchema";

export const vehicleControllers = {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { plate, type, nameDriver, status } = vehicleSchema.parse(req.body);
      const { id } = UUIDSchema("user").parse({ id: req.userID });

      const vehicleCreated = await vehicleService.create(
        { plate, type, nameDriver, status, id_user: id },
        VehicleRepository
      );

      return res
        .status(201)
        .json({ message: "Vehicle created!", vehicleCreated });
    } catch (error) {
      return next(error);
    }
  },
  async read(req: Request, res: Response, next: NextFunction) {
    try {
      const { limit, offset, filter } = vehiclePaginationSchema.parse(
        req.query
      );

      const vehicles = await vehicleService.read(
        {
          limit,
          offset,
          filter,
        },
        VehicleRepository
      );

      return res.status(200).json({ vehicles });
    } catch (error) {
      return next(error);
    }
  },
};
