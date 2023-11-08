import { UniswapHelper } from "../../helpers/uniswap";
import logger from "../logger";

const uniswapHelper = new UniswapHelper();

export class MempoolTxns {
  async getPendingTxns() {
    uniswapHelper
      .getProvider()
      .on("pending", async (transaction): Promise<void> => {
        try {
          const transactionInfo = await uniswapHelper.getTransaction(
            transaction
          );
          console.log("tranactionInfo", transactionInfo);
        } catch (e) {
          logger.log(e.message);
          throw new Error(e.message);
        }
      });
  }
}
