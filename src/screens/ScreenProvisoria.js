import React from 'react';
import { View, Text, Button, ScrollView, StyleSheet } from 'react-native';

export default function ScreenProvisoria({ navigation }) {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>⬆️ Seção Anterior</Text>
      <Button
        title="Voltar para Home"
        onPress={() => navigation.navigate('Home')}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 24, marginBottom: 20 },
});
