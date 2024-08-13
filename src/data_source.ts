import { DataSource } from "typeorm";
import "reflect-metadata";
import { config } from "./config";

export const AppDataSource = new DataSource({
  type: (config.database.connection as "mysql") ?? "mysql",
  host: config.database.host ?? "localhost",
  port: config.database.port ?? 3306,
  username: config.database.username ?? "",
  password: config.database.password ?? "",
  database: config.database.database ?? "",
  synchronize: false,
  logging: true,
  entities: [__dirname + "/models/*.ts"],
  migrations: [__dirname + "/database/migrations/*.ts"],
  subscribers: [],
});
