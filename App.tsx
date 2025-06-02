import React, {useEffect} from 'react';
import {AuthProvider} from './src/contexts/authContext';
import {ThemeProvider} from './src/contexts/themeContext';
import RootNavigator from './src/navigation/navigator/rootNavigator';
// import notifee, {AndroidImportance} from '@notifee/react-native';
// import crashlytics from '@react-native-firebase/crashlytics';
import {OneSignal, LogLevel} from 'react-native-onesignal';

function App(): React.JSX.Element {
  // useEffect(() => {
  //   async function createChannel() {
  //     await notifee.createChannel({
  //       id: 'default',
  //       name: 'Default Channel',
  //       importance: AndroidImportance.HIGH,
  //     });
  //   }

  //   createChannel();
  // }, []);

  // Enable verbose logging for debugging (remove in production)
  OneSignal.Debug.setLogLevel(LogLevel.Verbose);
  // Initialize with your OneSignal App ID
  OneSignal.initialize('01157100-dc15-48b5-b4d3-e3baf593bf0b');
  // Use this method to prompt for push notifications.
  // We recommend removing this method after testing and instead use In-App Messages to prompt for notification permission.
  OneSignal.Notifications.requestPermission(false);

  // useEffect(() => {
  //   const requestPermission = async () => {
  //     await notifee.requestPermission();
  //   };
  //   requestPermission();
  // }, []);

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
