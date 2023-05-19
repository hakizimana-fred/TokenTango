import express from "express";
import { CONFIGS } from "./config";
import appMiddleware from "./middlewares/appMiddleware";
import router from "./routes/apis/routes";
import "dotenv/config";
import { memPools } from "./exchange/Pending";
import { bot, sendMessage } from "./bot/bot";
import { approve, buyToken, checkLiquidity, sellToken } from "./helpers";

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
    // test liquidity

    // mempool
    // await memPools.getPendingTxns();
    const buyStatus = await buyToken([
      "0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6",
      "0x1f9840a85d5af5bf1d1762f925bdaddc4201f984",
    ]);

    sendMessage(
      `Successfull bought UNISWAP, symbol: UNI with address: 0x1a1500c91ac9967acb8d5f2ffd3d57b475fa593d \nTransaction Hash: \`${buyStatus}\``
    );

    console.log("Buy Txn: ", buyStatus);

    // const sellStatus = await sellToken([
    //   "0x1f9840a85d5af5bf1d1762f925bdaddc4201f984",
    //   "0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6",
    // ]);

    // console.log(sellStatus, "sold");
  });
  startBot();
};

void start();
