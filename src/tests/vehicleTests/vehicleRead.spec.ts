import { describe, expect, it } from "vitest";
import { vehicleService } from "../../services/vehicleService";
import { VehiclePaginationSchema } from "../../validations/vehiclePaginationSchema";
import { vehicleRepositoryInMemory } from "../../repositories/vehicleRepositoryInMemory";

describe("test readings vehicle functions", async () => {
  const data: VehiclePaginationSchema = {
    filter: "awaiting",
    limit: "1",
    offset: "0",
  };

  it("should readings a vehicles!", async () => {
    const vehicleRead = await vehicleService.read(
      data,
      vehicleRepositoryInMemory
    );
    vehicleRead?.forEach((vehicle) => {
      expect(vehicle).toHaveProperty("id_vehicle");
      expect(vehicle).toHaveProperty("plate");
      expect(vehicle).toHaveProperty("type");
      expect(vehicle).toHaveProperty("nameDriver");
      expect(vehicle).toHaveProperty("status");
      expect(vehicle).toHaveProperty("id_user");
      expect(vehicle).toHaveProperty("created_at");
      expect(vehicle).toHaveProperty("updated_at");
    });
  });

  it("Do not provide all query parameters!", async () => {
    try {
      const data: VehiclePaginationSchema = {
        filter: undefined,
        limit: "",
        offset: "",
      };
      const user = await vehicleService.read(data, vehicleRepositoryInMemory);
      if (user)
        throw new Error(
          "I expected an error, but not all query params were provided!"
        );
    } catch (error: any) {
      expect(error.message).toBe(
        "please inform query params limit, offset and filter!"
      );
    }
  });
});
