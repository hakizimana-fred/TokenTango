import { ethers, providers, utils } from "ethers";
import axios from "axios";
import { abiInterface, buyToken, provider, walletBalance } from "../helpers";
import { CONFIGS } from "../config";
import Token from "../models/Token";

export interface Overloads {
  gasLimit: any;
  nonce?: any;
  gasPrice?: number;
  maxPriorityFeePerGas?: number;
  maxFeePerGas?: number;
  value?: any;
}

let overloads: Overloads;

class MempoolTxns {
  public transaction: any;
  async getPendingTxns() {
    provider.on("pending", async (transaction): Promise<void> => {
      try {
        const transactionInfo = await provider.getTransaction(transaction);
        // console.log("transactions", transactionInfo?.hash);

        transactionInfo && (await this.processAndDecode(transactionInfo));
      } catch (e: any) {
        throw new Error(e.message);
      }
    });
  }

  async processAndDecode(transactionInfo: providers.TransactionResponse) {
    const { data } = transactionInfo;

    try {
      const decoded = abiInterface.parseTransaction({ data });
      const { name: methodName } = decoded;
      console.log(methodName, "methods available");
      if (CONFIGS.methods.includes(methodName)) {
        console.log("found a match");
        const token = decoded.args.token.toLowerCase();
        const byteCode = await provider.getCode(token);

        this.checkNameAndRug(token, byteCode, provider);

        // buy || swap token
      }
    } catch (error) {
      //console.log(error.message);
    }
  }

  async checkNameAndRug(tokenAddress: string, byteCode: string, provider: any) {
    try {
      const {
        data: { result: abi },
      } = await axios.get(
        `https://api-goerli.etherscan.io/api?module=contract&action=getabi&address=${tokenAddress}&apikey=I8QQ8KWFUEGSCU2WH4239WQP8G5WIHS8FR`
      );
      // check if abi is valid
      if (abi.includes("Contract source code not verified")) {
        console.log("rug found");
      } else {
        console.log("abi", abi);
        const tokenContract = new ethers.Contract(tokenAddress, abi, provider);
        const name = await tokenContract.name();
        const symbol = await tokenContract.symbol();
        console.log(name, symbol, "token info");

        if (tokenAddress) {
          let tokenInAndTokenOut = [
            "0xFfb99f4A02712C909d8F7cC44e67C87Ea1E71E83",
            tokenAddress,
          ];
          let buyTxData = await buyToken(tokenInAndTokenOut, overloads);
          if (buyTxData?.success === true) {
            console.log("successfully made a purchace", tokenAddress);
          }
        }
      }
      // get name
    } catch (e) {
      console.log(e.message);
    }
  }
}

export const memPools = new MempoolTxns();
