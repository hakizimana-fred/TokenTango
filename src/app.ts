import express from "express";
import "dotenv/config";
import logger from "./lib/logger";
import appMiddleware from "./middleware/global";
import { MempoolTxns } from "./lib/exchange/uniswap";
import { Environment } from "./configs/environment";
import { createServer } from "http";
import { HEALTH_INTERVAL_CHECK } from "./constants";

const app = express();
const server = createServer(app);

const run = async () => {
  try {
    server.listen(Environment.PORT, async () => {
      logger.info(`server started on port ${Environment.PORT}`);
      appMiddleware(app);
      //await new MempoolTxns().getPendingTxns();

      // Monitor server health
      const healthCheckInterval = setInterval(() => {
        app.get("/healthcheck", (_req, res) => {
          res.json({ message: "Server healthy" });
        });
      }, HEALTH_INTERVAL_CHECK);

      process.on("SIGTERM", () => {
        clearInterval(healthCheckInterval);
        server.close((error: Error | undefined) => {
          if (error) {
            logger.error(`Error during server close: ${error}`);
            process.exit(1);
          }
          logger.log(`server closed gracefully`);
          process.exit(0);
        });
      });
    });
  } catch (e) {}
};

void run().catch((e) => logger.error(e.message));
