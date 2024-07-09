import { describe, it, expect } from "vitest";
import { userServices } from "../../services/userServices";
import { userRepositoryInMemory } from "../../repositories/userRepositoryInMemory";

describe("test delete user functions", async () => {
  it("should delete a user!", async () => {
    const userDeleted = await userServices.delete("1", userRepositoryInMemory);
    expect(userDeleted.id).toEqual("1");
  });

  it("should not found user!", async () => {
    try {
      const userDeleted = await userServices.delete("1", userRepositoryInMemory);
      if (userDeleted) throw new Error("expected an error but the user was found!");
    } catch (error: any) {
      expect(error.message).toBe("user not found!");
    }
  });

  it("should user not deleted !", async () => {
    try {
      const userDeleted = await userServices.delete("2", userRepositoryInMemory);
      if (userDeleted) throw new Error("expected an error but the user was found!");
    } catch (error: any) {
      expect(error.message).toBe("user not deleted!");
    }
  });
});
