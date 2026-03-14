import { useEffect } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import {
  configure,
  logDefault,
  logInfo,
  logDebug,
  logError,
  logFault,
} from '@quern/react-native-os-logger';

export default function App() {
  useEffect(() => {
    configure('com.quern.oslogger.example', 'js');
    logDefault('App mounted');
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>@quern/react-native-os-logger</Text>
      <Text style={styles.subtitle}>
        Open Console.app and filter by subsystem:{'\n'}
        com.quern.oslogger.example
      </Text>
      <View style={styles.buttons}>
        <Button title="Log Debug" onPress={() => logDebug('Debug message')} />
        <Button title="Log Info" onPress={() => logInfo('Info message')} />
        <Button
          title="Log Default"
          onPress={() => logDefault('Default message')}
        />
        <Button title="Log Error" onPress={() => logError('Error message')} />
        <Button title="Log Fault" onPress={() => logFault('Fault message')} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 30,
  },
  buttons: {
    gap: 10,
  },
});
