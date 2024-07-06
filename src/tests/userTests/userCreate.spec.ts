import { describe, it, expect } from "vitest";
import { userServices } from "../../services/userServices";
import { userRepositoryInMemory } from "../../repositories/userRepositoryInMemory";
import { UserDataTypes } from "../../validations/userSchema";

describe("test create user functions", async () => {
  const user: UserDataTypes = {
    name: "teste",
    email: "test@hotmail.com",
    password: "1234567",
    type: "admin",
  };

  it("should create a user!", async () => {
    const userCreated = await userServices.create(user, userRepositoryInMemory);
    expect(userCreated?.email).toEqual(user.email);
    expect(userCreated).toHaveProperty("id");
  });

  it("should not create user if email already exists!", async () => {
    try {
      const userCreated = await userServices.create(
        user,
        userRepositoryInMemory
      );
      if (userCreated)
        throw new Error("expected an error but the user was created!");
    } catch (error: any) {
      expect(error.message).toBe("email already exists!");
    }
  });
});
