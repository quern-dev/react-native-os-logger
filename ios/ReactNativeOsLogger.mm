#import "ReactNativeOsLogger.h"
#import <os/log.h>

@implementation ReactNativeOsLogger {
    os_log_t _logger;
}

- (instancetype)init {
    self = [super init];
    if (self) {
        _logger = OS_LOG_DEFAULT;
    }
    return self;
}

- (void)configure:(NSString *)subsystem category:(NSString *)category {
    _logger = os_log_create([subsystem UTF8String], [category UTF8String]);
}

- (void)logDefault:(NSString *)message {
    os_log_with_type(_logger, OS_LOG_TYPE_DEFAULT, "%{public}s", [message UTF8String]);
}

- (void)logInfo:(NSString *)message {
    os_log_with_type(_logger, OS_LOG_TYPE_INFO, "%{public}s", [message UTF8String]);
}

- (void)logDebug:(NSString *)message {
    os_log_with_type(_logger, OS_LOG_TYPE_DEBUG, "%{public}s", [message UTF8String]);
}

- (void)logError:(NSString *)message {
    os_log_with_type(_logger, OS_LOG_TYPE_ERROR, "%{public}s", [message UTF8String]);
}

- (void)logFault:(NSString *)message {
    os_log_with_type(_logger, OS_LOG_TYPE_FAULT, "%{public}s", [message UTF8String]);
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
