type LogLevel = 'log' | 'error' | 'warn' | 'info';

class CustomLogger {
  private static getCallerInfo(): string {
    const stack = new Error().stack || '';
    const callerLine = stack.split('\n')[3]; // Obtém a linha do stack trace
    const pathMatch = callerLine?.match(/\((.*):(\d+):(\d+)\)/);

    if (pathMatch) {
      const [_, filePath, line, column] = pathMatch;
      return `${filePath}:${line}:${column}`;
    }

    return 'unknown location';
  }

  private static printMessage(level: LogLevel, args: any[]): void {
    const location = this.getCallerInfo();
    const timestamp = new Date().toISOString(); // Adiciona o timestamp
    console[level](`[${level.toUpperCase()}] [${timestamp}] [${location}]`, ...args);
  }

  static log(...args: any[]): void {
    this.printMessage('log', args);
  }

  static error(...args: any[]): void {
    this.printMessage('error', args);
  }

  static warn(...args: any[]): void {
    this.printMessage('warn', args);
  }

  static info(...args: any[]): void {
    this.printMessage('info', args);
  }
}

export default CustomLogger;
