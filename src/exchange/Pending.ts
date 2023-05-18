import { ethers, providers, utils } from "ethers";
import axios from "axios";
import { abiInterface, buyToken, provider, walletBalance } from "../helpers";
import { CONFIGS } from "../config";
import Token from "../models/Token";
import { Context } from "telegraf";
import { sendMessage } from "../bot/bot";

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
  //public transaction: any;
  public context: Context;
  public replies = new Map();

  async getPendingTxns() {
    provider.on("pending", async (transaction): Promise<void> => {
      try {
        const transactionInfo = await provider.getTransaction(transaction);

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
      console.log(methodName, "...method");
      this.replies.set("method", methodName);
      if (CONFIGS.methods.includes(methodName)) {
        console.log("found a match!!!");
        const token = decoded.args.token.toLowerCase();
        const byteCode = await provider.getCode(token);

        this.checkNameAndRug(token, byteCode, provider);
      }
    } catch (error) {}
  }

  async checkNameAndRug(tokenAddress: string, byteCode: string, provider: any) {
    try {
      const {
        data: { result: abi },
      } = await axios.get(
        `https://api-goerli.etherscan.io/api?module=contract&action=getabi&address=${tokenAddress}&apikey=${CONFIGS.etherscanApiKey}`
      );

      if (abi.includes("Contract source code not verified")) {
        sendMessage("A rug token was flagged.");
        console.log("A rug was found!!");
      } else {
        const tokenContract = new ethers.Contract(tokenAddress, abi, provider);
        const name = await tokenContract.name();
        const symbol = await tokenContract.symbol();
        sendMessage(`A new token was found:\nName: ${name}\nSymbol: ${symbol}\nToken Address: ${tokenAddress}`);
        console.log({ name, symbol, tokenAddress }, "...token info");
        //this.context.reply(name, symbol);

        // if (tokenAddress) {
        //   let tokenInAndTokenOut = [
        //     "0xFfb99f4A02712C909d8F7cC44e67C87Ea1E71E83",
        //     tokenAddress,
        //   ];
        //   let buyTxData = await buyToken(tokenInAndTokenOut);
        //   if (buyTxData?.success === true) {
        //     console.log(
        //       `Successfull bought ${name}(${symbol}) with address: ${tokenAddress}`,
        //       tokenAddress
        //     );
        //   }
        // }
      }
    } catch (e) {
      console.log(e.message);
    }
  }
}

export const memPools = new MempoolTxns();
