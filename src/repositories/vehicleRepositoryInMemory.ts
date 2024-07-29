import {
  CreteVehicleTypes,
  ReadVehicleTypes,
  UpadateVehicleTypes,
} from "../services/vehicleService";
import { VehiclePaginationSchema } from "../validations/vehiclePaginationSchema";

const vehicles: CreteVehicleTypes[] = [
  {
    id_vehicle: "1",
    plate: "AAA0A00",
    type: "3",
    nameDriver: "Arthur Jose Da silveira",
    status: "awaiting",
    id_user: "1",
  },

  {
    id_vehicle: "2",
    plate: "BBB1B11",
    type: "3",
    nameDriver: "Carlos Jose Da Cunha",
    status: "finished",
    id_user: "3",
  },
];

export const vehicleRepositoryInMemory = {
  async createVehicle(data: CreteVehicleTypes) {
    try {
      const { id_vehicle, plate, type, nameDriver, status, id_user } = data;

      const createVehicle = {
        id_vehicle,
        plate,
        type,
        nameDriver,
        status,
        id_user,
      };

      vehicles.push(createVehicle);

      return { id_vehicle, plate, type, nameDriver, status, id_user };
    } catch (error) {
      throw error;
    }
  },

  async getVehicleByID(id: string) {
    try {
      const getVehicle = vehicles.find((vehicle) => vehicle.id_vehicle == id);

      if (getVehicle) {
        const newVehicles = {
          ...getVehicle,
          updated_at: new Date().toISOString(),
          created_at: new Date().toISOString(),
        };

        return newVehicles;
      }
      
      return undefined;
    } catch (error) {
      throw error;
    }
  },

  async getVehicles(data: VehiclePaginationSchema) {
    try {
      const { limit, offset, filter } = data;

      const newVehicles = vehicles.map((vehicle) => ({
        ...vehicle,
        updated_at: new Date().toISOString(),
        created_at: new Date().toISOString(),
      }));

      if (filter == "all") {
        return newVehicles as ReadVehicleTypes[];
      } else {
        const filteredVehicles = newVehicles.filter(
          (vehicle) => vehicle.status == filter
        );
        const paginatedVehicles = filteredVehicles.reverse();
        return paginatedVehicles as ReadVehicleTypes[];
      }
    } catch (error) {
      throw error;
    }
  },

  async updateVehicle(data: UpadateVehicleTypes) {
    try {
      const {id_vehicle, plate, type, nameDriver, status, id_user, updated_at} = data;

      const vehicleUpdate = {
        id_vehicle, plate, type, nameDriver, status, id_user
      };

      const indexVehicle = vehicles.findIndex((vehicle) => vehicle.id_user == id_user);

      if (indexVehicle == -1) return;

      vehicles.splice(indexVehicle, 1, vehicleUpdate);
      return { id_vehicle, plate, type, nameDriver, status, id_user, updated_at };
    } catch (error) {
      throw error;
    }
  },

  async deleteVehicle(id: string) {
    try {
      if (id == "2") return { id: undefined };
      const indexVehicle = vehicles.findIndex(
        (vehicle) => vehicle.id_vehicle == id
      );

      vehicles.splice(indexVehicle, 1);

      return { id };
    } catch (error) {
      throw error;
    }
  },
};
