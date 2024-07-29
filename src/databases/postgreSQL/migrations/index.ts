import { postgreSqlConnection } from "..";
import { createAdminUser } from "./seed";
import { tableTypeVehicle } from "./tableTypeVehicles";
import { tableUser } from "./tableUser";
import { tableVehicles } from "./tableVehicle";

export async function runMigrations() {
  const schemas = [tableUser, tableTypeVehicle, tableVehicles].join("");

  try {
    const db = await postgreSqlConnection();
    await db.query(schemas);

    await createAdminUser();
  } catch (error) {
    console.log(error);
  }
}
