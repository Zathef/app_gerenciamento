import { Animated } from 'react-native';

export const fadeIn = (animRef) => {
  Animated.timing(animRef, {
    toValue: 1,
    duration: 300,
    useNativeDriver: true,
  }).start();
};
