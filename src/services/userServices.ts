import { randomUUID } from "node:crypto";
import { hash } from "bcrypt";
import { UserDataTypes } from "../validations/userSchema";
import { appError } from "../errors/appError";
import { UserPaginationSchema } from "../validations/userPaginationSchema";

export type UserData = UserDataTypes & { id: string };
export type UpdateUserDataTypes = UserData & { updated_at: Date };

export type UserRepositoryTypes = {
  createUser(data: UserData): Promise<UserData | undefined>;
  getUserByID(
    id: string
  ): Promise<(Omit<UserData, "password"> & { password?: string }) | undefined>;
  getUserByEmail(email: string): Promise<UserData | undefined>;
  getUsers(data:UserPaginationSchema): Promise<UpdateUserDataTypes[] | undefined>;
  updateUser(data: UserData): Promise<UpdateUserDataTypes | undefined>;
  deleteUser(id: string): Promise<{ id: string | undefined }>;
};

export const userServices = {
  async create(data: UserDataTypes, repository: UserRepositoryTypes) {
    try {
      const { name, email, password, type } = data;

      const user = await repository.getUserByEmail(email);

      if (user) throw appError("email already exists!", 400);

      const passwordHash = await hash(password, 10);

      const userData = {
        id: randomUUID(),
        name,
        email,
        password: passwordHash,
        type,
      };

      const userCreated = await repository.createUser(userData);

      if (!userCreated) return;
      userCreated.password = "*".repeat(userCreated.password.length);

      return userCreated;
    } catch (error) {
      throw error;
    }
  },

  async read(id: string, repository: UserRepositoryTypes) {
    try {
      const userData = await repository.getUserByID(id);

      if (!userData) throw appError("user not found!", 404);

      delete userData.password;

      return userData;
    } catch (error) {
      throw error;
    }
  },

  async readings(data: UserPaginationSchema, repository: UserRepositoryTypes) {
    try {
      const { limit, offset, filter } = data;

      if (!limit || !offset || !filter) {
        throw appError(
          "please inform query params limit, offset and filter!",
          400
        );
      }

      const userTasks = await repository.getUsers({ limit, offset, filter });

      return userTasks;
    } catch (error) {
      throw error;
    }
  },

  async update(data: UserData, repository: UserRepositoryTypes) {
    try {
      const { id, email, name, password, type } = data;

      const userRead = await repository.getUserByID(id);
      if (!userRead) throw appError("User not found!", 404);

      const userByEmail = await repository.getUserByEmail(email);
      if (userByEmail && userByEmail.email != userRead.email) {
        throw appError("Email already exists!", 409);
      }

      const passwordHash = await hash(password, 10);
      const userToUpdate = {
        id,
        email,
        name,
        password: passwordHash,
        type,
        updated_at: new Date(),
      };

      const userUpdate = await repository.updateUser(userToUpdate);
      if (!userUpdate) return;
      userUpdate.password = "*".repeat(userUpdate.password.length);

      return userUpdate;
    } catch (error) {
      throw error;
    }
  },

  async delete(id: string, repository: UserRepositoryTypes) {
    try {
      const user = await repository.getUserByID(id);
      if (!user) throw appError("user not found!", 404);

      const userDeleted = await repository.deleteUser(id);

      if (!userDeleted.id) throw appError("user not deleted!", 500);

      return userDeleted;
    } catch (error) {
      throw error;
    }
  },
};
