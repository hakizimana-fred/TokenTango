import { ethers } from "ethers";
import { CONFIGS } from "../config";

export const provider = new ethers.providers.WebSocketProvider(
  CONFIGS.provider
);
