import { QueryResult } from "pg";
import { postgreSqlConnection } from "../databases/postgreSQL";
import {
  CreteVehicleTypes,
  UpadteVehicleTypes,
} from "../services/vehicleService";
import { VehiclePaginationSchema } from "../validations/vehiclePaginationSchema";
import { appError } from "../errors/appError";

export const VehicleRepository = {
  async createVehicle(data: CreteVehicleTypes) {
    try {
      const { id_vehicle, plate, type, nameDriver, status, id_user } = data;
      const db = await postgreSqlConnection();

      const querySQL =
        "INSERT INTO Vehicle (id_vehicle, plate, id_type, name_driver, status, id_user) VALUES ($1, $2, $3, $4, $5, $6)";
      await db.query(querySQL, [
        id_vehicle,
        plate,
        type,
        nameDriver,
        status,
        id_user,
      ]);

      return { id_vehicle, plate, type, nameDriver, status, id_user };
    } catch (error) {
      throw error;
    }
  },
  async getVehicleByID(id: string) {
    try {
      const db = await postgreSqlConnection();

      const queryUserSQL = "SELECT * FROM Vehicle WHERE id_vehicle = $1";
      const vehicle: QueryResult<any> = await db.query(queryUserSQL, [id]);

      if (vehicle.rows.length > 0) {
        const data = vehicle.rows[0];
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

      return undefined;
    } catch (error) {
      throw error;
    }
  },
  async getVehicles(data: VehiclePaginationSchema) {
    try {
      const { limit, offset, filter } = data;

      const db = await postgreSqlConnection();
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

      const vehicles: QueryResult<any> = await db.query(querySQL, [
        limit,
        offset,
      ]);

      if (vehicles.rows.length > 0) {
        return vehicles.rows;
      }

      return undefined;
    } catch (error) {
      throw error;
    }
  },
  async updateVehicle(data: UpadteVehicleTypes) {
    try {
      const { id_vehicle, plate, type, nameDriver, status, id_user, updated_at} = data;
      const db = await postgreSqlConnection();

      const querySQL = `
        UPDATE Vehicle 
        SET plate = $1, id_type = $2, name_driver = $3, status = $4, id_user = $5, updated_at=$6
        WHERE id_vehicle = $7;
      `;
      await db.query(querySQL, [plate, type, nameDriver, status, id_user, updated_at, id_vehicle,
      ]);

      return data;
    } catch (error) {
      throw error;
    }
  },
  async deleteVehicle(id: string) {
    try {
      const db = await postgreSqlConnection();

      const querySQL = "DELETE FROM Vehicle WHERE id_vehicle = $1;";
      await db.query(querySQL, [id]);

      return { id };
    } catch (error) {
      throw error;
    }
  },
};
