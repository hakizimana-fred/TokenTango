import { memPools } from "../exchange/Pending";
import { CONFIGS } from "../config";
import { Telegraf } from "telegraf";

const bot = new Telegraf(CONFIGS.telegramToken);
bot.start(async (ctx) => {
  // Start monitoring Mempool

  ctx.replyWithDice();
  ctx.reply(
    `Welcome ${ctx.message.from.first_name}.To monitor transactions, initiate /monitor\ command \n`
  );
});

bot.command("monitor", async (ctx) => {
  //await memPools.getPendingTxns();
  const data: any = memPools.replies;
  const methodName = data.get("method");
  if (methodName) {
    console.log(methodName, "...Test MEthod");
    ctx.reply(methodName);
  }
});

export { bot };
