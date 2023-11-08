"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Environment = void 0;
const portNormalizer_1 = require("../utils/portNormalizer");
class Environment {
}
exports.Environment = Environment;
Environment.PORT = (0, portNormalizer_1.normalizePort)(process.env.PORT);
Environment.GOERLI_PROVIDER = process.env.GOERLI_PROVIDER_WS_URL;
//# sourceMappingURL=environment.js.map