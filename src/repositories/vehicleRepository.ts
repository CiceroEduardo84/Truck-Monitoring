import { QueryResult } from "pg";
import { postgreSqlConnection } from "../databases/postgreSQL";
import { CreteVehicleTypes } from "../services/vehicleService";
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
};
