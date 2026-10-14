import { criarHashSenha, gerarId, gerarSenhaTemporaria, verificarSenha } from './cryptoService';
import { storageService } from './storageService';

export const TEMP_PASSWORD_TTL_MS = 24 * 60 * 60 * 1000;

const ADMIN_EMAIL = 'admin@empresa.com';
const ADMIN_SENHA_PADRAO = '1234';

export function normalizarEmail(email = '') {
  return email.trim().toLowerCase();
}

export function senhaTemporariaExpirada(usuario) {
  if (!usuario?.mustChangePassword) return false;
  return Date.now() - usuario.passwordCreatedAt > TEMP_PASSWORD_TTL_MS;
}

export function statusSenha(usuario) {
  if (!usuario.mustChangePassword) return 'Ativo';
  if (senhaTemporariaExpirada(usuario)) return 'Senha temporária expirada';
  return 'Aguardando 1º acesso (24h)';
}

function sessaoPublica(usuario) {
  return {
    id: usuario.id,
    nome: usuario.nome,
    cargo: usuario.cargo,
    email: usuario.email,
    role: usuario.role,
    mustChangePassword: usuario.mustChangePassword,
  };
}

async function seedAdminSeVazio(usuarios) {
  if (usuarios?.length) return usuarios;
  const { hash, salt } = await criarHashSenha(ADMIN_SENHA_PADRAO);
  const admin = {
    id: gerarId(),
    nome: 'Administrador',
    cargo: 'Admin',
    email: ADMIN_EMAIL,
    role: 'admin',
    passwordHash: hash,
    salt,
    passwordCreatedAt: Date.now(),
    mustChangePassword: false,
  };
  await storageService.gravarUsuarios([admin]);
  return [admin];
}

export async function carregarUsuarios() {
  const salvos = await storageService.lerUsuarios();
  return seedAdminSeVazio(salvos);
}

export async function autenticar(email, senha) {
  const emailNorm = normalizarEmail(email);
  if (!emailNorm || !senha) {
    return { ok: false, erro: 'Informe e-mail e senha.' };
  }

  const usuarios = await carregarUsuarios();
  const usuario = usuarios.find((item) => item.email === emailNorm);

  if (!usuario) {
    return { ok: false, erro: 'E-mail não cadastrado pelo administrador.' };
  }

  const senhaValida = await verificarSenha(senha, usuario.passwordHash, usuario.salt);
  if (!senhaValida) {
    return { ok: false, erro: 'Credenciais inválidas. Tente novamente.' };
  }

  if (senhaTemporariaExpirada(usuario)) {
    return {
      ok: false,
      erro: 'Senha temporária expirada (24h). Solicite uma nova ao administrador.',
    };
  }

  const sessao = sessaoPublica(usuario);
  await storageService.gravarSessao(sessao);
  return { ok: true, sessao };
}

export async function cadastrarFuncionario({ nome, cargo, email }) {
  const emailNorm = normalizarEmail(email);
  const nomeLimpo = nome?.trim();
  const cargoLimpo = cargo?.trim();

  if (!nomeLimpo || !cargoLimpo || !emailNorm) {
    return { ok: false, erro: 'Preencha nome, cargo e e-mail.' };
  }

  const usuarios = await carregarUsuarios();
  if (usuarios.some((item) => item.email === emailNorm)) {
    return { ok: false, erro: 'Este e-mail já está cadastrado.' };
  }

  const senhaTemporaria = await gerarSenhaTemporaria();
  const { hash, salt } = await criarHashSenha(senhaTemporaria);
  const funcionario = {
    id: gerarId(),
    nome: nomeLimpo,
    cargo: cargoLimpo,
    email: emailNorm,
    role: 'funcionario',
    passwordHash: hash,
    salt,
    passwordCreatedAt: Date.now(),
    mustChangePassword: true,
  };

  await storageService.gravarUsuarios([...usuarios, funcionario]);
  return { ok: true, funcionario: sessaoPublica(funcionario), senhaTemporaria };
}

export async function reemitirSenhaTemporaria(id) {
  const usuarios = await carregarUsuarios();
  const indice = usuarios.findIndex((item) => item.id === id);
  if (indice < 0) return { ok: false, erro: 'Funcionário não encontrado.' };

  const senhaTemporaria = await gerarSenhaTemporaria();
  const { hash, salt } = await criarHashSenha(senhaTemporaria);
  usuarios[indice] = {
    ...usuarios[indice],
    passwordHash: hash,
    salt,
    passwordCreatedAt: Date.now(),
    mustChangePassword: true,
  };

  await storageService.gravarUsuarios(usuarios);
  return { ok: true, senhaTemporaria, funcionario: sessaoPublica(usuarios[indice]) };
}

export async function trocarSenha(userId, senhaAtual, novaSenha, confirmarSenha) {
  if (!novaSenha || novaSenha.length < 6) {
    return { ok: false, erro: 'A nova senha deve ter pelo menos 6 caracteres.' };
  }
  if (novaSenha !== confirmarSenha) {
    return { ok: false, erro: 'A confirmação não confere com a nova senha.' };
  }
  if (senhaAtual && novaSenha === senhaAtual) {
    return { ok: false, erro: 'A nova senha deve ser diferente da temporária.' };
  }

  const usuarios = await carregarUsuarios();
  const indice = usuarios.findIndex((item) => item.id === userId);
  if (indice < 0) return { ok: false, erro: 'Usuário não encontrado.' };

  const usuario = usuarios[indice];
  if (senhaAtual) {
    const atualValida = await verificarSenha(senhaAtual, usuario.passwordHash, usuario.salt);
    if (!atualValida) return { ok: false, erro: 'Senha atual inválida.' };
  }

  const { hash, salt } = await criarHashSenha(novaSenha);
  usuarios[indice] = {
    ...usuario,
    passwordHash: hash,
    salt,
    passwordCreatedAt: Date.now(),
    mustChangePassword: false,
  };

  const sessao = sessaoPublica(usuarios[indice]);
  await storageService.gravarUsuarios(usuarios);
  await storageService.gravarSessao(sessao);
  return { ok: true, sessao };
}

export async function removerUsuario(id) {
  const usuarios = await carregarUsuarios();
  const restantes = usuarios.filter((item) => item.id !== id);
  await storageService.gravarUsuarios(restantes);
  return restantes;
}

export function listarFuncionarios(usuarios = []) {
  return usuarios
    .filter((item) => item.role === 'funcionario')
    .map(({ passwordHash, salt, ...publico }) => publico);
}
