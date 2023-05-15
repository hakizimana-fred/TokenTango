import express from "express";
import { CONFIGS } from "./config";
import appMiddleware from "./middlewares/appMiddleware";
import router from "./routes/apis/routes";
import "dotenv/config";

const app = express();

const start = () => {
  appMiddleware(app);

  app.get("/healthcheck", (_req, res) => res.send("welcome"));
  app.use("/api/v1", router);

  app.listen(CONFIGS.port, () => {
    console.log(`app running on port ${CONFIGS.port}`);
  });
};

void start();
