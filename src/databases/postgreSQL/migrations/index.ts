import { postgreSqlConnection } from "..";
import { createdAdminUser } from "./seed";
import { tableTypeVehicle } from "./tableTypeVehicles";
import { tableUser } from "./tableUser";
import { tableVehicles } from "./tableVehicle";

export async function runMigrations() {
  const schemas = [tableUser, tableTypeVehicle, tableVehicles].join("");

  postgreSqlConnection()
    .then((db) => db.query(schemas))
    .catch((error) => console.log(error));

  createdAdminUser();
}
