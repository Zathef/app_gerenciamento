import { Animated } from 'react-native';

export const pressInScale = (animRef) => {
  Animated.spring(animRef, {
    toValue: 0.95,
    useNativeDriver: true,
    speed: 20,
    bounciness: 8,
  }).start();
};

export const pressOutScale = (animRef) => {
  Animated.spring(animRef, {
    toValue: 1,
    useNativeDriver: true,
    speed: 20,
    bounciness: 8,
  }).start();
};
