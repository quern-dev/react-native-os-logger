import NativeModule from './NativeReactNativeOsLogger';

export type LogLevel = 'default' | 'info' | 'debug' | 'error' | 'fault';

let configured = false;

/**
 * Configure the logger with a subsystem and category.
 * Call this once at app startup before logging.
 *
 * @param subsystem - Reverse-DNS identifier (e.g. "com.myapp")
 * @param category - Log category (e.g. "networking", "ui", "js")
 */
export function configure(subsystem: string, category: string): void {
  NativeModule.configure(subsystem, category);
  configured = true;
}

/**
 * Log at the "default" level (os_log_default / Log.i).
 */
export function logDefault(message: string): void {
  NativeModule.logDefault(message);
}

/**
 * Log at the "info" level (os_log_info / Log.i).
 */
export function logInfo(message: string): void {
  NativeModule.logInfo(message);
}

/**
 * Log at the "debug" level (os_log_debug / Log.d).
 */
export function logDebug(message: string): void {
  NativeModule.logDebug(message);
}

/**
 * Log at the "error" level (os_log_error / Log.e).
 */
export function logError(message: string): void {
  NativeModule.logError(message);
}

/**
 * Log at the "fault" level (os_log_fault / Log.wtf).
 */
export function logFault(message: string): void {
  NativeModule.logFault(message);
}

/**
 * Log a message at the specified level.
 */
export function log(level: LogLevel, message: string): void {
  switch (level) {
    case 'default':
      logDefault(message);
      break;
    case 'info':
      logInfo(message);
      break;
    case 'debug':
      logDebug(message);
      break;
    case 'error':
      logError(message);
      break;
    case 'fault':
      logFault(message);
      break;
  }
}

/**
 * Create a logger instance pre-configured with a subsystem and category.
 * Useful for creating module-scoped loggers.
 */
export function createLogger(subsystem: string, category: string) {
  if (!configured) {
    configure(subsystem, category);
  }

  return {
    default: logDefault,
    info: logInfo,
    debug: logDebug,
    error: logError,
    fault: logFault,
    log,
  };
}

function argsToString(args: unknown[]): string {
  return args
    .map((arg) => {
      if (typeof arg === 'string') return arg;
      if (arg instanceof Error) return `${arg.message}\n${arg.stack}`;
      try {
        return JSON.stringify(arg);
      } catch {
        return String(arg);
      }
    })
    .join(' ');
}

let patched = false;

/**
 * Patch console.log/info/debug/warn/error to route through os_log.
 * Original console methods are preserved — logs still appear in Metro.
 * Call once at app startup.
 *
 * @param subsystem - Reverse-DNS identifier (e.g. "com.myapp")
 * @param category - Log category (defaults to "console")
 */
export function patchConsole(
  subsystem: string,
  category: string = 'console'
): void {
  if (patched) return;
  patched = true;

  if (!configured) {
    configure(subsystem, category);
  }

  const originalLog = console.log;
  const originalInfo = console.info;
  const originalDebug = console.debug;
  const originalWarn = console.warn;
  const originalError = console.error;

  console.log = (...args: unknown[]) => {
    originalLog.apply(console, args);
    logDefault(argsToString(args));
  };

  console.info = (...args: unknown[]) => {
    originalInfo.apply(console, args);
    logInfo(argsToString(args));
  };

  console.debug = (...args: unknown[]) => {
    originalDebug.apply(console, args);
    logDebug(argsToString(args));
  };

  console.warn = (...args: unknown[]) => {
    originalWarn.apply(console, args);
    logError(argsToString(args));
  };

  console.error = (...args: unknown[]) => {
    originalError.apply(console, args);
    logError(argsToString(args));
  };
}
