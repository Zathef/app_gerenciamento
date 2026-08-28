import React from 'react';
import { View, FlatList } from 'react-native';
import Card from '@components/Card';
import ButtonPrimary from '@components/ButtonPrimary';
import screenStyles from '@styles/screenStyles';

export default function MateriaisScreen({ materiais, removerMaterial }) {
  return (
    <View style={screenStyles.container}>
      <FlatList
        data={materiais}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Card
            title={item.nome}
            subtitle={`Quantidade: ${item.quantidade}`}
            action={<ButtonPrimary title="Remover" type="danger" />}
            onRemove={() => removerMaterial(item.id)}
          />
        )}
      />
    </View>
  );
}
