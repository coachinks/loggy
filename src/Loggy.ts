import { Logger as WinstonLogger, format, createLogger, transports } from 'winston';
import Logsene from 'winston-logsene';
import { Logger } from './Logger';

const { timestamp, combine, printf, errors } = format;

export type LogLevel = 'error' | 'trace' | 'debug' | 'info' | 'warn';
type LogStrategy = 'sematext' | 'console';

interface ConfigureOptions {
  consoleConfig: {
    level: LogLevel;
    disableDefaultMeta: boolean;
  };
  sematextConfig?: {
    token: string;
    level: LogLevel;
  };
  logStrategy: LogStrategy;
  defaultMetadata: {
    appName: string;
  };
}

export class Loggy {
  private readonly options: ConfigureOptions;
  private defaultConsoleLogger: WinstonLogger;
  private defaultSematextLogger: WinstonLogger;

  private readonly levels = {
    error: 0,
    warn: 1,
    trace: 2,
    info: 3,
    debug: 4
  };

  private constructor(options: ConfigureOptions) {
    this.options = options;
  }

  public static configure(options: ConfigureOptions): Loggy {
    return new Loggy(options);
  }

  public getLogger(module: string): Logger {
    if (this.options.logStrategy === 'sematext') {
      return this.getSematextLogger(module);
    }

    return this.getConsoleLogger(module);
  }

  private getSematextLogger(module: string) {
    if (this.defaultSematextLogger == null) {
      this.defaultSematextLogger = this.createSematextLogger();
    }
    const meta = { module, ...this.options.defaultMetadata };
    return new Logger(meta, this.defaultSematextLogger);
  }

  private getConsoleLogger(module: string) {
    if (this.defaultConsoleLogger == null) {
      this.defaultConsoleLogger = this.createConsoleLogger();
    }
    const meta = { module, ...this.options.defaultMetadata };
    return new Logger(meta, this.defaultConsoleLogger);
  }

  private createSematextLogger(): WinstonLogger {
    const { token, level } = this.options.sematextConfig!;
    if (token == null) throw new Error(`Invalid sematext token: ${token}`);

    return createLogger({
      levels: this.levels,
      format: format.simple(),
      transports: [
        new Logsene({
          token: token,
          level: level,
          type: 'app_logs',
          url: 'https://logsene-receiver.sematext.com'
        })
      ]
    });
  }

  private createConsoleLogger(): WinstonLogger {
    const logFormat = printf(({ level, message, timestamp: _timestamp, stack, meta }) => {
      return `${_timestamp} [${level}]: ${stack || message} ${JSON.stringify(meta, undefined, 2)}`;
    });

    return createLogger({
      levels: this.levels,
      format: combine(
        format.colorize({
          colors: {
            trace: 'cyan'
          }
        }),
        timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        errors({ stack: true }),
        logFormat
      ),
      transports: [
        new transports.Console({
          level: this.options.consoleConfig.level
        })
      ]
    });
  }
}
