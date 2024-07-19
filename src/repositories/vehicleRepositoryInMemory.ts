import { CreteVehicleTypes } from "../services/vehicleService";

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
};