import { QueryResult } from "pg";
import { postgreSqlConnection } from "../databases/postgreSQL";
import { TypeVehicle } from "../services/typeVehicleService";

export const typeVehicleRepository = {
  async createType(data: TypeVehicle) {
    try {
      const { id, name } = data;
      const db = await postgreSqlConnection();

      const querySQL =
        "INSERT INTO Type_Vehicle (id_type, name) VALUES ($1, $2)";
      await db.query(querySQL, [id, name]);

      return { id, name };
    } catch (error) {
      throw error;
    }
  },

  async checkType(name: string) {
    const db = await postgreSqlConnection();

    const querySQL = "SELECT COUNT(*) FROM Type_Vehicle WHERE name = $1";
    const totalTypes = await db.query(querySQL, [name]);

    const count = parseInt(totalTypes.rows[0].count, 10);

    return count;
  },

  async getTypes() {
    const db = await postgreSqlConnection();

    const querySQL = "SELECT id_type, name FROM Type_Vehicle;";
    const types: QueryResult<any> = await db.query(querySQL);

    if (types.rows.length > 0) {
      return types.rows;
    }

    return undefined;
  },
};
