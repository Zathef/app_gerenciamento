// src/navigation/AppStack.js
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '@screens/LoginScreen';
import AdminTabs from '@navigation/AdminTabs';
import FuncionarioTabs from '@navigation/FuncionarioTabs';

const Stack = createStackNavigator();

export default function AppStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {/* Tela inicial */}
      <Stack.Screen name="Login" component={LoginScreen} />

      {/* Fluxo do Admin */}
      <Stack.Screen name="Admin" component={AdminTabs} />

      {/* Fluxo do Funcionário */}
      <Stack.Screen name="Funcionario" component={FuncionarioTabs} />
    </Stack.Navigator>
  );
}
