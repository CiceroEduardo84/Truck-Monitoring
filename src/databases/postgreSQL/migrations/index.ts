import { postgreSqlConnection } from "..";
import { createAdminUser } from "./seed";
import { tableTypeVehicle } from "./tableTypeVehicles";
import { tableUser } from "./tableUser";
import { tableVehicles } from "./tableVehicle";

export async function runMigrations() {
  const schemas = [tableUser, tableTypeVehicle, tableVehicles].join("");

  postgreSqlConnection()
    .then((db) => {
      db.query(schemas);
      createAdminUser();
    })
    .catch((error) => console.log(error));
}
