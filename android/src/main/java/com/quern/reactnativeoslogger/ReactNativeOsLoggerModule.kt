package com.quern.reactnativeoslogger

import com.facebook.react.bridge.ReactApplicationContext

class ReactNativeOsLoggerModule(reactContext: ReactApplicationContext) :
  NativeReactNativeOsLoggerSpec(reactContext) {

  override fun multiply(a: Double, b: Double): Double {
    return a * b
  }

  companion object {
    const val NAME = NativeReactNativeOsLoggerSpec.NAME
  }
}
