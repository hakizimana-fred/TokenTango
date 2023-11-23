import { Environment } from "../configs/environment";
import logger from "./logger";
import axios from "axios";

class RugCheck {
  goerliBaseUrl: string;
  constructor(goerliBaseUrl: string) {
    this.goerliBaseUrl = goerliBaseUrl;
  }

  async isTokenRug(tokenAddress: string) {
    try {
      const {
        data: { result },
      } = await axios.get(
        `${this.goerliBaseUrl}/api?module=contract&action=getabi&address=${tokenAddress}&apikey=${Environment.ETHER_SCAN_KEY}`
      );
      console.log(result, "result got");
    } catch (e) {
      logger.error(e.message);
    }
  }
}

export const rugChecker = new RugCheck("https://api-goerli.etherscan.io");
