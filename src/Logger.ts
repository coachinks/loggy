import winston from 'winston';
import { LogLevel } from './Loggy';

export class Logger {
  private defaultMeta: any;
  private winstonLogger: winston.Logger;

  constructor(defaultMeta: any, winstonLogger: winston.Logger) {
    this.defaultMeta = defaultMeta;
    this.winstonLogger = winstonLogger;
  }

  private log(logLevel: LogLevel, message: string, meta?: any): void {
    const logEntry = { ...this.defaultMeta, meta };
    this.winstonLogger.log(logLevel, message, { logEntry });
  }

  public trace(message: string, meta?: any): void {
    this.log('trace', message, meta);
  }

  public debug(message: string, meta?: any): void {
    this.log('debug', message, meta);
  }

  public info(message: string, meta?: any): void {
    this.log('info', message, meta);
  }

  public warn(message: string, meta?: any): void {
    this.log('warn', message, meta);
  }

  public error(message: string | any, meta?: any): void {
    this.log('error', message, meta);
  }
}
