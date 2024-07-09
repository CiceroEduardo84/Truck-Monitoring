import { TypeVehicle } from "../services/typeVehicleService";

const types: TypeVehicle[] = [
  {
    id: "1",
    name: "truck",
  },

  {
    id: "2",
    name: "9 Eixos",
  },
];

export const typeVehicleRepositoryInMemory = {
  async createType(data: TypeVehicle) {
    try {
      const { id, name } = data;

      const type = {
        id,
        name,
      };

      types.push(type);
      return { id, name };
    } catch (error) {
      throw error;
    }
  },

  async checkType(name: string) {
    const typeExists = types.find((type) => type.name == name);
    console.log(typeExists);

    if (typeExists) return 1;

    return 0;
  },
};
