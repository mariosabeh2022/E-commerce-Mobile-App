import React from 'react';
import {AuthProvider} from './src/contexts/authContext';
import RootNavigator from './src/navigation/navigator/rootNavigator';

function App(): React.JSX.Element {
  return (
    <AuthProvider>
      <RootNavigator />
    </AuthProvider>
  );
}

export default App;
