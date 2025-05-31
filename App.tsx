import React, {useEffect} from 'react';
import {AuthProvider} from './src/contexts/authContext';
import {ThemeProvider} from './src/contexts/themeContext';
import RootNavigator from './src/navigation/navigator/rootNavigator';
import notifee, {AndroidImportance} from '@notifee/react-native';
import crashlytics from '@react-native-firebase/crashlytics';

function App(): React.JSX.Element {
  useEffect(() => {
    async function createChannel() {
      await notifee.createChannel({
        id: 'default',
        name: 'Default Channel',
        importance: AndroidImportance.HIGH,
      });
    }

    createChannel();
  }, []);

  useEffect(() => {
    const requestPermission = async () => {
      await notifee.requestPermission();
    };
    requestPermission();
  }, []);

  useEffect(() => {
    // crashlytics().log('App mounted.');
    // crashlytics().setUserId('12345');
    // crashlytics().setAttribute('role', 'tester');
    // crashlytics().crash();
  }, []);

  return (
    <AuthProvider>
      <ThemeProvider>
        <RootNavigator />
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
