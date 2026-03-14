package com.quern.reactnativeoslogger

import android.util.Log
import com.facebook.react.bridge.ReactApplicationContext

class ReactNativeOsLoggerModule(reactContext: ReactApplicationContext) :
  NativeReactNativeOsLoggerSpec(reactContext) {

  private var tag: String = "ReactNative"

  override fun configure(subsystem: String, category: String) {
    tag = "$subsystem:$category"
  }

  override fun logDefault(message: String) {
    Log.i(tag, message)
  }

  override fun logInfo(message: String) {
    Log.i(tag, message)
  }

  override fun logDebug(message: String) {
    Log.d(tag, message)
  }

  override fun logError(message: String) {
    Log.e(tag, message)
  }

  override fun logFault(message: String) {
    Log.wtf(tag, message)
  }

  companion object {
    const val NAME = NativeReactNativeOsLoggerSpec.NAME
  }
}
