import React, { useRef, useEffect } from 'react';
import { Animated, Text } from 'react-native';
import screenStyles from '@styles/screenStyles';
import { slideUp } from '@styles/animations/slideUpAnimation';
import { fadeIn } from '@styles/animations/fadeInAnimation';

export default function MaterialDetailScreen({ route }) {
  const { material } = route.params;
  const slideAnim = useRef(new Animated.Value(50)).current; // deslocado para baixo
  const fadeAnim = useRef(new Animated.Value(0)).current;   // invisível no início

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
      <Text style={screenStyles.title}>{material.nome}</Text>
      <Text style={screenStyles.subtitle}>Quantidade: {material.quantidade}</Text>
      {material.descricao && (
        <Text style={screenStyles.subtitle}>Descrição: {material.descricao}</Text>
      )}
    </Animated.View>
  );
}
