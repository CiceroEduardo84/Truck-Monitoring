import express from "express";
import cookieParser from "cookie-parser";
import { pageNotFound } from "./errors/pageNotFound";
import { postgreSqlConnection } from "./databases/postgreSQL";
import { appErrors } from "./errors/appErrors";
import { routers } from "./routes";
import cors from "cors";
import "dotenv/config";
import { runMigrations } from "./databases/postgreSQL/migrations";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cookieParser());

const whiteList = [
  "http://localhost:5173",
  "http://127.0.0.1:5173",
  process.env.CLIENT_SIDE,
];

app.use(
  cors({
    origin: whiteList,
    credentials: true,
  })
);
app.use(routers);

app.use(pageNotFound);
app.use(appErrors);

app.listen(PORT, () => {
  console.log(`Server running in the PORT: http://localhost:${PORT}/`);
});

postgreSqlConnection()
  .then(() => console.log("Database is connected..."))
  .catch((error) => console.error("Database isn't connected -", error));

runMigrations();