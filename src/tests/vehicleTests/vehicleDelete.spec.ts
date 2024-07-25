import { describe, it, expect } from "vitest";
import { vehicleService } from "../../services/vehicleService";
import { vehicleRepositoryInMemory } from "../../repositories/vehicleRepositoryInMemory";

describe("test delete vehicle functions", async () => {
  it("should delete a vehicle!", async () => {
    const vehicleDeleted = await vehicleService.delete(
      "1",
      vehicleRepositoryInMemory
    );
    expect(vehicleDeleted.id).toEqual("1");
  });

  it("should not found vehicle!", async () => {
    try {
      const vehicleDeleted = await vehicleService.delete(
        "3",
        vehicleRepositoryInMemory
      );
      if (vehicleDeleted)
        throw new Error("expected an error but the vehicle was found!");
    } catch (error: any) {
      expect(error.message).toBe("vehicle not found!");
    }
  });

  it("should vehicle not deleted !", async () => {
    try {
      const vehicleDeleted = await vehicleService.delete(
        "2",
        vehicleRepositoryInMemory
      );
      if (vehicleDeleted)
        throw new Error("expected an error but the vehicle was found!");
    } catch (error: any) {
      expect(error.message).toBe("vehicle not deleted!");
    }
  });
});
