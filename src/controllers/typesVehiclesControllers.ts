import { Request, Response, NextFunction } from "express";
import { typeVehicleSchema } from "../validations/typeVehicleSchema";

export const typesVehiclesControllers = {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const {name} = typeVehicleSchema.parse(req.body);

      return res.status(201).json({ message: "user created!",  });
    } catch (error) {
      return next(error);
    }
  },

  async read(req: Request, res: Response, next: NextFunction) {
    try {

      return res.status(200).json();
    } catch (error) {
      return next(error);
    }
  },

  async readings(req: Request, res: Response, next: NextFunction) {
    try {

      return res.status(200).json({  });
    } catch (error) {
      return next(error);
    }
  },

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      return res.status(200).json({ message: "task updated!" });
    } catch (error) {
      return next(error);
    }
  },

  async delete(req: Request, res: Response, next: NextFunction) {
    try {

      return res.status(200).json({ message: "user deleted!", });
    } catch (error) {
      return next(error);
    }
  },
};
