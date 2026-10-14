import React, { useRef, useEffect } from 'react';
import { Animated, Text } from 'react-native';
import screenStyles from '@styles/screenStyles';
import { slideUp } from '@styles/animations/slideUpAnimation';
import { fadeIn } from '@styles/animations/fadeInAnimation';
import { formatarMoeda, formatarPercentual } from '@services/materialService';

export default function MaterialDetailScreen({ route }) {
  const { material, resumoFinanceiro } = route.params;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const custoTotal = material.custoTotal ?? material.quantidade * material.custo;

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
      <Text style={screenStyles.subtitle}>Custo unitário: {formatarMoeda(material.custo)}</Text>
      <Text style={screenStyles.subtitle}>Custo total: {formatarMoeda(custoTotal)}</Text>
      {material.descricao ? (
        <Text style={screenStyles.subtitle}>Descrição: {material.descricao}</Text>
      ) : null}
      {resumoFinanceiro ? (
        <Text style={screenStyles.subtitle}>
          Lucro da construção: {formatarMoeda(resumoFinanceiro.lucro)} (
          {formatarPercentual(resumoFinanceiro.percentual)})
        </Text>
      ) : null}
    </Animated.View>
  );
}
