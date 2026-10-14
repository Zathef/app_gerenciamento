import AsyncStorage from '@react-native-async-storage/async-storage';

const KEYS = {
  users: '@trabaio/users',
  session: '@trabaio/session',
  materiais: '@trabaio/materiais',
  relatorios: '@trabaio/relatorios',
  precoConstrucao: '@trabaio/precoConstrucao',
};

async function lerJson(chave, fallback) {
  const bruto = await AsyncStorage.getItem(chave);
  if (!bruto) return fallback;
  try {
    return JSON.parse(bruto);
  } catch {
    return fallback;
  }
}

async function gravarJson(chave, valor) {
  await AsyncStorage.setItem(chave, JSON.stringify(valor));
}

export const storageService = {
  lerUsuarios: () => lerJson(KEYS.users, null),
  gravarUsuarios: (usuarios) => gravarJson(KEYS.users, usuarios),
  lerSessao: () => lerJson(KEYS.session, null),
  gravarSessao: (sessao) => gravarJson(KEYS.session, sessao),
  limparSessao: () => AsyncStorage.removeItem(KEYS.session),
  lerMateriais: () => lerJson(KEYS.materiais, []),
  gravarMateriais: (materiais) => gravarJson(KEYS.materiais, materiais),
  lerRelatorios: () => lerJson(KEYS.relatorios, []),
  gravarRelatorios: (relatorios) => gravarJson(KEYS.relatorios, relatorios),
  lerPrecoConstrucao: () => lerJson(KEYS.precoConstrucao, 0),
  gravarPrecoConstrucao: (preco) => gravarJson(KEYS.precoConstrucao, preco),
};
