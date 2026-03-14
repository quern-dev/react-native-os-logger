package com.quern.reactnativeoslogger

import android.util.Log
import com.facebook.react.bridge.ReactApplicationContext

class ReactNativeOsLoggerModule(reactContext: ReactApplicationContext) :
  NativeReactNativeOsLoggerSpec(reactContext) {

  private val tags = mutableMapOf<String, String>()

  private fun tagForKey(key: String): String {
    return tags[key] ?: "ReactNative"
  }

  override fun configureLogger(key: String, subsystem: String, category: String) {
    tags[key] = "$subsystem:$category"
  }

  override fun logDefault(key: String, message: String) {
    Log.i(tagForKey(key), message)
  }

  override fun logInfo(key: String, message: String) {
    Log.i(tagForKey(key), message)
  }

  override fun logDebug(key: String, message: String) {
    Log.d(tagForKey(key), message)
  }

  override fun logError(key: String, message: String) {
    Log.e(tagForKey(key), message)
  }

  override fun logFault(key: String, message: String) {
    Log.wtf(tagForKey(key), message)
  }

  companion object {
    const val NAME = NativeReactNativeOsLoggerSpec.NAME
  }
}
