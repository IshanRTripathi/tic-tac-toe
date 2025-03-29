export class ConsoleToPopup {
  constructor(showPopupFn) {
    this.showPopup = showPopupFn;
    this.originalConsole = {
      log: console.log,
      warn: console.warn,
      error: console.error,
      info: console.info
    };

    this.init();
  }

  init() {
    console.log = (...args) => {
      this.originalConsole.log(...args);
      this.showPopup(args.join(' '), 'info');
    };

    console.warn = (...args) => {
      this.originalConsole.warn(...args);
      this.showPopup(args.join(' '), 'error');
    };

    console.error = (...args) => {
      this.originalConsole.error(...args);
      this.showPopup(args.join(' '), 'error');
    };

    console.info = (...args) => {
      this.originalConsole.info(...args);
      this.showPopup(args.join(' '), 'info');
    };
  }

  restore() {
    console.log = this.originalConsole.log;
    console.warn = this.originalConsole.warn;
    console.error = this.originalConsole.error;
    console.info = this.originalConsole.info;
  }
}

export const createConsoleToPopup = (showPopupFn) => {
  return new ConsoleToPopup(showPopupFn);
}
