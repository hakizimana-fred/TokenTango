"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MempoolTxns = void 0;
const helpers_1 = require("../../helpers");
const logger_1 = __importDefault(require("../logger"));
const transactionHelper = new helpers_1.TransactionHelper();
class MempoolTxns {
    async getPendingTxns() {
        transactionHelper
            .getProvider()
            .on("pending", async (transaction) => {
            try {
                const transactionInfo = await transactionHelper.getTransaction(transaction);
                console.log("simply log transaction info", transactionInfo);
            }
            catch (e) {
                logger_1.default.log(e.message);
                throw new Error(e.message);
            }
        });
    }
    async processAndDecode(transactionInfo) {
        const { data } = transactionInfo;
        try {
            const decoded = helpers_1.ExhangeHelper.abiInterface.parseTransaction({ data });
            const { name: methodName } = decoded;
            console.log(methodName, "just method name");
        }
        catch (e) { }
    }
}
exports.MempoolTxns = MempoolTxns;
//# sourceMappingURL=uniswap.js.map