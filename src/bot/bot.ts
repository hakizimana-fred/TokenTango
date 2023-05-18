import { memPools } from "../exchange/Pending";
import { CONFIGS } from "../config";
import { Context, Telegraf } from "telegraf";
import { normalizeMessage } from "../helpers/messages";

const bot = new Telegraf(CONFIGS.telegramToken);
bot.start(async (ctx) => {
  // Start monitoring Mempool

  ctx.replyWithDice();
  ctx.reply(
    `Welcome ${ctx.message.from.first_name}.TokenTango will notify you on tokens that have just added liquidity and facilitate buys and sells on Uniswap.`
  );
});

export const sendMessage = async (msg: string, deleteMsg?: false) => {
  try {
    for (const id of CONFIGS.authorisedUsers) {
      await bot?.telegram
        .sendMessage(id, normalizeMessage(msg), {
          parse_mode: "MarkdownV2",
          disable_web_page_preview: true,
        })
        .then(({ message_id }) => {
          if (deleteMsg) {
            setTimeout(() => {
              bot.telegram.deleteMessage(id, message_id),
                CONFIGS.messageInterval!;
            });
          }
        })
        .catch((error: any) => {
          console.log(error);
        });
    }
  } catch (error: any) {
    console.log(error);
  }
};



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
