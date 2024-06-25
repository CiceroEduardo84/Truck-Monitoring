import { Request, Response, NextFunction } from "express";
import { userRepository } from "../repositories/userRepository";
import { appError } from "../errors/appError";

export async function isAdminMiddleware(req: Request, res: Response, next: NextFunction) {
  try {
    const id = req.userID;
    const user = await userRepository.getUserByID(id)

    if (!user) throw appError('Usuário não encontrado', 404);
    if (user.type != "admin") throw appError('Usuário não autorizado', 401);
    return next();
  } catch (error) {
    return next(error)
  };
};