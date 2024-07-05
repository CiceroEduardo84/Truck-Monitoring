import { describe, expect, it } from "vitest";
import { userServices } from "../services/userServices";
import { userRepositoryInMemory } from "../repositories/userRepositoryInMemory";
import { UserPaginationSchema } from "../validations/userPaginationSchema";

describe("test readings users functions", async () => {
  const data: UserPaginationSchema = {
    filter: "porter",
    limit: "1",
    offset: "0",
  };

  it("should readings a users!", async () => {
    const userRead = await userServices.readings(data, userRepositoryInMemory);
    userRead?.forEach(user => {
      expect(user).toHaveProperty("id");
      expect(user).toHaveProperty("name");
      expect(user).toHaveProperty("email");
      expect(user).toHaveProperty("password");
      expect(user).toHaveProperty("type");
    });
  });

  it("Do not provide all query parameters!", async () => {
    try {
      const data: UserPaginationSchema = {
        filter: undefined,
        limit: "",
        offset: "",
      };
      const user = await userServices.readings(data, userRepositoryInMemory);
      if (user) throw new Error("I expected an error, but not all query params were provided.!");
    } catch (error: any) {
      expect(error.message).toBe("please inform query params limit, offset and filter!");
    }
  });
});
