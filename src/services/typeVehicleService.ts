import { appError } from "../errors/appError";
import { randomUUID } from "node:crypto";

export type TypeVehicle = { id: string; name: string };

export type typeVehicleRepository = {
  createType(data: TypeVehicle): Promise<{ name: string } | undefined>;
  checkType(name: string): Promise<{ count: number } | undefined>;
};

export const typeVehicleService = {
  async create(name: string, repository: typeVehicleRepository) {
    const typeName = name.toLowerCase().trim();

    const typeExists = await repository.checkType(typeName);
    if (typeExists) {
      throw appError("Typo already exists!", 400);
    }

    const type = {
      id: randomUUID(),
      name: typeName,
    };

    const createType = await repository.createType(type);

    return createType;
  },
};
