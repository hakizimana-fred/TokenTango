"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const debug_1 = __importDefault(require("debug"));
const appName = "token-tango";
const logLevels = ["error", "warn", "info", "debug", "log"];
const logger = {};
logLevels.forEach((logLevel) => {
    logger[logLevel] = (0, debug_1.default)(`${appName}:${logLevel}`);
});
exports.default = logger;
//# sourceMappingURL=logger.js.map