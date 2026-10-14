import * as Crypto from 'expo-crypto';

const CHARS = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789';

function bytesToHex(bytes) {
  return Array.from(bytes, (b) => b.toString(16).padStart(2, '0')).join('');
}

export async function hashSenha(senha, salt) {
  return Crypto.digestStringAsync(
    Crypto.CryptoDigestAlgorithm.SHA256,
    `${salt}:${senha}`
  );
}

export async function criarHashSenha(senha) {
  const salt = bytesToHex(await Crypto.getRandomBytesAsync(16));
  const hash = await hashSenha(senha, salt);
  return { hash, salt };
}

export async function verificarSenha(senha, hash, salt) {
  const atual = await hashSenha(senha, salt);
  return atual === hash;
}

export async function gerarSenhaTemporaria(tamanho = 8) {
  const bytes = await Crypto.getRandomBytesAsync(tamanho);
  return Array.from(bytes, (b) => CHARS[b % CHARS.length]).join('');
}

export function gerarId() {
  return Crypto.randomUUID();
}
