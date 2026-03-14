import { TurboModuleRegistry, type TurboModule } from 'react-native';

export interface Spec extends TurboModule {
  configure(subsystem: string, category: string): void;
  logDefault(message: string): void;
  logInfo(message: string): void;
  logDebug(message: string): void;
  logError(message: string): void;
  logFault(message: string): void;
}

export default TurboModuleRegistry.getEnforcing<Spec>('ReactNativeOsLogger');
