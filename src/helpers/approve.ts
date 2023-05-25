import { ethers } from "ethers";
import { CONFIGS } from "../config";
import { account } from "./uniswap";

let abi = [
  "function approve(address _spender, uint256 _value) public returns (bool success)",
];

let MAX_INT =
  "115792089237316195423570985008687907853269984665640564039457584007913129639935";

const value = ethers.utils.parseEther("0.00001");

export const approve = async (token: string) => {
  try {
    const contract = new ethers.Contract(token, abi, account);
    const tx = await contract.approve(CONFIGS.uniswapV2Router, MAX_INT, {
      gasLimit: 400000,
      maxFeePerGas: ethers.utils.parseUnits("20", "gwei"),
      maxPriorityFeePerGas: ethers.utils.parseUnits("5", "gwei"),
    });
    console.log("Approve tx", tx.hash);
    return { success: true, data: `${tx.hash}` };
  } catch (error) {
    console.log("error approving token", error);
    return { success: false, data: `error approving token ${error}` };
  }
};
