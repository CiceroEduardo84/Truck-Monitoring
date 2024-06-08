import { postgreSqlConnection } from "..";
import { tableDrivers } from "./tableDrivers";
import { tableEntryHistory } from "./tableEntryHistory";
import { tableHistoricDriver } from "./tableHistoricDriver";
import { tableTypeVehicle } from "./tableTypeVehicles";
import { tableUser } from "./tableUser";
import { tableVehicles } from "./tableVehicle";

export async function runMigrations() {
  const schemas = [
    tableUser,
    tableDrivers,
    tableTypeVehicle,
    tableVehicles,
    tableHistoricDriver,
    tableEntryHistory,
  ].join("");

  postgreSqlConnection()
    .then((db) => db.query(schemas))
    .catch((error) => console.log(error));
}
