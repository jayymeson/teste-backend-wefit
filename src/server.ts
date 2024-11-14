import "reflect-metadata";
import * as dotenv from "dotenv";
dotenv.config(); 
import { AppDataSource } from "./infra/adapters/orm/typeorm/config";
import app from "./app";

const port = process.env.PORT || 4568;

AppDataSource.initialize()
  .then(() => {
    console.log("Database connected successfully");

    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch((error: any) => {
    console.error("Database connection failed", error);
  });
