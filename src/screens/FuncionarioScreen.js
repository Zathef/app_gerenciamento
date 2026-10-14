// src/screens/FuncionarioScreen.js
import React from 'react';
import { View, Text } from 'react-native';
import ButtonPrimary from '@components/ButtonPrimary';
import screenStyles from '@styles/screenStyles';
import { useApp } from '@context/AppContext';

export default function FuncionarioScreen({ navigation }) {
  const { sessao } = useApp();

  return (
    <View style={screenStyles.container}>
      <Text style={screenStyles.title}>Bem-vindo, {sessao?.nome || 'Funcionário'}</Text>
      <ButtonPrimary icon="cube-outline" onPress={() => navigation.navigate('Materiais')} />
      <ButtonPrimary icon="document-text-outline" onPress={() => navigation.navigate('Relatórios')} />
    </View>
  );
}
