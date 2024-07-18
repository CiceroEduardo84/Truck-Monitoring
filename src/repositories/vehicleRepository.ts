import { postgreSqlConnection } from "../databases/postgreSQL";
import { CreteVehicleTypes } from "../services/vehicleService";

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
};
