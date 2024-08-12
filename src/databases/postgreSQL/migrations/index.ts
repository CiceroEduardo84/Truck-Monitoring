import { pool } from "..";
import { createAdminUser } from "./seed";
import { tableTypeVehicle } from "./tableTypeVehicles";
import { tableUser } from "./tableUser";
import { tableVehicles } from "./tableVehicle";

export async function runMigrations() {
  const schemas = [tableUser, tableTypeVehicle, tableVehicles].join("");

  try {
    const client = await pool.connect();

    await client.query(schemas);
    await createAdminUser();

    client.release();
  } catch (error) {
    console.log(error);
  }
}
