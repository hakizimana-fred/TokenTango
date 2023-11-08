import { normalizePort } from "../utils/portNormalizer";

export class Environment {
  static PORT = normalizePort(process.env.PORT as string);
  static GOERLI_PROVIDER = process.env.GOERLI_PROVIDER_WS_URL;
}
