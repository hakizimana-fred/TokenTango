import { ethers, utils } from "ethers";
import { UNISWAP_ABI } from "../constants/uniswap";
import { CONFIGS } from "../config";
import { Overloads } from "../exchange/Pending";
import { abi as ABI } from "@uniswap/v3-core/artifacts/contracts/UniswapV3Factory.sol/UniswapV3Factory.json";

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

export const walletAddress = "0x6b745bB12b5ce396aF3058313c94303741C87E21";

const wallet = new ethers.Wallet(CONFIGS.privateKey, provider);

export const buyToken = async (tokenInAndTokenOut: string[]) => {
  try {
    const value = ethers.utils.parseEther("0.01");
    const deadline = Math.floor(Date.now() / 1000) + 60 * 20; // 20 minutes from now
    const amountOutMin = ethers.utils.parseUnits("0", 18);
    const txn = await ethContract.swapExactETHForTokens(
      amountOutMin,
      tokenInAndTokenOut,
      wallet.address,
      deadline,
      {
        value: value,
        gasLimit: 50000,
        maxFeePerGas: ethers.utils.parseUnits("20", "gwei"),
        maxPriorityFeePerGas: ethers.utils.parseUnits("5", "gwei"),
      }
    );
    console.log(`Transaction hash: ${txn.hash}`);
  } catch (error) {
    console.log("Error swapping exact ETH for token  ", error);
    return { success: false, data: error };
  }
};

// get account balance
export const walletBalance = async () => {
  const wallet = new ethers.Wallet(CONFIGS.privateKey, provider);
  const balance = await wallet.getBalance();
  const readableBalance = ethers.utils.formatEther(balance);
  console.log("Readable Balance: ", parseFloat(readableBalance).toFixed(4));

  return readableBalance;
};
