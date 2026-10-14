// src/styles/cardStyles.js
import { StyleSheet } from 'react-native';
import colors from '@styles/colors';
import layout from '@styles/layoutStyles';

export default StyleSheet.create({
  card: {
    backgroundColor: colors.secondary,
    paddingVertical: layout.spacingMedium,
    paddingHorizontal: layout.spacingMedium,
    borderRadius: 8,
    marginBottom: layout.cardGap,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  content: {
    flex: 1,
  },
  cardPressed: {
    backgroundColor: '#3b4a5a',
    shadowColor: '#fff',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 8,
  },
  title: {
    color: colors.textLight,
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  subtitle: {
    color: colors.placeholder,
    fontSize: 14,
  },
  actionContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: layout.spacingMedium,
  },
});
