import { randomUUID } from "node:crypto";
import { appError } from "../errors/appError";
import { typeVehicleRepository } from "../repositories/typeVehicleRepository";
import { userRepository } from "../repositories/userRepository";
import { VehicleDataTypes } from "../validations/vehicleSchema";

export type VehicleTypes = VehicleDataTypes & { id_user: string };
export type CreteVehicleTypes = VehicleTypes & { id_vehicle: string };
export type VehicleRepository = {
  createVehicle(
    data: CreteVehicleTypes
  ): Promise<CreteVehicleTypes | undefined>;
};

export const vehicleService = {
  async create(data: VehicleTypes, repository: VehicleRepository) {
    try {
      const { plate, type, nameDriver, status, id_user } = data;

      const typeVehicle = await typeVehicleRepository.checkTypeByID(type);
      if (!typeVehicle) throw appError("Type already exists!", 400);

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
};
