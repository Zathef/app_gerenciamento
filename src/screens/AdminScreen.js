import React, { useRef, useEffect } from 'react';
import { Animated, View, Text } from 'react-native';
import screenStyles from '@styles/screenStyles';
import { fadeIn } from '@styles/animations/fadeInAnimation';
import { slideUp } from '@styles/animations/slideUpAnimation';
import ButtonPrimary from '@components/ButtonPrimary';

export default function AdminScreen({ navigation }) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;

  useEffect(() => {
    fadeIn(fadeAnim);
    slideUp(slideAnim);
  }, []);

  return (
    <Animated.View
      style={[
        screenStyles.container,
        { opacity: fadeAnim, transform: [{ translateY: slideAnim }] },
      ]}
    >
      <Text style={screenStyles.title}>Bem-vindo!</Text>
      <Text style={screenStyles.subtitle}>
        Nenhum registro encontrado. Use os botões abaixo para começar.
      </Text>

      <View style={screenStyles.actions}>
        <ButtonPrimary
          title="Adicionar Funcionário"
          onPress={() => navigation.navigate('Funcionarios')}
        />
        <ButtonPrimary
          title="Adicionar Material"
          onPress={() => navigation.navigate('Materiais')}
        />
        <ButtonPrimary
          title="Gerar Relatório"
          onPress={() => navigation.navigate('Relatorios')}
        />
      </View>
    </Animated.View>
  );
}
