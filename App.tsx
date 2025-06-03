import React from 'react';
import {AuthProvider} from './src/contexts/authContext';
import {ThemeProvider} from './src/contexts/themeContext';
import RootNavigator from './src/navigation/navigator/rootNavigator';
import {OneSignal, LogLevel} from 'react-native-onesignal';

function App(): React.JSX.Element {
  // Enable verbose logging for debugging (remove in production)
  OneSignal.Debug.setLogLevel(LogLevel.Verbose);
  // Initialize with your OneSignal App ID
  OneSignal.initialize('01157100-dc15-48b5-b4d3-e3baf593bf0b');
  // Use this method to prompt for push notifications.
  // We recommend removing this method after testing and instead use In-App Messages to prompt for notification permission.
  OneSignal.Notifications.requestPermission(true);
  return (
    <AuthProvider>
      <ThemeProvider>
        <RootNavigator />
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
