import express from "express";
import { CONFIGS } from "./config";
import appMiddleware from "./middlewares/appMiddleware";
import router from "./routes/apis/routes";
import "dotenv/config";
import { memPools } from "./exchange/Pending";
import { bot } from "./bot/bot";

const app = express();

//Start Telegram Bot
const startBot = () => {
  console.log(`---`.repeat(10));
  console.log(`starting bot  🤖 `);
  console.log(`---`.repeat(10));
  bot
    .launch()
    .then(() => {})
    .catch((e) => {
      console.error(e.message);
    });
};

const start = () => {
  appMiddleware(app);

  app.get("/healthcheck", (_req, res) => res.send("welcome"));
  app.use("/api/v1", router);

  app.listen(CONFIGS.port, async () => {
    console.log(`app running on port ${CONFIGS.port}`);
    // mempool
    await memPools.getPendingTxns();
  });
  startBot();
};

void start();
