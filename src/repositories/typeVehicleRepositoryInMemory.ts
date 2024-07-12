import {
  ReadTypes,
  TypeVehicle,
  UpdateType,
} from "../services/typeVehicleService";

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
    try {
      const typeExists = types.find((type) => type.name == name);
      if (typeExists) return 1;

      return 0;
    } catch (error) {
      throw error;
    }
  },

  async checkTypeByID(id: string) {
    try {
      const typeExists = types.find((type) => type.id == id);
      if (typeExists) return 1;

      return 0;
    } catch (error) {
      throw error;
    }
  },

  async getTypes() {
    try {
      const readTypes = types.map(({ id, ...rest }) => ({
        id_type: id,
        ...rest,
      }));

      return readTypes as ReadTypes[];
    } catch (error) {
      throw error;
    }
  },

  async updateType(data: UpdateType) {
    try {
      const { id, name, updated_at } = data;
      const typeUpdated = {
        id,
        name,
        updated_at,
      };

      const indexType = types.findIndex((type) => type.id == id);

      if (indexType == -1) return;

      types.splice(indexType, 1, typeUpdated);
      return { id, name };
    } catch (error) {
      throw error;
    }
  },

  async typeDelete(id: string) {
    try {
      if (id == "2") return undefined;
      const indexType = types.findIndex((type) => type.id == id);

      types.splice(indexType, 1);

      return { id };
    } catch (error) {
      throw error;
    }
  },
};
