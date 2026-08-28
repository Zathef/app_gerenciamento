import React from 'react';
import { View, FlatList } from 'react-native';
import Card from '@components/Card';
import ButtonPrimary from '@components/ButtonPrimary';
import screenStyles from '@styles/screenStyles';

export default function RelatoriosScreen({ relatorios, removerRelatorio }) {
  return (
    <View style={screenStyles.container}>
      <FlatList
        data={relatorios}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Card
            title={item.titulo}
            subtitle={`Data: ${item.data}`}
            action={<ButtonPrimary title="Remover" type="danger" />}
            onRemove={() => removerRelatorio(item.id)}
          />
        )}
      />
    </View>
  );
}
