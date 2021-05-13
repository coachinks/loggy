import { Logger } from './Logger';
import { Loggy } from './Loggy';

export class ConsoleLogger extends Logger {
  constructor(loggy: Loggy, module: string) {
    super(loggy, module);
  }

  protected register() {
    this.loggy.onLogEntry((logEntry) => {
      const msg = `${this.loggy.appName} [${logEntry.module}] ${logEntry.message}`;
      switch (logEntry.level) {
        case 'trace':
          console.trace(msg);
          break;
        case 'debug':
          console.debug(msg);
          break;
        case 'info':
          console.info(msg);
          break;
        case 'warn':
          console.warn(msg);
          break;
        case 'error':
          console.error(msg);
          break;
        default:
          console.log(`{${logEntry.level}} ${msg}`);
      }
    });
  }
}
