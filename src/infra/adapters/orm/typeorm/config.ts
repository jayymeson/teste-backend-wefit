import { DataSource } from "typeorm";
import { Profile } from "./schemas/profile.schema";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: process.env.DB_HOST,
  port: Number(process.env.MYSQLDB_PORT) || 3306,
  username: "root",
  password: process.env.MYSQLDB_PASSWORD,
  database: process.env.MYSQLDB_DATABASE,
  entities: [Profile],
  synchronize: true,
  logging: true,
});