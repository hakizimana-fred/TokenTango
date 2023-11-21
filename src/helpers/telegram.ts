import { Environment } from '../configs/environment'
import { Telegraf } from 'telegraf'
export class TelegramBotHelper {
  bot: Telegraf
  constructor() {
    this.bot = new Telegraf(Environment.TELEGRAM_TOKEN as string)
    this.startBot()
  }
  startBot() {
    return this.bot.start((ctx: any) => {

    ctx.replyWithDice()
      ctx.reply(`Welcome!!!`)
    })
  }

  launchBot() {
     console.log(`---`.repeat(10));
     console.log(`starting bot  🤖 `);
    console.log(`---`.repeat(10));
    this.bot
    .launch()
    .then(() => {})
    .catch((e) => console.error(e.message))

  }
}
