import { QueryResult } from "pg";
import { TypeVehicle, UpdateType } from "../services/typeVehicleService";
import { pool } from "../databases/postgreSQL";

export const typeVehicleRepository = {
  async createType(data: TypeVehicle) {
    try {
      const { id, name } = data;
      const client = await pool.connect();

      const querySQL =
        "INSERT INTO Type_Vehicle (id_type, name) VALUES ($1, $2)";
      await client.query(querySQL, [id, name]);

      client.release();
      return { id, name };
    } catch (error) {
      throw error;
    }
  },

  async checkType(name: string) {
    try {
      const client = await pool.connect();

      const querySQL = "SELECT COUNT(*) FROM Type_Vehicle WHERE name = $1";
      const totalTypes = await client.query(querySQL, [name]);

      const count = parseInt(totalTypes.rows[0].count, 10);

      client.release();
      return count;
    } catch (error) {
      throw error;
    }
  },

  async checkTypeByID(id: string) {
    try {
      const client = await pool.connect();

      const querySQL = "SELECT COUNT(*) FROM Type_Vehicle WHERE id_type = $1";
      const totalTypes = await client.query(querySQL, [id]);

      const count = parseInt(totalTypes.rows[0].count, 10);

      client.release();
      return count;
    } catch (error) {
      throw error;
    }
  },

  async getTypes() {
    try {
      const client = await pool.connect();

      const querySQL = "SELECT id_type, name FROM Type_Vehicle;";
      const types: QueryResult<any> = await client.query(querySQL);

      if (types.rows.length > 0) {
        client.release();
        return types.rows;
      }

      client.release();
      return undefined;
    } catch (error) {
      throw error;
    }
  },

  async updateType(data: UpdateType) {
    try {
      const { id, name, updated_at } = data;
      const client = await pool.connect();

      const querySQL = `UPDATE Type_Vehicle SET name=$1, updated_at = $2 WHERE id_type = $3`;
      await client.query(querySQL, [name, updated_at, id]);

      client.release();
      return { id, name };
    } catch (error) {
      throw error;
    }
  },

  async typeDelete(id: string) {
    try {
      const client = await pool.connect();

      const querySQL = "DELETE FROM Type_Vehicle WHERE id_type = $1;";
      await client.query(querySQL, [id]);

      client.release();
      return { id };
    } catch (error) {
      throw error;
    }
  },
};
