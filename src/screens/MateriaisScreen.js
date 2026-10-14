import React, { useEffect, useState } from 'react';
import { View, FlatList, Alert, Text } from 'react-native';
import Card from '@components/Card';
import Input from '@components/Input';
import ButtonPrimary from '@components/ButtonPrimary';
import screenStyles from '@styles/screenStyles';
import { useApp } from '@context/AppContext';
import { formatarMoeda, formatarPercentual } from '@services/materialService';

export default function MateriaisScreen({ navigation }) {
  const {
    sessao,
    materiais,
    precoConstrucao,
    resumoFinanceiro,
    cadastrarMaterial,
    definirPrecoConstrucao,
    removerMaterial,
  } = useApp();
  const isAdmin = sessao?.role === 'admin';

  const [nome, setNome] = useState('');
  const [quantidade, setQuantidade] = useState('');
  const [custo, setCusto] = useState('');
  const [preco, setPreco] = useState('');

  useEffect(() => {
    if (precoConstrucao) setPreco(String(precoConstrucao).replace('.', ','));
  }, [precoConstrucao]);

  const handleCadastrar = async () => {
    const resultado = await cadastrarMaterial({ nome, quantidade, custo });
    if (!resultado.ok) {
      Alert.alert('Erro', resultado.erro);
      return;
    }
    setNome('');
    setQuantidade('');
    setCusto('');
  };

  const handleSalvarPreco = async () => {
    const resultado = await definirPrecoConstrucao(preco);
    if (!resultado.ok) {
      Alert.alert('Erro', resultado.erro);
      return;
    }
    Alert.alert('Preço salvo', 'O lucro da construção foi recalculado.');
  };

  const abrirDetalhe = (material) => {
    navigation.navigate('MaterialDetail', { material, resumoFinanceiro });
  };

  return (
    <View style={screenStyles.container}>
      <FlatList
        data={materiais}
        keyExtractor={(item) => item.id.toString()}
        keyboardShouldPersistTaps="handled"
        ListHeaderComponent={
          <View>
            {isAdmin && (
              <View>
                <Text style={screenStyles.title}>Matéria-prima</Text>
                <Input placeholder="Nome" value={nome} onChangeText={setNome} />
                <Input
                  placeholder="Quantidade"
                  value={quantidade}
                  onChangeText={setQuantidade}
                  keyboardType="decimal-pad"
                  autoCapitalize="none"
                />
                <Input
                  placeholder="Custo unitário (R$)"
                  value={custo}
                  onChangeText={setCusto}
                  keyboardType="decimal-pad"
                  autoCapitalize="none"
                />
                <ButtonPrimary icon="add-outline" onPress={handleCadastrar} />

                <Text style={screenStyles.title}>Preço cobrado da construção</Text>
                <Input
                  placeholder="Preço cobrado (R$)"
                  value={preco}
                  onChangeText={setPreco}
                  keyboardType="decimal-pad"
                  autoCapitalize="none"
                />
                <ButtonPrimary icon="cash-outline" onPress={handleSalvarPreco} />
              </View>
            )}

            <View style={screenStyles.summary}>
              <Text style={screenStyles.summaryLine}>
                Custo das matérias-primas: {formatarMoeda(resumoFinanceiro.custoTotal)}
              </Text>
              <Text style={screenStyles.summaryLine}>
                Preço cobrado: {formatarMoeda(resumoFinanceiro.preco)}
              </Text>
              <Text style={screenStyles.summaryLine}>
                Lucro: {formatarMoeda(resumoFinanceiro.lucro)}
              </Text>
              <Text style={screenStyles.summaryLine}>
                Porcentagem de lucro: {formatarPercentual(resumoFinanceiro.percentual)}
              </Text>
            </View>
          </View>
        }
        ListEmptyComponent={
          <Text style={screenStyles.subtitle}>Nenhuma matéria-prima cadastrada.</Text>
        }
        renderItem={({ item }) => (
          <Card
            title={item.nome}
            subtitle={`Qtd: ${item.quantidade} • Custo un.: ${formatarMoeda(item.custo)}\nTotal: ${formatarMoeda(item.custoTotal ?? item.quantidade * item.custo)}`}
            action={isAdmin ? <ButtonPrimary type="danger" icon="trash-outline" /> : null}
            onPress={() => abrirDetalhe(item)}
            onRemove={() => removerMaterial(item.id)}
          />
        )}
      />
    </View>
  );
}
