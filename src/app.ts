import express from "express";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./config/swagger";
import profileRoutes from "./http/routes/index.routes";


const app = express();

app.use(express.json());
app.use("/api", profileRoutes);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get("/ping", (req, res) => {
  return res.send("pong");
});

export default app;
