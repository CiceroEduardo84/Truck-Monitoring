import { Pool } from "pg";
import "dotenv/config";

export async function postgreSqlConnection() {
  const db = new Pool({
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    host: process.env.PGHOST,
    port: process.env.PGPORT,
    database: process.env.PGDATABASE,
  });

  const client = await db.connect();

  return client;
}
