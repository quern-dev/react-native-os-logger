import NativeModule from './NativeReactNativeOsLogger';

export type LogLevel = 'default' | 'info' | 'debug' | 'error' | 'fault';

export interface Logger {
  default: (message: string) => void;
  info: (message: string) => void;
  debug: (message: string) => void;
  error: (message: string) => void;
  fault: (message: string) => void;
  log: (level: LogLevel, message: string) => void;
}

const DEFAULT_KEY = '_default';

/**
 * Configure the default logger with a subsystem and category.
 * Call this once at app startup before logging.
 *
 * @param subsystem - Reverse-DNS identifier (e.g. "com.myapp")
 * @param category - Log category (e.g. "networking", "ui", "js")
 */
export function configure(subsystem: string, category: string): void {
  NativeModule.configureLogger(DEFAULT_KEY, subsystem, category);
}

/**
 * Log at the "default" level (os_log_default / Log.i).
 */
export function logDefault(message: string): void {
  NativeModule.logDefault(DEFAULT_KEY, message);
}

/**
 * Log at the "info" level (os_log_info / Log.i).
 */
export function logInfo(message: string): void {
  NativeModule.logInfo(DEFAULT_KEY, message);
}

/**
 * Log at the "debug" level (os_log_debug / Log.d).
 */
export function logDebug(message: string): void {
  NativeModule.logDebug(DEFAULT_KEY, message);
}

/**
 * Log at the "error" level (os_log_error / Log.e).
 */
export function logError(message: string): void {
  NativeModule.logError(DEFAULT_KEY, message);
}

/**
 * Log at the "fault" level (os_log_fault / Log.wtf).
 */
export function logFault(message: string): void {
  NativeModule.logFault(DEFAULT_KEY, message);
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
 * Create a logger instance with its own subsystem and category.
 * Each logger gets a separate os_log_t (iOS) / Log tag (Android),
 * so logs can be filtered independently.
 *
 * @param subsystem - Reverse-DNS identifier (e.g. "com.myapp")
 * @param category - Log category (e.g. "networking", "ui")
 */
export function createLogger(subsystem: string, category: string): Logger {
  const key = `${subsystem}:${category}`;
  NativeModule.configureLogger(key, subsystem, category);

  const logForKey = (level: LogLevel, message: string): void => {
    switch (level) {
      case 'default':
        NativeModule.logDefault(key, message);
        break;
      case 'info':
        NativeModule.logInfo(key, message);
        break;
      case 'debug':
        NativeModule.logDebug(key, message);
        break;
      case 'error':
        NativeModule.logError(key, message);
        break;
      case 'fault':
        NativeModule.logFault(key, message);
        break;
    }
  };

  return {
    default: (message: string) => NativeModule.logDefault(key, message),
    info: (message: string) => NativeModule.logInfo(key, message),
    debug: (message: string) => NativeModule.logDebug(key, message),
    error: (message: string) => NativeModule.logError(key, message),
    fault: (message: string) => NativeModule.logFault(key, message),
    log: logForKey,
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

  const logger = createLogger(subsystem, category);

  const originalLog = console.log;
  const originalInfo = console.info;
  const originalDebug = console.debug;
  const originalWarn = console.warn;
  const originalError = console.error;

  console.log = (...args: unknown[]) => {
    originalLog.apply(console, args);
    logger.default(argsToString(args));
  };

  console.info = (...args: unknown[]) => {
    originalInfo.apply(console, args);
    logger.info(argsToString(args));
  };

  console.debug = (...args: unknown[]) => {
    originalDebug.apply(console, args);
    logger.debug(argsToString(args));
  };

  console.warn = (...args: unknown[]) => {
    originalWarn.apply(console, args);
    logger.error(argsToString(args));
  };

  console.error = (...args: unknown[]) => {
    originalError.apply(console, args);
    logger.error(argsToString(args));
  };
}
