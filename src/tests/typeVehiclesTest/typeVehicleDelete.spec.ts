import { describe, it, expect } from "vitest";
import { typeVehicleService } from "../../services/typeVehicleService";
import { typeVehicleRepositoryInMemory } from "../../repositories/typeVehicleRepositoryInMemory";

describe("test delete type functions", async () => {
  it("should delete a type!", async () => {
    const typeDeleted = await typeVehicleService.delete(
      "1",
      typeVehicleRepositoryInMemory
    );
    expect(typeDeleted?.id).toEqual("1");
  });

  it("should not found user!", async () => {
    try {
      const typeDelete = await typeVehicleService.delete(
        "1",
        typeVehicleRepositoryInMemory
      );
      if (typeDelete)
        throw new Error("expected an error but the type was found!");
    } catch (error: any) {
      expect(error.message).toBe("Type not found!");
    }
  });

  it("should type not deleted !", async () => {
    try {
      const typeDelete = await typeVehicleService.delete(
        "2",
        typeVehicleRepositoryInMemory
      );
      if (typeDelete)
        throw new Error("expected an error but the type was found!");
    } catch (error: any) {
      expect(error.message).toBe("type not deleted!");
    }
  });
});
