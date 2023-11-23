import { providers } from "ethers";
import { TransactionHelper, ExhangeHelper } from "../../helpers";
import logger from "../logger";
import { Configs } from "../../configs/config";
import { rugChecker } from "../rug-checker";

const transactionHelper = new TransactionHelper();

export class MempoolTxns {
  // Retrieve pending transactions from the mempool
  public replies = new Map();
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
      this.replies.set("method", methodName);

      if (methodName === Configs.methods[0]) {
        logger.log("found a match for ", methodName);
        let token = decoded.args.token.toLowerCase();
        rugChecker.isTokenRug(token);
      }

      if (methodName === Configs.methods[1]) {
        logger.log("found a match for", methodName);

        const [tokenA, tokenB] = [decoded.args[0], decoded.args[1]] as const;
        [tokenA, tokenB].forEach((tokenAddress: string) => {
          rugChecker.isTokenRug(tokenAddress);
        });
      }
    } catch (e) {}
  }
}
