import { Router } from "express";

export const userRoutes = Router();

userRoutes.post("/user",  userControllers.create);
