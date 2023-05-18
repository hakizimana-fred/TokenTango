import "dotenv/config";

export const CONFIGS = {
  port: process.env.PORT,
  provider: process.env.WS_PROVIDER as string,
  methods: ["addLiquidityETH"],
  privateKey: process.env.PRIVATE_KEY as string,
  telegramToken: process.env.TELEGRAM_TOKEN as string,
  etherscanApiKey: process.env.ETHERSCAN_API_KEY as string,
  authorisedUsers: [956852610, 1864820807],
  messageInterval: 10
};
