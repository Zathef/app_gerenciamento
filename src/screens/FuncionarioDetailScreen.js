import React, { useRef, useEffect } from 'react';
import { Animated, Text } from 'react-native';
import screenStyles from '@styles/screenStyles';
import { slideUp } from '@styles/animations/slideUpAnimation';
import { fadeIn } from '@styles/animations/fadeInAnimation';

export default function FuncionarioDetailScreen({ route }) {
  const { funcionario } = route.params;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    fadeIn(fadeAnim);
    slideUp(slideAnim);
  }, []);

  return (
    <Animated.View style={[screenStyles.container, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>
      <Text style={screenStyles.title}>{funcionario.nome}</Text>
      <Text style={screenStyles.subtitle}>Cargo: {funcionario.cargo}</Text>
      <Text style={screenStyles.subtitle}>Email: {funcionario.email}</Text>
    </Animated.View>
  );
}
