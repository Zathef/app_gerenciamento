import { StyleSheet } from 'react-native';
import colors from '@styles/colors';
import layout from '@styles/layoutStyles';

export default StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.accent, // mantém o verde‑água
    width: 90,                      // largura fixa proporcional
    height: 90,                     // altura igual para formato circular
    borderRadius: 45,               // metade da largura para círculo perfeito
    alignSelf: 'center',
    marginTop: layout.buttonMarginTop,
    elevation: 6,                   // sombra suave
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 4,
  },
  buttonDanger: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E74C3C',
    width: 90,
    height: 90,
    borderRadius: 45,
    alignSelf: 'center',
    marginTop: layout.buttonMarginTop,
    elevation: 6,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 4,
  },
  buttonPressed: {
    opacity: 0.85,
  },
});
