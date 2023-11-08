"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("dotenv/config");
const logger_1 = __importDefault(require("./lib/logger"));
const global_1 = __importDefault(require("./middleware/global"));
const environment_1 = require("./configs/environment");
const http_1 = require("http");
const constants_1 = require("./constants");
const app = (0, express_1.default)();
const server = (0, http_1.createServer)(app);
const run = async () => {
    try {
        server.listen(environment_1.Environment.PORT, async () => {
            logger_1.default.info(`server started on port ${environment_1.Environment.PORT}`);
            (0, global_1.default)(app);
            const healthCheckInterval = setInterval(() => {
                app.get("/healthcheck", (_req, res) => {
                    res.json({ message: "Server healthy" });
                });
            }, constants_1.HEALTH_INTERVAL_CHECK);
            process.on("SIGTERM", () => {
                clearInterval(healthCheckInterval);
                server.close((error) => {
                    if (error) {
                        logger_1.default.error(`Error during server close: ${error}`);
                        process.exit(1);
                    }
                    logger_1.default.log(`server closed gracefully`);
                    process.exit(0);
                });
            });
        });
    }
    catch (e) { }
};
void run().catch((e) => logger_1.default.error(e.message));
//# sourceMappingURL=app.js.map