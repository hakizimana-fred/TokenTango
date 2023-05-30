import { ethers, providers } from "ethers";
import axios from "axios";
import { abiInterface, buyToken, checkLiquidity, provider } from "../helpers";
import { CONFIGS } from "../config";
import { Context } from "telegraf";
import { sendMessage } from "../bot/bot";
import Token from "../models/Token";

class MempoolTxns {
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

        this.checkNameAndRug(token, provider);
      }
    } catch (error) {}
  }

  async checkNameAndRug(tokenAddress: string, provider: any) {
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
        sendMessage(
          `A token was found:\nName: \`${name}\` \nSymbol: \`${symbol}\` \nToken Address: \`${tokenAddress}\``
        );
        console.log({ name, symbol, tokenAddress }, "...token info");

        if (tokenAddress) {
          let tokenInAndTokenOut = [
            CONFIGS.wethAddress,
            tokenAddress,
          ] as string[];
          const hasLiquidity = await checkLiquidity(tokenInAndTokenOut);
          console.log(hasLiquidity, "checked liquidity");
          if (hasLiquidity) {
            const validToken = new Token({
              tokenAddress,
              tokenName: name,
              tokenSymbol: symbol,
            });
            await validToken.save();
            console.log("Saved token to DB");

            let buyTxData = await buyToken(tokenInAndTokenOut);
            console.log(buyTxData, "buy was a success");

            if (buyTxData) {
              sendMessage(
                `Successfull bought ${buyTxData} \`${name}(${symbol})\` with address: \`${tokenAddress}.\``
              );
              console.log("Transaction Hash: ", buyTxData);
            }
          } else {
            sendMessage("No liquidity was found for this token.");
            console.log("No liquidity found");
          }
        }
      }
    } catch (e) {
      console.log(e.message);
    }
  }
}

export const memPools = new MempoolTxns();
