import { Request, Response, NextFunction } from "express";
import { userSchema } from "../validations/userSchema";
import { userServices } from "../services/userServices";
import { userRepository } from "../repositories/userRepository";
import { UUIDSchema } from "../validations/UUIDSchema";

export const userControllers = {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, email, password, type } = userSchema.parse(req.body);

      const userCreated = await userServices.create(
        { name, email, password, type },
        userRepository
      );

      return res.status(201).json({ message: "user created!", userCreated });
    } catch (error) {
      return next(error);
    }
  },

  async read(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = UUIDSchema("user").parse({ id: req.userID });

      const userData = await userServices.read(id, userRepository);

      return res.status(200).json(userData);
    } catch (error) {
      return next(error);
    }
  },

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = UUIDSchema("user").parse(req.params);
      const { email, name, password, type } = userSchema.parse(req.body);

      const userUpdated = await userServices.update(
        { id, name, email, password, type },
        userRepository
      );

      return res.status(200).json({ message: "task updated!", userUpdated });
    } catch (error) {
      return next(error);
    }
  },
};
