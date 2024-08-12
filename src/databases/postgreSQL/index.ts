import "dotenv/config";
import { Pool } from "pg";

export const pool = new Pool({
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  host: process.env.PGHOST,
  port: process.env.PGPORT,
  database: process.env.PGDATABASE,
  max: process.env.MAX,
  idleTimeoutMillis: process.env.IDLETIMEOUTMILLIS,
  connectionTimeoutMillis: process.env.CONNECTIONTIMEOUTMILLIS,
});
