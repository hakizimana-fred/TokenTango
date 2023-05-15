import { providers, utils } from "ethers";
//import  uniswapABI from '../uniswapABI.json';
import { UNISWAP_ABI as abi } from "../constants/uniswap";

const erc20interface = new utils.Interface(abi);
const provider = new providers.WebSocketProvider(
  "wss://mainnet.infura.io/ws/v3/dd5157314bfc49f499f6f8afabede0e8"
);
export const decodeContract = () => {
  try {
    provider.on("pending", async (txHash: string) => {
      const txResponse = await getTx(txHash);
      if (txResponse) {
        const inputData = txResponse.data;
        if (inputData != "0x") {
          const txData = decode(inputData);
          if (txData) {
            console.log(txData, "data");
            // console.log('\n\n ', txData!.name, txHash, new Date())
          }
        }
      } else {
        wait(15000);
        const txResponse = await getTx(txHash);
        if (txResponse) {
          const inputData = txResponse!.data;
          if (inputData != "0x") {
            const txData = decode(inputData);
            if (txData) {
              // console.log('\n\n ', txData!.name, txHash, new Date())
            }
          }
        }
      }
    });
  } catch (error) {
    console.log("Error ", error);
  }
};

//decodeContract();
const getTx = async (txHash: string) => {
  try {
    const txResponse = await provider.getTransaction(txHash);
    return txResponse;
  } catch (error) {
    console.log("Error getting tx ", txHash, error);
  }
};
export const decode = (inputData: string) => {
  try {
    const txData = erc20interface.parseTransaction({ data: inputData });
    return txData;
  } catch (error) {}
};
const wait = async (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};
