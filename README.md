# @quern/react-native-os-logger

Send React Native JS logs to Apple's [Unified Logging System](https://developer.apple.com/documentation/os/logging) (`os_log`) and Android's `Log`, with subsystem/category support for easy filtering in Console.app, `log` CLI, and [Quern](https://quern.dev).

## Why?

React Native's default `console.log` output goes to stdout/stderr and gets mixed in with everything else. By routing logs through `os_log` (iOS) and `android.util.Log` (Android), you get:

- **Subsystem & category filtering** — find your app's logs instantly in Console.app or with `log stream --predicate`
- **Log levels** — debug, info, default, error, fault — with appropriate system behavior (persistence, throttling)
- **Quern integration** — logs appear in Quern's log viewer, filterable by your app's subsystem
- **Native tooling** — works with Instruments, `log collect`, and any tool that reads the unified log

## Installation

```sh
npm install @quern/react-native-os-logger
# or
yarn add @quern/react-native-os-logger
```

### iOS

```sh
cd ios && pod install
```

### Android

No additional setup needed.

## Usage

### Basic setup

```typescript
import { configure, logInfo, logError } from '@quern/react-native-os-logger';

// Call once at app startup
configure('com.myapp', 'js');

logInfo('App started');
logError('Something went wrong');
```

### Using createLogger

```typescript
import { createLogger } from '@quern/react-native-os-logger';

const logger = createLogger('com.myapp', 'networking');

logger.debug('Request started');
logger.info('Response received');
logger.error('Request failed');
```

### Log levels

| JS Method    | iOS (`os_log`)       | Android (`Log`)  | Notes                              |
|-------------|---------------------|-----------------|-------------------------------------|
| `logDebug`  | `OS_LOG_TYPE_DEBUG`  | `Log.d`         | Not persisted by default on iOS     |
| `logInfo`   | `OS_LOG_TYPE_INFO`   | `Log.i`         | Not persisted by default on iOS     |
| `logDefault`| `OS_LOG_TYPE_DEFAULT`| `Log.i`         | Persisted on iOS                    |
| `logError`  | `OS_LOG_TYPE_ERROR`  | `Log.e`         | Persisted, captures caller info     |
| `logFault`  | `OS_LOG_TYPE_FAULT`  | `Log.wtf`       | Persisted, captures stack           |

### Filtering in Console.app / log CLI

```sh
# Stream logs from your app's subsystem
log stream --predicate 'subsystem == "com.myapp"'

# Filter by category
log stream --predicate 'subsystem == "com.myapp" AND category == "networking"'
```

## API

### `configure(subsystem: string, category: string): void`

Configure the logger with a reverse-DNS subsystem identifier and a category. Call once at startup.

### `logDefault(message: string): void`

### `logInfo(message: string): void`

### `logDebug(message: string): void`

### `logError(message: string): void`

### `logFault(message: string): void`

### `log(level: LogLevel, message: string): void`

### `createLogger(subsystem: string, category: string): Logger`

Returns an object with `default`, `info`, `debug`, `error`, `fault`, and `log` methods.

## Requirements

- React Native 0.76+ (New Architecture / TurboModules)
- iOS 13+
- Android API 21+

## License

MIT
