import { ethers, utils } from "ethers";
import { UNISWAP_ABI } from "../constants/uniswap";
import { CONFIGS } from "../config";

const erc20interface = new utils.Interface(UNISWAP_ABI);

export const provider = new ethers.providers.WebSocketProvider(
  CONFIGS.provider
);

export const decode = (data: string) => {
  //console.log("Starting Decoding!", inputData);
  const decodedData = erc20interface.parseTransaction({ data });

  console.log(decodedData, "decoded data");
  return decodedData;
};
