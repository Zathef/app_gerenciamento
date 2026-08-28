// src/screens/FuncionarioScreen.js
import React from 'react';
import { View, Text } from 'react-native';
import ButtonPrimary from '@components/ButtonPrimary';
import screenStyles from '@styles/screenStyles';

export default function FuncionarioScreen({ navigation }) {
  return (
    <View style={screenStyles.container}>
      <Text style={screenStyles.title}>Bem-vindo, Funcionário</Text>
      <ButtonPrimary title="Acessar Materiais" onPress={() => navigation.navigate('Materiais')} />
      <ButtonPrimary title="Ver Relatórios" onPress={() => navigation.navigate('Relatórios')} />
    </View>
  );
}
