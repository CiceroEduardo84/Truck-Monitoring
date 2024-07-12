import { describe, it, expect } from "vitest";
import { typeVehicleService } from "../../services/typeVehicleService";
import { typeVehicleRepositoryInMemory } from "../../repositories/typeVehicleRepositoryInMemory";

describe("test read types vehicle functions", async () => {
  it("must read several types!", async () => {
    const types = await typeVehicleService.read(typeVehicleRepositoryInMemory);
    types?.forEach((type) => {
      expect(type).toHaveProperty("id_type");
      expect(type).toHaveProperty("name");
    });
  });
});
