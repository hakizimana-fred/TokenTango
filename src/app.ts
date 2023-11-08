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
import logger from "./lib/logger";

const app = express();
const start = async () => {
  try {
    logger.info("Starting well ");
  } catch (e) {
    logger.log(e.message);
  }
};

void start().catch((e) => logger.log(e.message));
