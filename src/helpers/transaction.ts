import { ethers } from "ethers";
import { Environment } from "../configs/environment";

export class TransactionHelper {
  getProvider() {
    return new ethers.providers.WebSocketProvider(
      Environment.GOERLI_PROVIDER as string
    );
  }
  getTransaction(transaction: string) {
    return this.getProvider().getTransaction(transaction);
  }
}
