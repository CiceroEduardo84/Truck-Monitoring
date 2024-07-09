import { describe, expect, it } from "vitest";
import { UserData, userServices } from "../../services/userServices";
import { userRepositoryInMemory } from "../../repositories/userRepositoryInMemory";

describe("test update user functions", async () => {
  const user: UserData = {
    id: "1",
    name: "user1",
    email: "user1@email.com",
    password: "A!123456789",
    type: "porter",
  };

  it("should update a user!", async () => {
    const userUpdated = await userServices.update(user, userRepositoryInMemory);
    expect(userUpdated).toHaveProperty("id");
    expect(userUpdated).toHaveProperty("name");
    expect(userUpdated).toHaveProperty("email");
    expect(userUpdated).toHaveProperty("password");
    expect(userUpdated).toHaveProperty("type");
  });

  it("should not found user!", async () => {
    try {
      const user: UserData = {
        id: "10",
        name: "user1",
        email: "user1@email.com",
        password: "A!123456789",
        type: "porter",
      };

      const userUpdated = await userServices.update(
        user,
        userRepositoryInMemory
      );
      if (userUpdated)
        throw new Error("expected an error but the user was found!");
    } catch (error: any) {
      expect(error.message).toBe("User not found!");
    }
  });

  it("should email already exists!", async () => {
    try {
      const user: UserData = {
        id: "1",
        name: "user1",
        email: "user2@email.com",
        password: "A!123456789",
        type: "porter",
      };

      const userUpdated = await userServices.update(
        user,
        userRepositoryInMemory
      );
      if (userUpdated)
        throw new Error("I was expecting an error, but the email didn't exist!");
    } catch (error: any) {
      expect(error.message).toBe("Email already exists!");
    }
  });
});
