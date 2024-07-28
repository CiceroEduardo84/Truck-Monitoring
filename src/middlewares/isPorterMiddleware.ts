import { Request, Response, NextFunction } from "express";
import { userRepository } from "../repositories/userRepository";
import { appError } from "../errors/appError";
import { vehicleSchema } from "../validations/vehicleSchema";

export async function isPorterMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const id = req.userID;
    const { status } = vehicleSchema.parse(req.body);
    const user = await userRepository.getUserByID(id);

    if (!user) throw appError("Usuário não encontrado", 404);
    if (user.type != "admin" && user.type != "porter")
      throw appError("Usuário não autorizado", 401);
    if (user.type == "porter" && status == "loading")
      throw appError("Vehiculo não cadastrado, status não autorizado!", 401);
    return next();
  } catch (error) {
    return next(error);
  }
}
