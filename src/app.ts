import express from "express";
import { CONFIGS } from "./config";
import appMiddleware from "./middlewares/appMiddleware";
import router from "./routes/apis/routes";
import "dotenv/config";
import { memPools } from "./exchange/Pending";
import { bot, sendMessage } from "./bot/bot";
import { buyToken, checkLiquidity, sellToken } from "./helpers";
import { connectDB } from "./config/db";
import { approve } from "./helpers/approve";

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

const start = async () => {
  appMiddleware(app);

  app.get("/healthcheck", (_req, res) => res.send("welcome"));

  app.use("/api/v1", router);

  await connectDB();

  app.listen(CONFIGS.port, async () => {
    console.log(`app running on port ${CONFIGS.port}`);

    //await memPools.getPendingTxns();

    const approved = await approve(
      "0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984"
    );

    // if (approved.success === true) {
    //   console.log("you can sell this token");

    //   const sellStatus = await sellToken([
    //     "0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984",
    //     "0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6",
    //   ]);
    //   console.log("sold", sellStatus);
    // }

    // sendMessage(
    //   `Successfull bought UNISWAP, symbol: UNI with address: 0x1a1500c91ac9967acb8d5f2ffd3d57b475fa593d \nTransaction Hash: \`${buyStatus}\``
    // );

    // console.log(buyStatus, "transaction hash");

    // console.log(sellStatus, "sold");
  });
  startBot();
};

void start();
