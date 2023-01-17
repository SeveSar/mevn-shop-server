import { ILogger } from "./logger.types";
import { Logger } from "tslog";

class LoggerService implements ILogger {
  public logger: Logger<{}>;
  constructor() {
    this.logger = new Logger({
      minLevel: 1,
      prettyLogStyles: {
        filePathWithLine: "green",
        logLevelName: {
          ERROR: ["bold", "red"],
          INFO: ["bold", "blue"],
          WARN: ["bold", "yellow"],
        },
      },
    });
  }
  log(...args: unknown[]) {
    this.logger.info(...args);
  }
  warn(...args: unknown[]) {
    this.logger.warn(...args);
  }
  err(...args: unknown[]) {
    this.logger.error(...args);
  }
}

const loggerService = new LoggerService();
export { loggerService };
