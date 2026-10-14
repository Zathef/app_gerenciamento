import React, { useState } from 'react';
import { View, Text, Alert } from 'react-native';
import Input from '@components/Input';
import ButtonPrimary from '@components/ButtonPrimary';
import screenStyles from '@styles/screenStyles';
import { useApp } from '@context/AppContext';

export default function LoginScreen({ navigation }) {
  const { login } = useApp();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleLogin = async () => {
    const resultado = await login(email, senha);
    if (!resultado.ok) {
      Alert.alert('Erro', resultado.erro);
      return;
    }

    const { sessao } = resultado;
    if (sessao.mustChangePassword) {
      navigation.navigate('TrocarSenha');
      return;
    }

    navigation.navigate(sessao.role === 'admin' ? 'Admin' : 'Funcionario');
  };

  return (
    <View style={[screenStyles.container, screenStyles.centered]}>
      <Text style={screenStyles.title}>Tela de Login</Text>
      <Input
        placeholder="E-mail"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <Input
        placeholder="Senha"
        value={senha}
        onChangeText={setSenha}
        secureTextEntry
        autoCapitalize="none"
      />
      <ButtonPrimary icon="log-in-outline" onPress={handleLogin} />
    </View>
  );
}
