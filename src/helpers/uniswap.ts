import { utils } from "ethers";
import { UNISWAP_ABI } from "../constants/uniswap";

export class ExhangeHelper {
  static abiInterface = new utils.Interface(UNISWAP_ABI);
}
