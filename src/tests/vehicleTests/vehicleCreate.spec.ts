import { describe, it, expect, vi } from "vitest";
import { vehicleService, VehicleTypes } from "../../services/vehicleService";
import { vehicleRepositoryInMemory } from "../../repositories/vehicleRepositoryInMemory";
import { typeVehicleRepository } from "../../repositories/typeVehicleRepository";
import { userRepository } from "../../repositories/userRepository";

vi.mock("../../repositories/typeVehicleRepository");
vi.mock("../../repositories/userRepository");

describe("test create vehicle functions", async () => {
  const vehicle: VehicleTypes = {
    plate: "CCC3C33",
    type: "3",
    nameDriver: "Nilton Magnuns de Alencar",
    status: "awaiting",
    id_user: "3",
  };

  it("should create a vehicle!", async () => {
    const user = {
      id: "3",
      name: "Arthur",
      email: "teste123@gmail.com",
      password: "teste",
      type: "3",
    };

    vi.mocked(typeVehicleRepository.checkTypeByID).mockResolvedValue(1);
    vi.mocked(userRepository.getUserByID).mockResolvedValue(user);

    const vehicleCreated = await vehicleService.create(
      vehicle,
      vehicleRepositoryInMemory
    );

    expect(vehicleCreated?.plate).toEqual(vehicle.plate);
    expect(vehicleCreated?.nameDriver).toEqual(vehicle.nameDriver);
    expect(vehicleCreated?.status).toEqual(vehicle.status);
    expect(vehicleCreated).toHaveProperty("id_user");
    expect(vehicleCreated).toHaveProperty("id_vehicle");
    expect(vehicleCreated).toHaveProperty("type");
  });

  it("should not create vehicle if type not exists!", async () => {
    vi.mocked(typeVehicleRepository.checkTypeByID).mockResolvedValue(0);

    try {
      const vehicleCreated = await vehicleService.create(
        vehicle,
        vehicleRepositoryInMemory
      );
      
      if (vehicleCreated)
        throw new Error("expected an error but the vehicle was created!");
    } catch (error: any) {
      expect(error.message).toBe("Type not found!");
    }
  });

  it("should not create vehicle if user not found!", async () => {
    vi.mocked(typeVehicleRepository.checkTypeByID).mockResolvedValue(1);
    vi.mocked(userRepository.getUserByID).mockResolvedValue(undefined);

    try {
      const vehicleCreated = await vehicleService.create(
        vehicle,
        vehicleRepositoryInMemory
      );

      if (vehicleCreated)
        throw new Error("expected an error but the vehicle was created!");
    } catch (error: any) {
      expect(error.message).toBe("User not found!");
    }
  });
});
