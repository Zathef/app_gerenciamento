import React from 'react';
import { View, FlatList } from 'react-native';
import Card from '@components/Card';
import ButtonPrimary from '@components/ButtonPrimary';
import screenStyles from '@styles/screenStyles';

export default function FuncionariosScreen({ funcionarios, removerFuncionario }) {
  return (
    <View style={screenStyles.container}>
      <FlatList
        data={funcionarios}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Card
            title={item.nome}
            subtitle={`Cargo: ${item.cargo}`}
            action={<ButtonPrimary title="Remover" type="danger" />}
            onRemove={() => removerFuncionario(item.id)}
          />
        )}
      />
    </View>
  );
}
