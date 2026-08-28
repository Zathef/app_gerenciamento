// src/styles/screenStyles.js
import { StyleSheet } from 'react-native';
import colors from './colors';
import layout from './layoutStyles';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
    paddingHorizontal: layout.spacingMedium,
    paddingVertical: layout.spacingLarge,
  },
  centered: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    color: colors.textLight,
    marginBottom: layout.spacingMedium,
  },
});
