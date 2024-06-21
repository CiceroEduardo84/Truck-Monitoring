import { Request, Response, NextFunction } from "express";
import { userSchema } from "../validations/userSchema";
import { userServices } from "../services/userServices";
import { userRepository } from "../repositories/userRepository";

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
};
