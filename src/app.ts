import express from "express";
import "dotenv/config";
import logger from "./lib/logger";
import appMiddleware from "./middleware/global";
import { MempoolTxns } from "./lib/exchange/uniswap";
import { normalizePort } from "./utils/portNormalizer";

const app = express();
const PORT = normalizePort(process.env.PORT as string);

const run = async () => {
  try {
    // middlware
    appMiddleware(app);
    //routes
    app.get("/healthcheck", (_req, res) => res.send("welcome"));

    app.listen(PORT, async () => {
      logger.info(`server started on port ${PORT}`);
      await new MempoolTxns().getPendingTxns();
    });
  } catch (e) {}
};

void run().catch((e) => logger.error(e.message));
