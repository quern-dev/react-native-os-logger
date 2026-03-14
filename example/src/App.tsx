import { useEffect } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { patchConsole, createLogger } from '@quern/react-native-os-logger';

patchConsole('com.quern.oslogger.example', 'console');

const netLogger = createLogger('com.quern.oslogger.example', 'networking');
const uiLogger = createLogger('com.quern.oslogger.example', 'ui');

export default function App() {
  useEffect(() => {
    console.log('App mounted');
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>@quern/react-native-os-logger</Text>
      <Text style={styles.subtitle}>
        Open Console.app and filter by subsystem:{'\n'}
        com.quern.oslogger.example
      </Text>
      <View style={styles.buttons}>
        <Button
          title="console.log"
          onPress={() => console.log('Hello from console.log', { foo: 42 })}
        />
        <Button
          title="Network: request"
          onPress={() => netLogger.info('GET /api/users → 200 OK (142ms)')}
        />
        <Button
          title="Network: error"
          onPress={() => netLogger.error('POST /api/login → 401 Unauthorized')}
        />
        <Button
          title="UI: render"
          onPress={() => uiLogger.debug('ProfileScreen rendered in 12ms')}
        />
        <Button
          title="UI: interaction"
          onPress={() => uiLogger.info('User tapped "Save" button')}
        />
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
