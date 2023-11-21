import { ethers } from "ethers";
import { Environment } from "../configs/environment";

export class TransactionHelper {
   getProvider() {
    return new Promise((resolve, reject) => {
      try {
         const provider =  new ethers.providers.WebSocketProvider(
            Environment.GOERLI_PROVIDER as string
        );
        resolve(provider)
      }catch(e) {
        reject(e)
      }
    })
    
  }
  // getTransaction(transaction: string) {
  //   return this.getProvider().getTransaction(transaction);
  // }
}
