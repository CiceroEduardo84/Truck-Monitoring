import { describe, expect, it } from "vitest";
import { typeVehicleService } from "../../services/typeVehicleService";
import { typeVehicleRepositoryInMemory } from "../../repositories/typeVehicleRepositoryInMemory";

describe("test update type vehicle functions", async () => {
  const type = {
    id: "1",
    name: "trucks",
  };

  it("should update a type!", async () => {
    const typeUpdated = await typeVehicleService.update(
      type,
      typeVehicleRepositoryInMemory
    );
    expect(typeUpdated).toHaveProperty("id");
    expect(typeUpdated).toHaveProperty("name");
  });

  it("should not found type!", async () => {
    try {
      const type = {
        id: "6",
        name: "test",
      };

      const userUpdated = await typeVehicleService.update(
        type,
        typeVehicleRepositoryInMemory
      );
      if (userUpdated)
        throw new Error("expected an error, but the type was found!");
    } catch (error: any) {
      expect(error.message).toBe("Type not found!");
    }
  });

  it("should found type!", async () => {
    try {
      const type = {
        id: "2",
        name: "trucks",
      };

      const userUpdated = await typeVehicleService.update(
        type,
        typeVehicleRepositoryInMemory
      );
      if (userUpdated)
        throw new Error("I was expecting an error, but the type didn't exist!");
    } catch (error: any) {
      expect(error.message).toBe("Type already exists!");
    }
  });
});
