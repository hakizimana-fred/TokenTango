import { Environment } from '../configs/environment'
import { Context, Markup, Telegraf } from 'telegraf'
export class TelegramBotHelper {
  bot: Telegraf
  constructor() {
    this.bot = new Telegraf(Environment.TELEGRAM_TOKEN as string)
    this.startBot()
    this.actions()
  }
  startBot() {
    return this.bot.start((ctx: Context) => {

    ctx.replyWithDice()
      ctx.reply(`Welcome to ${Environment.Name}, A snipping bot you can trust!`, this.menu())
    })
  }

  menu() {
    return Markup.inlineKeyboard([
      Markup.button.callback(`🛍️ ${this.actionKeys().buy.toUpperCase()}`, `${this.actionKeys().buy}`),
      Markup.button.callback(`🛒 ${this.actionKeys().sell.toUpperCase()}`, `${this.actionKeys().sell}`),
      Markup.button.switchToChat(`👥 ${this.actionKeys().share.toUpperCase()}`, 
      'Share our bot with friends!'),
      Markup.button.switchToChat(`📥 ${this.actionKeys().export.toUpperCase()}`, 
      'Export your trades history!'),
    ])
  } 

  actionKeys() {
    return {
      buy: 'buy',
      sell: 'sell',
      export: 'export',
      share: 'share',
    }
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
  
  actions() {
    this.bot.action('buy', (ctx) => {
      ctx.reply('You have successfully bought the snipped tokens!')
    })
  }

  
}
