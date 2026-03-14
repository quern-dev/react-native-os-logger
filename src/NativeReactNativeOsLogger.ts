import { TurboModuleRegistry, type TurboModule } from 'react-native';

export interface Spec extends TurboModule {
  configureLogger(key: string, subsystem: string, category: string): void;
  logDefault(key: string, message: string): void;
  logInfo(key: string, message: string): void;
  logDebug(key: string, message: string): void;
  logError(key: string, message: string): void;
  logFault(key: string, message: string): void;
}

export default TurboModuleRegistry.getEnforcing<Spec>('ReactNativeOsLogger');
