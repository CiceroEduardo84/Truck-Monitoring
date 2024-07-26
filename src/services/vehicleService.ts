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
export type UpadteVehicleTypes = CreteVehicleTypes & { updated_at: Date };

export type VehicleRepositoryType = {
  createVehicle(
    data: CreteVehicleTypes
  ): Promise<CreteVehicleTypes | undefined>;
  getVehicleByID(id: string): Promise<ReadVehicleTypes | undefined>;
  getVehicles(
    data: VehiclePaginationSchema
  ): Promise<ReadVehicleTypes[] | undefined>;
  updateVehicle(
    data: UpadteVehicleTypes
  ): Promise<UpadteVehicleTypes | undefined>;
  deleteVehicle(id: string): Promise<{ id: string | undefined }>;
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

  async update(data: CreteVehicleTypes, repository: VehicleRepositoryType) {
    try {
      const { id_vehicle, plate, type, nameDriver, status, id_user } = data;

      const vehicle = await repository.getVehicleByID(id_vehicle);
      if (!vehicle) throw appError("vehicle not found!", 400);

      const vehicleToUpdate = {
        id_vehicle,
        plate,
        type,
        nameDriver,
        status,
        id_user,
        updated_at: new Date(),
      };
      
      const vehicleUpdate = await repository.updateVehicle(vehicleToUpdate);
      
      return vehicleUpdate;
    } catch (error) {
      throw error;
    }
  },

  async delete(id: string, repository: VehicleRepositoryType) {
    try {
      const vehicle = await repository.getVehicleByID(id);
      if (!vehicle) throw appError("vehicle not found!", 404);

      const vehicleDeleted = await repository.deleteVehicle(id);

      if (!vehicleDeleted?.id) throw appError("vehicle not deleted!", 500);

      return vehicleDeleted;
    } catch (error) {
      throw error;
    }
  },
};
