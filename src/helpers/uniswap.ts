import { ethers } from "ethers";

export class UniswapHelper {
  getProvider() {
    return new ethers.providers.WebSocketProvider(
      "wss://goerli.infura.io/ws/v3/3367b8616fc542cab6035fcd5cc6680c"
    );
  }
  getTransaction(transaction: string) {
    return this.getProvider().getTransaction(transaction);
  }
}

export const uniswapHelper = new UniswapHelper();
