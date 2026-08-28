// src/styles/inputStyles.js
import { StyleSheet } from 'react-native';
import colors from '@styles/colors';

export default StyleSheet.create({
  input: {
    width: '100%',
    backgroundColor: colors.secondary,
    color: colors.textLight,
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: colors.accent,
  },
});
