import React, { useRef } from 'react';
import { Animated, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from '@styles/buttonStyles';
import { pressInScale, pressOutScale } from '@styles/animations/scaleAnimation';

export default function ButtonPrimary({ icon, onPress, type = 'default' }) {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const isDanger = type === 'danger';

  return (
    <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
      <Pressable
        style={({ pressed }) => [
          isDanger ? styles.buttonDanger : styles.button,
          pressed && styles.buttonPressed,
        ]}
        onPressIn={() => pressInScale(scaleAnim)}
        onPressOut={() => pressOutScale(scaleAnim)}
        onPress={onPress}
      >
        <Ionicons name={icon} size={42} color="#fff" />
      </Pressable>
    </Animated.View>
  );
}
