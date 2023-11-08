import { providers } from "ethers";
import { TransactionHelper, ExhangeHelper } from "../../helpers";
import logger from "../logger";

const transactionHelper = new TransactionHelper();

export class MempoolTxns {
  // Retrieve pending transactions from the mempool
  async getPendingTxns() {
    transactionHelper
      .getProvider()
      .on("pending", async (transaction): Promise<void> => {
        try {
          const transactionInfo = await transactionHelper.getTransaction(
            transaction
          );
          transactionInfo && (await this.processAndDecode(transactionInfo));
        } catch (e) {
          logger.log(e.message);
          throw new Error(e.message);
        }
      });
  }

  async processAndDecode(transactionInfo: providers.TransactionResponse) {
    const { data } = transactionInfo;
    try {
      const decoded = ExhangeHelper.abiInterface.parseTransaction({ data });
      const { name: methodName } = decoded;
      console.log(methodName, "just method name");
    } catch (e) {}
  }
}
