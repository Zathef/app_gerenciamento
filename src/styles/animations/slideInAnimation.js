import { Animated } from 'react-native';

export const slideInFromRight = (animRef) => {
  Animated.timing(animRef, {
    toValue: 0,
    duration: 400,
    useNativeDriver: true,
  }).start();
};
