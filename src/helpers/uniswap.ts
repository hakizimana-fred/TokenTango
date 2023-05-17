import { ethers, utils } from "ethers";
import { UNISWAP_ABI } from "../constants/uniswap";
import { CONFIGS } from "../config";

export const abiInterface = new utils.Interface(UNISWAP_ABI);

export const provider = new ethers.providers.WebSocketProvider(
  CONFIGS.provider
);
export const signer = new ethers.Wallet(CONFIGS.privateKey);
const account = signer.connect(provider);

export const ethContract = new ethers.Contract(
  "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D",
  UNISWAP_ABI,
  account
);

export const buy = () => {};

// get account balance
export const walletBalance = async () => {
  const wallet = new ethers.Wallet(CONFIGS.privateKey, provider);
  const balance = await wallet.getBalance();
  const readableBalance = ethers.utils.formatEther(balance);
  console.log("Readable Balance: ", parseFloat(readableBalance).toFixed(4));

  return readableBalance;
};
