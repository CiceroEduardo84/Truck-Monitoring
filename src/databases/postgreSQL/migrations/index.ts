import { postgreSqlConnection } from "..";


export async function runMigrations() {
  const schemas = [].join("");

  postgreSqlConnection()
    .then((db) => db.query(schemas))
    .catch((error) => console.log(error));

  return;
}
