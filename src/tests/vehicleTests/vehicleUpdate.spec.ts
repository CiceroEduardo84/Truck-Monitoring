import { describe, it, expect, vi } from "vitest";
import {
  vehicleService,
  CreteVehicleTypes,
} from "../../services/vehicleService";
import { vehicleRepositoryInMemory } from "../../repositories/vehicleRepositoryInMemory";
import { typeVehicleRepository } from "../../repositories/typeVehicleRepository";
import { userRepository } from "../../repositories/userRepository";

vi.mock("../../repositories/typeVehicleRepository");
vi.mock("../../repositories/userRepository");

describe("test update vehicle functions", async () => {
  const vehicle: CreteVehicleTypes = {
    id_vehicle: "1",
    plate: "CCC3C33",
    type: "3",
    nameDriver: "Nilton Magnuns de Alencar",
    status: "awaiting",
    id_user: "3",
  };

  it("should update a vehicle!", async () => {
    const user = {
      id: "3",
      name: "Arthur",
      email: "teste123@gmail.com",
      password: "teste",
      type: "3",
    };

    vi.mocked(typeVehicleRepository.checkTypeByID).mockResolvedValue(1);
    vi.mocked(userRepository.getUserByID).mockResolvedValue(user);

    const vehicleUpdated = await vehicleService.update(
      vehicle,
      vehicleRepositoryInMemory
    );

    expect(vehicleUpdated?.plate).toEqual(vehicle.plate);
    expect(vehicleUpdated?.nameDriver).toEqual(vehicle.nameDriver);
    expect(vehicleUpdated?.status).toEqual(vehicle.status);
    expect(vehicleUpdated).toHaveProperty("id_user");
    expect(vehicleUpdated).toHaveProperty("id_vehicle");
    expect(vehicleUpdated).toHaveProperty("type");
  });

  it("should not update vehicle if vehicle not found!", async () => {
    const vehicleNotFound: CreteVehicleTypes = {
      id_vehicle: "4",
      plate: "CCC3C33",
      type: "3",
      nameDriver: "Nilton Magnuns de Alencar",
      status: "awaiting",
      id_user: "3",
    };

    try {
      const vehicleUpdated = await vehicleService.update(
        vehicleNotFound,
        vehicleRepositoryInMemory
      );

      if (vehicleUpdated)
        throw new Error("expected an error but the vehicle was updated!");
    } catch (error: any) {
      expect(error.message).toBe("Vehicle not found!");
    }
  });

  it("should not update vehicle if type not exists!", async () => {
    vi.mocked(typeVehicleRepository.checkTypeByID).mockResolvedValue(0);

    try {
      const vehicleUpdated = await vehicleService.update(
        vehicle,
        vehicleRepositoryInMemory
      );

      if (vehicleUpdated)
        throw new Error("expected an error but the vehicle was updated!");
    } catch (error: any) {
      expect(error.message).toBe("Type not found!");
    }
  });

  it("should not update vehicle if user not found!", async () => {
    vi.mocked(typeVehicleRepository.checkTypeByID).mockResolvedValue(1);
    vi.mocked(userRepository.getUserByID).mockResolvedValue(undefined);

    try {
      const vehicleUpdated = await vehicleService.update(
        vehicle,
        vehicleRepositoryInMemory
      );

      if (vehicleUpdated)
        throw new Error("expected an error but the vehicle was updated!");
    } catch (error: any) {
      expect(error.message).toBe("User not found!");
    }
  });
});
