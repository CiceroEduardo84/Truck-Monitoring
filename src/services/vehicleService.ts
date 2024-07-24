import { randomUUID } from "node:crypto";
import { appError } from "../errors/appError";
import { typeVehicleRepository } from "../repositories/typeVehicleRepository";
import { userRepository } from "../repositories/userRepository";
import { VehicleDataTypes } from "../validations/vehicleSchema";
import { VehiclePaginationSchema } from "../validations/vehiclePaginationSchema";

export type VehicleTypes = VehicleDataTypes & { id_user: string };
export type CreteVehicleTypes = VehicleTypes & { id_vehicle: string };
export type ReadVehicleTypes = CreteVehicleTypes & {
  updated_at: string;
  created_at: string;
};
export type VehicleRepositoryType = {
  createVehicle(
    data: CreteVehicleTypes
  ): Promise<CreteVehicleTypes | undefined>;
  getVehicles(
    data: VehiclePaginationSchema
  ): Promise<ReadVehicleTypes[] | undefined>;
};

export const vehicleService = {
  async create(data: VehicleTypes, repository: VehicleRepositoryType) {
    try {
      const { plate, type, nameDriver, status, id_user } = data;

      const typeVehicle = await typeVehicleRepository.checkTypeByID(type);
      if (!typeVehicle) throw appError("Type not found!", 400);

      const checkUser = await userRepository.getUserByID(id_user);
      if (!checkUser) throw appError("User not found!", 400);

      const vehicleData = {
        id_vehicle: randomUUID(),
        plate,
        type,
        nameDriver,
        status,
        id_user,
      };

      const vehicleCreated = await repository.createVehicle(vehicleData);

      return vehicleCreated;
    } catch (error) {
      throw error;
    }
  },

  async read(data: VehiclePaginationSchema, repository: VehicleRepositoryType) {
    try {
      const { limit, offset, filter } = data;

      if (!limit || !offset || !filter) {
        throw appError(
          "please inform query params limit, offset and filter!",
          400
        );
      }

      const vehicleTasks = await repository.getVehicles({
        limit,
        offset,
        filter,
      });

      return vehicleTasks;
    } catch (error) {
      throw error;
    }
  },
};
