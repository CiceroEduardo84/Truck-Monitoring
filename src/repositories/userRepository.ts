import { postgreSqlConnection } from "../databases/postgreSQL";

export type CreateUserDataType = UserDataTypes & { id: string };

export const userRepository = {
  async createUser(data: CreateUserDataType) {
    try {
      const { id, name, email, password } = data;

      const db = await postgreSqlConnection();

      const querySQL =
        "INSERT INTO users (id, name, email, password) VALUES (?, ?, ?, ?)";

      await db.query(querySQL, [id, name, email, password]);

      return { id, name, email, password };
    } catch (error) {
      throw error;
    }
  },

  async getUserByID(id: string) {
    try {
      const db = await postgreSqlConnection();

      const queryUserSQL = "SELECT * FROM users WHERE id == ?";
      const user = await db.query(queryUserSQL, [id]);

      const queryTasksSQL = `
        SELECT
          COUNT(*) AS total,
          SUM(CASE WHEN status = 'completed' THEN 1 ELSE 0 END) AS completed,
          SUM(CASE WHEN status = 'pending' AND date >= CURRENT_DATE THEN 1 ELSE 0 END) AS pending,
          SUM(CASE WHEN status = 'pending' AND date < CURRENT_DATE THEN 1 ELSE 0 END) AS late
        FROM tasks
        WHERE user_id = ?;
      `;

      const tasksInfo = await db.query(queryTasksSQL, [id]);

      return { ...user, tasksInfo };
    } catch (error) {
      throw error;
    }
  },

  async getUserByEmail(email: string) {
    try {
      const db = await postgreSqlConnection();

      const querySQL = "SELECT * FROM users WHERE email == ?";
      const user = await db.query(querySQL, [email]);

      return user;
    } catch (error) {
      throw error;
    }
  },
};