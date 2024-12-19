import "reflect-metadata";
import { DataSource } from "typeorm";

import { IS_PROD } from "./lib/constants";
import { User } from "./entity/User";

export const AppDataSource = new DataSource({
  type: "postgres",
  url:
    process.env.DATABASE_URL ||
    "potsgres://postgres:postgres@localhost:5432/revue",
  entities: [User],
  ssl: IS_PROD,
  logging: !IS_PROD,
  migrations: ["build/migration/*.js"],
});
