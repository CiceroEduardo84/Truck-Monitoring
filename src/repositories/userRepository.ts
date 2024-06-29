import { QueryResult } from "pg";
import { postgreSqlConnection } from "../databases/postgreSQL";
import { UpdateUserDataTypes, UserData } from "../services/userServices";

export const userRepository = {
  async createUser(data: UserData) {
    try {
      const { id, name, email, password, type } = data;
      const db = await postgreSqlConnection();

      const querySQL =
        "INSERT INTO users (id_user, name, email, password, type) VALUES ($1, $2, $3, $4, $5)";
      await db.query(querySQL, [id, name, email, password, type]);

      return { id, name, email, password, type };
    } catch (error) {
      throw error;
    }
  },

  async getUserByID(id: string) {
    try {
      const db = await postgreSqlConnection();

      const queryUserSQL = "SELECT * FROM users WHERE id_user = $1";
      const user: QueryResult<any> = await db.query(queryUserSQL, [id]);

      if (user.rows.length > 0) {
        const data = user.rows[0];
        return {
          id: data.id_user,
          name: data.name,
          email: data.email,
          password: data.password,
          type: data.type,
        };
      }

      return undefined;
    } catch (error) {
      throw error;
    }
  },

  async getUserByEmail(email: string) {
    try {
      const db = await postgreSqlConnection();

      const querySQL = "SELECT * FROM users WHERE email = $1";
      const result: QueryResult<any> = await db.query(querySQL, [email]);

      if (result.rows.length > 0) {
        const user = result.rows[0];

        return {
          id: user.id_user,
          name: user.name,
          email: user.email,
          password: user.password,
          type: user.type,
        };
      }

      return undefined;
    } catch (error) {
      throw error;
    }
  },

  async updateUser(data: UpdateUserDataTypes) {
    try {
      const { id, name, email, password, type, updated_at } = data;
      const db = await postgreSqlConnection();

      const querySQL = `
        UPDATE users 
        SET name = $1, email = $2, password = $3, type = $4, updated_at = $5
        WHERE id_user = $6;
      `;
      await db.query(querySQL, [name, email, password, type, updated_at, id]);

      return { id, name, email, password, type, updated_at };
    } catch (error) {
      throw error;
    }
  },

  async deleteUser(id: string) {
    try {
      const db = await postgreSqlConnection();

      const querySQL = "DELETE FROM tasks WHERE id = ?;";
      await db.query(querySQL, [id]);

      return { id };
    } catch (error) {
      throw error;
    }
  },
};
