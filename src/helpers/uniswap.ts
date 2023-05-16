import { ethers, utils } from "ethers";
import { UNISWAP_ABI } from "../constants/uniswap";
import { CONFIGS } from "../config";

export const abiInterface = new utils.Interface(UNISWAP_ABI);

export const provider = new ethers.providers.WebSocketProvider(
  CONFIGS.provider
);
