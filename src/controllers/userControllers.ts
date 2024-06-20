import { Request, Response, NextFunction } from "express";
import { userSchema } from "../validations/userSchema";

export const userControllers = {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, email, password, type } = userSchema.parse(req.body);

      const userCreated = await userServices.create(
        { name, email, password },
        userRepository
      );

      return res.status(201).json({ message: "user created!", userCreated });
    } catch (error) {
      return next(error);
    }
  },
};
