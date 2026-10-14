import React from 'react';
import { View, FlatList, Alert, Text } from 'react-native';
import Card from '@components/Card';
import ButtonPrimary from '@components/ButtonPrimary';
import screenStyles from '@styles/screenStyles';
import { useApp } from '@context/AppContext';
import { formatarMoeda, formatarPercentual } from '@services/materialService';

export default function RelatoriosScreen() {
  const {
    sessao,
    relatorios,
    resumoFinanceiro,
    gerarRelatorio,
    removerRelatorio,
  } = useApp();
  const isAdmin = sessao?.role === 'admin';

  const handleGerar = async () => {
    const resultado = await gerarRelatorio();
    if (!resultado.ok) {
      Alert.alert('Erro', resultado.erro);
      return;
    }
    Alert.alert(
      'Relatório gerado',
      `Lucro: ${formatarMoeda(resultado.relatorio.lucro)}\nPorcentagem: ${formatarPercentual(resultado.relatorio.percentual)}`
    );
  };

  return (
    <View style={screenStyles.container}>
      <FlatList
        data={relatorios}
        keyExtractor={(item) => item.id.toString()}
        ListHeaderComponent={
          <View>
            <Text style={screenStyles.title}>Lucro da construção</Text>
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
            {isAdmin && <ButtonPrimary icon="document-text-outline" onPress={handleGerar} />}
          </View>
        }
        ListEmptyComponent={
          <Text style={screenStyles.subtitle}>Nenhum relatório gerado.</Text>
        }
        renderItem={({ item }) => (
          <Card
            title={item.titulo}
            subtitle={`Data: ${item.data}\nCusto: ${formatarMoeda(item.custoTotal)} • Preço: ${formatarMoeda(item.preco)}\nLucro: ${formatarMoeda(item.lucro)} (${formatarPercentual(item.percentual)})`}
            action={isAdmin ? <ButtonPrimary type="danger" icon="trash-outline" /> : null}
            onRemove={() => removerRelatorio(item.id)}
          />
        )}
      />
    </View>
  );
}
