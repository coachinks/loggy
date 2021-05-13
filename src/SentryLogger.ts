import { Logger } from './Logger';
import { Loggy } from './Loggy';

export class SentryLogger extends Logger {
  constructor(loggy: Loggy, module: string) {
    super(loggy, module);
  }

  protected register() {
    this.loggy.onLogEntry((_) => {});
  }
}
