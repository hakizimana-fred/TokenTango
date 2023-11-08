import debug from "debug";

const appName = "token-tango";
const logLevels = ["error", "warn", "info", "debug", "log"];

const logger = {} as any;
logLevels.forEach((logLevel) => {
  logger[logLevel] = debug(`${appName}:${logLevel}`);
});

export default logger;
