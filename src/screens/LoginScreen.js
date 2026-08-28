import React, { useState } from 'react';
import { View, Text, Alert } from 'react-native';
import Input from '@components/Input';
import ButtonPrimary from '@components/ButtonPrimary';
import screenStyles from '@styles/screenStyles';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleLogin = () => {
    if (email === 'admin@empresa.com' && senha === '1234') {
      navigation.navigate('Admin');
    } else if (email === 'funcionario@empresa.com' && senha === '1234') {
      navigation.navigate('Funcionario');
    } else {
      Alert.alert('Erro', 'Credenciais inválidas. Tente novamente.');
    }
  };

  return (
    <View style={[screenStyles.container, screenStyles.centered]}>
      <Text style={screenStyles.title}>Tela de Login</Text>
      <Input placeholder="E-mail" value={email} onChangeText={setEmail} />
      <Input placeholder="Senha" value={senha} onChangeText={setSenha} secureTextEntry />
      <ButtonPrimary icon="log-in-outline" onPress={handleLogin} />
    </View>
  );
}
