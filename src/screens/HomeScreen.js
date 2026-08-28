import React from 'react';
import { View, Text, Button, ScrollView, StyleSheet } from 'react-native';

export default function HomeScreen({ navigation }) {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>🏠 Tela Inicial</Text>
      <Button
        title="Ir para Seção Anterior"
        onPress={() => navigation.navigate('Anterior')}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 24, marginBottom: 20 },
});
