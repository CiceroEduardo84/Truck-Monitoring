import { appError } from "../errors/appError";
import { randomUUID } from "node:crypto";

export type TypeVehicle = { id: string; name: string };
export type ReadTypes = Omit<TypeVehicle, "id"> & { id_type: string };

export type typeVehicleRepository = {
  createType(data: TypeVehicle): Promise<{ name: string } | undefined>;
  checkType(name: string): Promise<number | undefined>;
  getTypes(): Promise<ReadTypes[] | undefined>;
};

export const typeVehicleService = {
  async create(name: string, repository: typeVehicleRepository) {
    const typeName = name.toLowerCase().trim();

    const typeExists = await repository.checkType(typeName);
    if (typeExists) {
      throw appError("Type already exists!", 400);
    }

    const type = {
      id: randomUUID(),
      name: typeName,
    };

    const createType = await repository.createType(type);

    return createType;
  },

  async read(repository: typeVehicleRepository) {
    const typesVehicles = repository.getTypes();

    return typesVehicles;
  },
};
