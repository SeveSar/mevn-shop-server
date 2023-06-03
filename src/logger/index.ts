import { promises } from "fs";
import { ILogger } from "./logger.types";
import { Logger } from "tslog";

class LoggerService implements ILogger {
  public logger: Logger<{}>;
  constructor() {
    this.logger = new Logger({
      minLevel: 1,
      prettyErrorStackTemplate: "  • {{fileName}}\t{{method}}\n\t{{filePathWithLine}}",
      prettyLogStyles: {
        filePathWithLine: "green",
        logLevelName: {
          ERROR: ["bold", "red"],
          INFO: ["bold", "blue"],
          WARN: ["bold", "yellow"],
        },
      },
    });
    this.logger.attachTransport(async (logObj) => {
      try {
        await promises.appendFile("data/logs.txt", JSON.stringify(logObj) + "\n");
        console.log("Data has been written to the file");
      } catch (err) {
        console.error(err);
      }
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
