import "dotenv/config";

export const CONFIGS = {
  port: process.env.PORT,
  provider: process.env.WS_PROVIDER as string,
  methods: ["addLiquidityETH"],
  privateKey: process.env.PRIVATE_KEY as string,
};
