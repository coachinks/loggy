import EventEmitter from 'events';
import { ConsoleLogger } from './ConsoleLogger';
import { Logger } from './Logger';
import { SentryLogger } from './SentryLogger';

interface ConfigureOptions {
  appName: string;
}

export type LogLevel = 'error' | 'trace' | 'warn' | 'info' | 'debug' | 'log';

export class Loggy extends EventEmitter {
  private consoleLoggerRegistered: boolean = false;
  private sentryLoggerRegistered: boolean = false;
  readonly appName: string = '';

  logOnly: LogLevel[] | 'all' = 'all';

  private constructor({ appName }: ConfigureOptions) {
    super();
    this.appName = appName;
  }

  public static configure(options: ConfigureOptions): Loggy {
    return new Loggy(options);
  }

  public getLogger(module: string): Logger {
    if (this.consoleLoggerRegistered) {
      return new ConsoleLogger(this, module) as Logger;
    } else if (this.sentryLoggerRegistered) {
      return new SentryLogger(this, module) as Logger;
    } else {
      throw new Error(`You must register a logger before creating one`);
    }
  }

  public onLogEntry(listener: (logEntry: LogEntry) => void): Loggy {
    this.on('log', listener);
    return this;
  }

  public registerConsoleLogger(logOnly: LogLevel[] | 'all') {
    if (this.consoleLoggerRegistered || this.sentryLoggerRegistered) return;
    this.logOnly = logOnly;
    this.consoleLoggerRegistered = true;
  }

  public registerSentryLogger(logOnly: LogLevel[] | 'all') {
    if (this.consoleLoggerRegistered || this.sentryLoggerRegistered) return;
    this.logOnly = logOnly;
    this.sentryLoggerRegistered = true;
  }
}

export interface LogEntry {
  level: LogLevel;
  module: string;
  message: string;
}
