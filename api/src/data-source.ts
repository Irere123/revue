import "reflect-metadata";
import { DataSource } from "typeorm";

import { User } from "./entity/User";
import { IS_PROD } from "./lib/constants";

export const AppDataSource = new DataSource({
  type: "postgres",
  url: process.env.DATABASE_URL,
  entities: [User],
  synchronize: !IS_PROD,
});
