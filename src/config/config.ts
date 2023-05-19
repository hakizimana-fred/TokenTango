import "dotenv/config";

export const CONFIGS = {
  port: process.env.PORT,
  provider: process.env.WS_PROVIDER as string,
  methods: ["addLiquidityETH"],
  privateKey: process.env.PRIVATE_KEY as string,
  telegramToken: process.env.TELEGRAM_TOKEN as string,
  etherscanApiKey: process.env.ETHERSCAN_API_KEY as string,
  authorisedUsers: [956852610, 1864820807, 671798413],
  messageInterval: 10,
  uniswapV2Router: "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D",
  weiAddress: "0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6",
};
