import React, { useRef, useEffect } from 'react';
import { Animated, Pressable, Text, View } from 'react-native';
import styles from '@styles/cardStyles';
import { fadeOut } from '@styles/animations/fadeOutAnimation';
import { fadeIn } from '@styles/animations/fadeInAnimation';
import { slideInFromRight } from '@styles/animations/slideInAnimation';

export default function Card({ title, subtitle, onPress, action, onRemove }) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;

  useEffect(() => {
    fadeIn(fadeAnim);
    slideInFromRight(slideAnim);
  }, []);

  const handleRemove = () => {
    fadeOut(fadeAnim, onRemove);
  };

  return (
    <Animated.View style={{ opacity: fadeAnim, transform: [{ translateX: slideAnim }] }}>
      <Pressable
        style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
        android_ripple={{ color: '#ffffff30' }}
        onPress={onPress}
      >
        <View style={styles.content}>
          <Text style={styles.title}>{title}</Text>
          {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
        </View>
        {action && (
          <View style={styles.actionContainer}>
            {React.cloneElement(action, { onPress: handleRemove })}
          </View>
        )}
      </Pressable>
    </Animated.View>
  );
}
