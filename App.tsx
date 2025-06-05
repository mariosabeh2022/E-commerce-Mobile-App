import React from 'react';
import {AuthProvider} from './src/contexts/authContext';
import {ThemeProvider} from './src/contexts/themeContext';
import RootNavigator from './src/navigation/navigator/rootNavigator';
import {OneSignal} from 'react-native-onesignal';

function App(): React.JSX.Element {
  OneSignal.initialize('01157100-dc15-48b5-b4d3-e3baf593bf0b');
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
