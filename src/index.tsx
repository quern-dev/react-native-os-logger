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
