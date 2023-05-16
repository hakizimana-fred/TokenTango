import { ethers, providers, utils } from "ethers";
import { abiInterface, provider } from "../helpers";

class MempoolTxns {
  public transaction: any;
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
    const { hash, from, to, value, gasPrice, data } = transactionInfo;
    try {
      const decoded = abiInterface.parseTransaction({ data });
      console.log(decoded, "decoded");
      //return txData;
    } catch (error) {}
  }
}

export const memPools = new MempoolTxns();
