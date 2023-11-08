"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionHelper = void 0;
const ethers_1 = require("ethers");
const environment_1 = require("../configs/environment");
class TransactionHelper {
    getProvider() {
        return new ethers_1.ethers.providers.WebSocketProvider(environment_1.Environment.GOERLI_PROVIDER);
    }
    getTransaction(transaction) {
        return this.getProvider().getTransaction(transaction);
    }
}
exports.TransactionHelper = TransactionHelper;
//# sourceMappingURL=transaction.js.map