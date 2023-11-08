"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExhangeHelper = void 0;
const ethers_1 = require("ethers");
const uniswap_1 = require("../constants/uniswap");
class ExhangeHelper {
}
exports.ExhangeHelper = ExhangeHelper;
ExhangeHelper.abiInterface = new ethers_1.utils.Interface(uniswap_1.UNISWAP_ABI);
//# sourceMappingURL=uniswap.js.map