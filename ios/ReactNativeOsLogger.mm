#import "ReactNativeOsLogger.h"
#import <os/log.h>

@implementation ReactNativeOsLogger {
    NSMutableDictionary<NSString *, NSObject<OS_os_log> *> *_loggers;
}

- (instancetype)init {
    self = [super init];
    if (self) {
        _loggers = [NSMutableDictionary new];
    }
    return self;
}

- (os_log_t)loggerForKey:(NSString *)key {
    os_log_t logger = _loggers[key];
    return logger ?: OS_LOG_DEFAULT;
}

- (void)configureLogger:(NSString *)key subsystem:(NSString *)subsystem category:(NSString *)category {
    _loggers[key] = os_log_create([subsystem UTF8String], [category UTF8String]);
}

- (void)logDefault:(NSString *)key message:(NSString *)message {
    os_log_with_type([self loggerForKey:key], OS_LOG_TYPE_DEFAULT, "%{public}s", [message UTF8String]);
}

- (void)logInfo:(NSString *)key message:(NSString *)message {
    os_log_with_type([self loggerForKey:key], OS_LOG_TYPE_INFO, "%{public}s", [message UTF8String]);
}

- (void)logDebug:(NSString *)key message:(NSString *)message {
    os_log_with_type([self loggerForKey:key], OS_LOG_TYPE_DEBUG, "%{public}s", [message UTF8String]);
}

- (void)logError:(NSString *)key message:(NSString *)message {
    os_log_with_type([self loggerForKey:key], OS_LOG_TYPE_ERROR, "%{public}s", [message UTF8String]);
}

- (void)logFault:(NSString *)key message:(NSString *)message {
    os_log_with_type([self loggerForKey:key], OS_LOG_TYPE_FAULT, "%{public}s", [message UTF8String]);
}

- (std::shared_ptr<facebook::react::TurboModule>)getTurboModule:
    (const facebook::react::ObjCTurboModule::InitParams &)params
{
    return std::make_shared<facebook::react::NativeReactNativeOsLoggerSpecJSI>(params);
}

+ (NSString *)moduleName
{
    return @"ReactNativeOsLogger";
}

@end
