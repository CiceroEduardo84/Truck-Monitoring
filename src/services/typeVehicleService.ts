import { appError } from "../errors/appError";
import { randomUUID } from "node:crypto";

export type TypeVehicle = { id: string; name: string };
export type UpdateType = TypeVehicle & { updated_at: Date };
export type ReadTypes = Omit<TypeVehicle, "id"> & { id_type: string };

export type typeVehicleRepository = {
  createType(data: TypeVehicle): Promise<{ name: string } | undefined>;
  checkType(name: string): Promise<number | undefined>;
  checkTypeByID(id: string): Promise<number | undefined>;
  getTypes(): Promise<ReadTypes[] | undefined>;
  updateType(data: UpdateType): Promise<TypeVehicle | undefined>;
  typeDelete(id: string): Promise<{ id: string } | undefined>;
};

export const typeVehicleService = {
  async create(name: string, repository: typeVehicleRepository) {
    try {
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
    } catch (error) {
      throw error;
    }
  },

  async read(repository: typeVehicleRepository) {
    try {
      const typesVehicles = await repository.getTypes();

      return typesVehicles;
    } catch (error) {
      throw error;
    }
  },

  async update(data: TypeVehicle, repository: typeVehicleRepository) {
    try {
      const { id, name } = data;

      const typeExists = await repository.checkType(name);
      if (typeExists) {
        throw appError("Type already exists!", 400);
      }

      const TypeById = await repository.checkTypeByID(id);
      if (!TypeById) {
        throw appError("Type not found!", 400);
      }

      const type = {
        id,
        name,
        updated_at: new Date(),
      };

      const updateType = await repository.updateType(type);

      return updateType;
    } catch (error) {
      throw error;
    }
  },

  async delete(id: string, repository: typeVehicleRepository) {
    try {
      const typeExists = await repository.checkTypeByID(id);
      if (!typeExists) {
        throw appError("Type not found!", 400);
      }

      const typeDeleted = await repository.typeDelete(id);

      if (!typeDeleted?.id) throw appError("type not deleted!", 500);

      return typeDeleted;
    } catch (error) {
      throw error;
    }
  },
};
