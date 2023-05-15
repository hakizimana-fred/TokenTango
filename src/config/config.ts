import "dotenv/config";

export const CONFIGS = {
  port: process.env.PORT,
  provider: process.env.WS_PROVIDER as string,
};
