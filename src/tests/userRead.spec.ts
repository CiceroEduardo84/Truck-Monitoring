import { describe, it, expect } from "vitest";
import { userServices } from "../services/userServices";
import { userRepositoryInMemory } from "../repositories/userRepositoryInMemory";

describe("test read user functions", async () => {
  const user = {
    id: "1",
    name: "user1",
    email: "user1@email.com",
    type: "admin",
  };

  it("should read a user!", async () => {
    const userRead = await userServices.read(user.id, userRepositoryInMemory);
    expect(userRead.name).toEqual(user.name);
    expect(userRead.email).toEqual(user.email);
    expect(userRead?.type).toEqual(user.type);
    expect(userRead).toHaveProperty("id");
    expect(user).not.toHaveProperty("password");
  });

  it("should not found user!", async () => {
    try {
      const user = await userServices.read("userID", userRepositoryInMemory);
      if (user) throw new Error("expected an error but the user was found!");
    } catch (error: any) {
      expect(error.message).toBe("user not found!");
    }
  });
});
