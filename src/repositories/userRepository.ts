import { QueryResult } from "pg";
import { postgreSqlConnection } from "../databases/postgreSQL";
import { UserDataTypes } from "../validations/userSchema";

export type CreateUserDataType = UserDataTypes & { id: string };

export const userRepository = {
  async createUser(data: CreateUserDataType) {
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

  //   async getUserByID(id: string) {
  //     try {
  //       const db = await postgreSqlConnection();

  //       const queryUserSQL = "SELECT * FROM users WHERE id == ?";
  //       const user = await db.get(queryUserSQL, [id]);

  //       const queryTasksSQL = `
  //         SELECT
  //           COUNT(*) AS total,
  //           SUM(CASE WHEN status = 'completed' THEN 1 ELSE 0 END) AS completed,
  //           SUM(CASE WHEN status = 'pending' AND date >= CURRENT_DATE THEN 1 ELSE 0 END) AS pending,
  //           SUM(CASE WHEN status = 'pending' AND date < CURRENT_DATE THEN 1 ELSE 0 END) AS late
  //         FROM tasks
  //         WHERE user_id = ?;
  //       `;

  //       const tasksInfo = await db.get(queryTasksSQL, [id]);

  //       return { ...user, tasksInfo };
  //     } catch (error) {
  //       throw error;
  //     }
  //   },

  async getUserByEmail(email: string) {
    try {
      const db = await postgreSqlConnection();

      const querySQL = "SELECT * FROM users WHERE email = $1";
      const result: QueryResult<any> = await db.query(querySQL, [email]);

      if (result.rows.length > 0) {
        const user = result.rows[0];
        return {
          id: user.id,
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
};
