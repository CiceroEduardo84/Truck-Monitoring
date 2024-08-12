import { QueryResult } from "pg";
import { UpdateUserDataTypes, UserData } from "../services/userServices";
import { UserPaginationSchema } from "../validations/userPaginationSchema";
import { appError } from "../errors/appError";
import { pool } from "../databases/postgreSQL";

export const userRepository = {
  async createUser(data: UserData) {
    try {
      const { id, name, email, password, type } = data;
      const client = await pool.connect();

      const querySQL =
        "INSERT INTO users (id_user, name, email, password, type) VALUES ($1, $2, $3, $4, $5)";
      await client.query(querySQL, [id, name, email, password, type]);

      client.release();
      return { id, name, email, password, type };
    } catch (error) {
      throw error;
    }
  },

  async getUserByID(id: string) {
    try {
      const client = await pool.connect();

      const queryUserSQL = "SELECT * FROM users WHERE id_user = $1";
      const user: QueryResult<any> = await client.query(queryUserSQL, [id]);

      if (user.rows.length > 0) {
        const data = user.rows[0];
        client.release();

        return {
          id: data.id_user,
          name: data.name,
          email: data.email,
          password: data.password,
          type: data.type,
        };
      }

      client.release();
      return undefined;
    } catch (error) {
      throw error;
    }
  },

  async getUserByEmail(email: string) {
    try {
      const client = await pool.connect();

      const querySQL = "SELECT * FROM users WHERE email = $1";
      const result: QueryResult<any> = await client.query(querySQL, [email]);

      if (result.rows.length > 0) {
        const user = result.rows[0];
        client.release();

        return {
          id: user.id_user,
          name: user.name,
          email: user.email,
          password: user.password,
          type: user.type,
        };
      }

      client.release();
      return undefined;
    } catch (error) {
      throw error;
    }
  },

  async getUsers(data: UserPaginationSchema) {
    try {
      const { limit, offset, filter } = data;

      const client = await pool.connect();
      let querySQL = "";

      switch (filter) {
        case "all":
          querySQL = `
            SELECT * FROM users
            ORDER BY name ASC
            LIMIT $1 OFFSET $2;
          `;
          break;

        case "admin":
          querySQL = `
            SELECT * FROM users 
            WHERE type = 'admin'
            ORDER BY name ASC 
            LIMIT $1 OFFSET $2;
          `;
          break;

        case "porter":
          querySQL = `
            SELECT * FROM users 
            WHERE type = 'porter'
            ORDER BY name ASC 
            LIMIT $1 OFFSET $2;
          `;
          break;

        case "dispatcher":
          querySQL = `
            SELECT * FROM users 
            WHERE type = 'dispatcher'
            ORDER BY name ASC 
            LIMIT $1 OFFSET $2;
          `;
          break;

        default:
          throw appError("invalid filter!", 400);
      }

      const users: QueryResult<any> = await client.query(querySQL, [
        limit,
        offset,
      ]);

      if (users.rows.length > 0) {
        client.release();
        return users.rows;
      }

      client.release();
      return undefined;
    } catch (error) {
      throw error;
    }
  },

  async updateUser(data: UpdateUserDataTypes) {
    try {
      const { id, name, email, password, type, updated_at } = data;
      const client = await pool.connect();

      const querySQL = `
        UPDATE users 
        SET name = $1, email = $2, password = $3, type = $4, updated_at = $5
        WHERE id_user = $6;
      `;
      await client.query(querySQL, [
        name,
        email,
        password,
        type,
        updated_at,
        id,
      ]);

      client.release();
      return { id, name, email, password, type, updated_at };
    } catch (error) {
      throw error;
    }
  },

  async deleteUser(id: string) {
    try {
      const client = await pool.connect();

      const querySQL = "DELETE FROM users WHERE id_user = $1;";
      await client.query(querySQL, [id]);

      client.release();
      return { id };
    } catch (error) {
      throw error;
    }
  },
};
