import { Request, Response, NextFunction } from "express";
import { loginSchema } from "../validations/loginSchema";

export const authControllers = {
  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = loginSchema.parse(req.body);
      console.log(email, password);

      const { token, id } = await authServices.login(
        { email, password },
        usersRepository
      );

      res.cookie(process.env.KEY_TOKEN, token, {
        httpOnly: true,
        sameSite: "none",
        secure: true,
        maxAge: 100 * 60 * 60 * 18, //18hrs
      });

      return res
        .status(200)
        .json({ message: "login completed successfully!", id });
    } catch (error) {
      next(error);
    }
  },
};
