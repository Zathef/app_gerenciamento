import React, { useState } from 'react';
import { View, FlatList, Alert, Text } from 'react-native';
import Card from '@components/Card';
import Input from '@components/Input';
import ButtonPrimary from '@components/ButtonPrimary';
import screenStyles from '@styles/screenStyles';
import { useApp } from '@context/AppContext';

function alertarSenhaTemporaria(senha, email) {
  Alert.alert(
    'Senha temporária gerada',
    `E-mail: ${email}\nSenha (válida por 24h):\n${senha}\n\nO funcionário deve trocar a senha no primeiro acesso.`
  );
}

export default function FuncionariosScreen() {
  const { funcionarios, cadastrarFuncionario, removerFuncionario, reemitirSenha } = useApp();
  const [nome, setNome] = useState('');
  const [cargo, setCargo] = useState('');
  const [email, setEmail] = useState('');

  const handleCadastrar = async () => {
    const resultado = await cadastrarFuncionario({ nome, cargo, email });
    if (!resultado.ok) {
      Alert.alert('Erro', resultado.erro);
      return;
    }

    setNome('');
    setCargo('');
    setEmail('');
    alertarSenhaTemporaria(resultado.senhaTemporaria, resultado.funcionario.email);
  };

  const handleReemitir = (item) => {
    Alert.alert(
      'Nova senha temporária',
      `Gerar nova senha de 24h para ${item.nome}?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Gerar',
          onPress: async () => {
            const resultado = await reemitirSenha(item.id);
            if (!resultado.ok) {
              Alert.alert('Erro', resultado.erro);
              return;
            }
            alertarSenhaTemporaria(resultado.senhaTemporaria, item.email);
          },
        },
      ]
    );
  };

  return (
    <View style={screenStyles.container}>
      <FlatList
        data={funcionarios}
        keyExtractor={(item) => item.id.toString()}
        keyboardShouldPersistTaps="handled"
        ListHeaderComponent={
          <View>
            <Text style={screenStyles.title}>Cadastrar funcionário</Text>
            <Input placeholder="Nome" value={nome} onChangeText={setNome} />
            <Input placeholder="Cargo" value={cargo} onChangeText={setCargo} />
            <Input
              placeholder="E-mail"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <ButtonPrimary icon="person-add-outline" onPress={handleCadastrar} />
          </View>
        }
        ListEmptyComponent={
          <Text style={screenStyles.subtitle}>Nenhum funcionário cadastrado.</Text>
        }
        renderItem={({ item }) => (
          <Card
            title={item.nome}
            subtitle={`${item.cargo} • ${item.email}\n${item.statusSenha}`}
            action={<ButtonPrimary type="danger" icon="trash-outline" />}
            onPress={() => handleReemitir(item)}
            onRemove={() => removerFuncionario(item.id)}
          />
        )}
      />
    </View>
  );
}
