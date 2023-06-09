import { memPools } from "../exchange/Pending";
import { CONFIGS } from "../config";
import { Context, Telegraf } from "telegraf";
import { normalizeMessage } from "../helpers/messages";
import { approve } from "../helpers/approve";
import { sellToken } from "../helpers";

const bot = new Telegraf(CONFIGS.telegramToken);
bot.start(async (ctx) => {
  ctx.replyWithDice();
  ctx.reply(
    `Welcome ${ctx.message.from.first_name}.TokenTango will notify you on tokens that have just added liquidity and facilitate buys and sells on Uniswap.`
  );
});

export const sendMessage = async (msg: string) => {
  try {
    for (const id of CONFIGS.authorisedUsers) {
      await bot?.telegram
        .sendMessage(id, normalizeMessage(msg), {
          parse_mode: "MarkdownV2",
          disable_web_page_preview: true,
        })
        .then(() => {
          console.log("message has been sent to telegram");
        })
        .catch((error: any) => {
          console.log(error);
        });
    }
  } catch (error: any) {
    console.log(error);
  }
};

bot.command('sell', async (ctx) => {

  const args = ctx.message.text.split(' ').slice(1);

  if (args.length > 2) {
    console.log('too many arguments')
    return
  }
  const [tokenAddress, amount] = args
  

  // approve
 const approved = await approve(tokenAddress)

 if (approved.success) {
  // sell
  const sold = await sellToken([tokenAddress, '0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6'], amount)
  
  await sendMessage(`Sold successfully ${sold}`)
 }
})

export { bot };
