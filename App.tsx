import React from 'react';
import {AuthProvider} from './src/contexts/authContext';
import {ThemeProvider} from './src/contexts/themeContext';
import RootNavigator from './src/navigation/navigator/rootNavigator';
import {useNotifications} from './src/notifications/useNotifications';
function App(): React.JSX.Element {
  useNotifications();
  return (
    <AuthProvider>
      <ThemeProvider>
        <RootNavigator />
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
