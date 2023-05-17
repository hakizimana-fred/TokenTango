import { ethers, providers, utils } from "ethers";
import { abiInterface, provider, walletBalance } from "../helpers";
import { CONFIGS } from "../config";
import Token from "../models/Token";

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

        console.log(token, "matched token");
        // buy || swap token
      }
    } catch (error) {
      console.log(error.message);
    }
  }
}

export const memPools = new MempoolTxns();
