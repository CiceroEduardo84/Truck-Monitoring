import { describe, it, expect } from "vitest";
import { typeVehicleService } from "../../services/typeVehicleService";
import { typeVehicleRepositoryInMemory } from "../../repositories/typeVehicleRepositoryInMemory";

describe("test create type vehicle functions", async () => {
  it("should create a type!", async () => {
    const typeCreated = await typeVehicleService.create(
      "Báu",
      typeVehicleRepositoryInMemory
    );
    expect(typeCreated?.name).toEqual("báu");
  });

  it("should not create type if type already exists!", async () => {
    try {
      const typeCreated = await typeVehicleService.create(
        "truck",
        typeVehicleRepositoryInMemory
      );

      if (typeCreated)
        throw new Error("expected an error but the type was created!");
    } catch (error: any) {
      expect(error.message).toBe("Type already exists!");
    }
  });
});
