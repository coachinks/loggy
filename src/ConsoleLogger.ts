import { Logger } from './Logger';
import { Loggy } from './Loggy';

export class ConsoleLogger extends Logger {
  constructor(loggy: Loggy, module: string) {
    super(loggy, module);
  }

  protected register() {
    this.loggy.onLogEntry((logEntry) => {
      const msg = `${this.loggy.appName} [${logEntry.module}] ${logEntry.message}`;
      if (
        this.loggy.loggerConfig.logOnly.includes(logEntry.level) ||
        this.loggy.loggerConfig.logOnly === 'all'
      ) {
        console[logEntry.level](msg);
      }
    });
  }
}
