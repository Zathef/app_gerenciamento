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
  subtitle: {
    fontSize: 16,
    color: colors.textLight,
    marginBottom: layout.spacingMedium,
    textAlign: 'center',
  },
  actions: {
    width: '100%',
    alignItems: 'center',
  },
  summary: {
    backgroundColor: colors.secondary,
    borderRadius: 8,
    padding: layout.spacingMedium,
    marginBottom: layout.spacingMedium,
    marginTop: layout.spacingMedium,
  },
  summaryLine: {
    fontSize: 15,
    color: colors.textLight,
    marginBottom: 6,
  },
});
