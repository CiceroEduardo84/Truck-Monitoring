import { QueryResult } from "pg";
import {
  CreteVehicleTypes,
  UpadateVehicleTypes,
} from "../services/vehicleService";
import { VehiclePaginationSchema } from "../validations/vehiclePaginationSchema";
import { appError } from "../errors/appError";
import { pool } from "../databases/postgreSQL";

export const VehicleRepository = {
  async createVehicle(data: CreteVehicleTypes) {
    try {
      const { id_vehicle, plate, type, nameDriver, status, id_user } = data;
      const client = await pool.connect();

      const querySQL =
        "INSERT INTO Vehicle (id_vehicle, plate, id_type, name_driver, status, id_user) VALUES ($1, $2, $3, $4, $5, $6)";
      await client.query(querySQL, [
        id_vehicle,
        plate,
        type,
        nameDriver,
        status,
        id_user,
      ]);

      client.release();
      return { id_vehicle, plate, type, nameDriver, status, id_user };
    } catch (error) {
      throw error;
    }
  },
  async getVehicleByID(id: string) {
    try {
      const client = await pool.connect();

      const queryUserSQL = "SELECT * FROM Vehicle WHERE id_vehicle = $1";
      const vehicle: QueryResult<any> = await client.query(queryUserSQL, [id]);

      if (vehicle.rows.length > 0) {
        const data = vehicle.rows[0];
        client.release();

        return {
          id_vehicle: data.id_vehicle,
          plate: data.plate,
          type: data.id_type,
          nameDriver: data.name_driver,
          status: data.status,
          id_user: data.id_user,
          created_at: data.created_at,
          updated_at: data.updated_at,
        };
      }

      client.release();
      return undefined;
    } catch (error) {
      throw error;
    }
  },
  async getVehicles(data: VehiclePaginationSchema) {
    try {
      const { limit, offset, filter } = data;

      const client = await pool.connect();
      let querySQL = "";

      switch (filter) {
        case "all":
          querySQL = `
            SELECT * FROM Vehicle
            ORDER BY updated_at DESC
            LIMIT $1 OFFSET $2;
          `;
          break;

        case "awaiting":
          querySQL = `
              SELECT * FROM Vehicle 
              WHERE status = 'awaiting'
              ORDER BY updated_at DESC 
              LIMIT $1 OFFSET $2;
            `;
          break;

        case "enter":
          querySQL = `
            SELECT * FROM Vehicle 
            WHERE status = 'enter'
            ORDER BY updated_at DESC 
            LIMIT $1 OFFSET $2;
          `;
          break;

        case "loading":
          querySQL = `
            SELECT * FROM Vehicle 
            WHERE status = 'loading'
            ORDER BY updated_at DESC 
            LIMIT $1 OFFSET $2;
          `;
          break;

        case "finished":
          querySQL = `
            SELECT * FROM Vehicle 
            WHERE status = 'finished'
            ORDER BY updated_at DESC 
            LIMIT $1 OFFSET $2;
          `;
          break;

        default:
          throw appError("invalid filter!", 400);
      }

      const vehicles: QueryResult<any> = await client.query(querySQL, [
        limit,
        offset,
      ]);

      if (vehicles.rows.length > 0) {
        client.release();

        return vehicles.rows;
      }

      client.release();
      return undefined;
    } catch (error) {
      throw error;
    }
  },
  async updateVehicle(data: UpadateVehicleTypes) {
    try {
      const {
        id_vehicle,
        plate,
        type,
        nameDriver,
        status,
        id_user,
        updated_at,
      } = data;
      const client = await pool.connect();

      const querySQL = `
        UPDATE Vehicle 
        SET plate = $1, id_type = $2, name_driver = $3, status = $4, id_user = $5, updated_at=$6
        WHERE id_vehicle = $7;
      `;
      await client.query(querySQL, [
        plate,
        type,
        nameDriver,
        status,
        id_user,
        updated_at,
        id_vehicle,
      ]);

      client.release();
      return data;
    } catch (error) {
      throw error;
    }
  },
  async deleteVehicle(id: string) {
    try {
      const client = await pool.connect();

      const querySQL = "DELETE FROM Vehicle WHERE id_vehicle = $1;";
      await client.query(querySQL, [id]);

      client.release();
      return { id };
    } catch (error) {
      throw error;
    }
  },
};
