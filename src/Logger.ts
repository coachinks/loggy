import { LogEntry, Loggy } from './Loggy';

export abstract class Logger {
  protected loggy: Loggy;
  private module: string;

  constructor(loggy: Loggy, module: string) {
    this.loggy = loggy;
    this.module = module;

    this.register();
  }

  public log(logLevel: string, message: string): void {
    const logEntry: LogEntry = { level: logLevel, module: this.module, message };

    this.loggy.emit('log', logEntry);
  }

  public trace(message: string): void {
    this.log('trace', message);
  }

  public debug(message: string): void {
    this.log('debug', message);
  }

  public info(message: string): void {
    this.log('info', message);
  }

  public warn(message: string): void {
    this.log('warn', message);
  }

  public error(message: string): void {
    this.log('error', message);
  }

  protected abstract register(): any;
}
