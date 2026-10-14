// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppStack from './src/navigation/AppStack';
import { AppProvider } from './src/context/AppContext';

export default function App() {
  return (
    <AppProvider>
      <NavigationContainer>
        <AppStack />
      </NavigationContainer>
    </AppProvider>
  );
}
