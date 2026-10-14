import React, { useState } from 'react';
import { View, Text, Alert } from 'react-native';
import Input from '@components/Input';
import ButtonPrimary from '@components/ButtonPrimary';
import screenStyles from '@styles/screenStyles';
import { useApp } from '@context/AppContext';

export default function TrocarSenhaScreen({ navigation }) {
  const { sessao, trocarSenha } = useApp();
  const [senhaAtual, setSenhaAtual] = useState('');
  const [novaSenha, setNovaSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');

  const handleTrocar = async () => {
    const resultado = await trocarSenha(senhaAtual, novaSenha, confirmarSenha);
    if (!resultado.ok) {
      Alert.alert('Erro', resultado.erro);
      return;
    }

    Alert.alert('Senha atualizada', 'Use a nova senha nos próximos acessos.');
    const destino = sessao?.role === 'admin' ? 'Admin' : 'Funcionario';
    navigation.reset({ index: 0, routes: [{ name: destino }] });
  };

  return (
    <View style={[screenStyles.container, screenStyles.centered]}>
      <Text style={screenStyles.title}>Trocar senha</Text>
      <Text style={screenStyles.subtitle}>
        A senha temporária vale 24h. Defina uma senha permanente no primeiro acesso.
      </Text>
      <Input
        placeholder="Senha temporária"
        value={senhaAtual}
        onChangeText={setSenhaAtual}
        secureTextEntry
        autoCapitalize="none"
      />
      <Input
        placeholder="Nova senha"
        value={novaSenha}
        onChangeText={setNovaSenha}
        secureTextEntry
        autoCapitalize="none"
      />
      <Input
        placeholder="Confirmar nova senha"
        value={confirmarSenha}
        onChangeText={setConfirmarSenha}
        secureTextEntry
        autoCapitalize="none"
      />
      <ButtonPrimary icon="checkmark-outline" onPress={handleTrocar} />
    </View>
  );
}
