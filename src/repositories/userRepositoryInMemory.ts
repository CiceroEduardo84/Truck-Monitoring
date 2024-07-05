import { UpdateUserDataTypes, UserData } from "../services/userServices";
import { UserPaginationSchema } from "../validations/userPaginationSchema";

const users: UserData[] = [
  {
    id: "1",
    name: "user1",
    email: "user1@email.com",
    password: "$2b$10$jmwwsd7aXW331i7QVO.xxey4UmwF/d0ELpuEM5CTERviEIdQAZytq",
    type: "admin",
  },

  {
    id: "2",
    name: "user2",
    email: "user2@email.com",
    password: "$2b$10$jmwwsd7aXW331i7QVO.xxey4UmwF/d0ELpuEM5CTERviEIdQAZytq",
    type: "porter",
  },
];

export const userRepositoryInMemory = {
  async createUser(data: UserData) {
    try {
      const { id, name, email, password, type } = data;

      const user = {
        id,
        name,
        email,
        password,
        type,
      };

      users.push(user);

      return users[users.length - 1];
    } catch (error) {
      throw error;
    }
  },

  async getUserByID(id: string) {
    try {
      const user = users.find((user) => user.id == id);
      return user;
    } catch (error) {
      throw error;
    }
  },

  async getUserByEmail(email: string) {
    try {
      const user = users.find((user) => user.email == email);
      return user;
    } catch (error) {
      throw error;
    }
  },

  async getUsers(data: UserPaginationSchema) {
    try {
      const { limit, offset, filter } = data;

      if (filter == "all") {
        return users as UpdateUserDataTypes[];
      } else {
        const filteredUsers = users.filter((user) => user.type == filter);
        const paginatedUsers = filteredUsers.reverse();
        return paginatedUsers as UpdateUserDataTypes[];
      }
    } catch (error) {
      throw error;
    }
  },

  async updateUser(data: UpdateUserDataTypes) {
    try {
      const { id, name, email, password, type, updated_at } = data;

      const userUpdated = {
        id,
        name,
        email,
        password,
        type,
        updated_at,
      };

      const indexUser = users.findIndex((user) => user.id == id);

      if (indexUser == -1) return;

      users.splice(indexUser, 1, userUpdated);
      return { id, name, email, password, type, updated_at };
    } catch (error) {
      throw error;
    }
  },

  async deleteUser(id: string) {
    try {
      if (id == "2") return {id: undefined};
      const indexUser = users.findIndex((user) => user.id == id);

      users.splice(indexUser, 1);

      return { id };
    } catch (error) {
      throw error;
    }
  },
};
