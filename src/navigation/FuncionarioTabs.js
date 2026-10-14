import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MateriaisStack from '@navigation/MateriaisStack';
import RelatoriosScreen from '@screens/RelatoriosScreen';
import colors from '@styles/colors';
import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

export default function FuncionarioTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: { backgroundColor: colors.secondary },
        tabBarActiveTintColor: colors.accent,
        tabBarInactiveTintColor: colors.textLight,
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === 'Materiais') iconName = 'cube';
          else if (route.name === 'Relatórios') iconName = 'document-text';
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Materiais" component={MateriaisStack} />
      <Tab.Screen name="Relatórios" component={RelatoriosScreen} />
    </Tab.Navigator>
  );
}
