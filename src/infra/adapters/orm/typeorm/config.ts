import "reflect-metadata";
import * as dotenv from "dotenv";
dotenv.config(); 
import { DataSource } from "typeorm";
import { Profile } from "./schemas/profile.schema";


export const AppDataSource = new DataSource({
  type: "mysql",
  host: process.env.DB_HOST || "localhost",
  port: Number(process.env.MYSQLDB_PORT) || 3306,
  username: "root",
  password: process.env.MYSQLDB_PASSWORD,
  database: process.env.MYSQLDB_DATABASE,
  entities: [Profile],
  migrations: ["src/infra/adapters/orm/typeorm/migrations/*.ts"],
  migrationsTableName: "migrations",
  synchronize: false,
  logging: true,
});