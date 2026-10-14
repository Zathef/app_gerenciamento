import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import MateriaisScreen from '@screens/MateriaisScreen';
import MaterialDetailScreen from '@screens/MaterialDetailScreen';

const Stack = createStackNavigator();

export default function MateriaisStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MateriaisLista" component={MateriaisScreen} />
      <Stack.Screen
        name="MaterialDetail"
        component={MaterialDetailScreen}
        options={{
          headerShown: true,
          headerTitle: 'Matéria-prima',
          headerTintColor: '#ECF0F1',
          headerStyle: { backgroundColor: '#34495E' },
        }}
      />
    </Stack.Navigator>
  );
}
