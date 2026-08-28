import { Animated } from 'react-native';

export const fadeOut = (animRef, callback) => {
  Animated.timing(animRef, {
    toValue: 0,
    duration: 300,
    useNativeDriver: true,
  }).start(() => {
    if (callback) callback();
  });
};
