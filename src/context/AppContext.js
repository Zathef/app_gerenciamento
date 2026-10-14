import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import {
  autenticar,
  cadastrarFuncionario as registrarFuncionario,
  carregarUsuarios,
  listarFuncionarios,
  reemitirSenhaTemporaria,
  removerUsuario,
  statusSenha,
  trocarSenha as atualizarSenha,
} from '@services/authService';
import { storageService } from '@services/storageService';
import {
  cadastrarMaterial as registrarMaterial,
  calcularResumoFinanceiro,
  criarRelatorioFinanceiro,
  validarPrecoConstrucao,
} from '@services/materialService';

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [usuarios, setUsuarios] = useState([]);
  const [sessao, setSessao] = useState(null);
  const [materiais, setMateriais] = useState([]);
  const [relatorios, setRelatorios] = useState([]);
  const [precoConstrucao, setPrecoConstrucao] = useState(0);
  const [pronto, setPronto] = useState(false);

  useEffect(() => {
    (async () => {
      const [users, session, mats, rels, preco] = await Promise.all([
        carregarUsuarios(),
        storageService.lerSessao(),
        storageService.lerMateriais(),
        storageService.lerRelatorios(),
        storageService.lerPrecoConstrucao(),
      ]);
      setUsuarios(users);
      setSessao(session);
      setMateriais(mats);
      setRelatorios(rels);
      setPrecoConstrucao(preco || 0);
      setPronto(true);
    })();
  }, []);

  const resumoFinanceiro = useMemo(
    () => calcularResumoFinanceiro(materiais, precoConstrucao),
    [materiais, precoConstrucao]
  );

  const funcionarios = useMemo(
    () =>
      listarFuncionarios(usuarios).map((item) => ({
        ...item,
        statusSenha: statusSenha(item),
      })),
    [usuarios]
  );

  const value = useMemo(
    () => ({
      pronto,
      sessao,
      funcionarios,
      materiais,
      relatorios,
      precoConstrucao,
      resumoFinanceiro,
      login: async (email, senha) => {
        const resultado = await autenticar(email, senha);
        if (resultado.ok) {
          setSessao(resultado.sessao);
          setUsuarios(await carregarUsuarios());
        }
        return resultado;
      },
      cadastrarFuncionario: async (dados) => {
        const resultado = await registrarFuncionario(dados);
        if (resultado.ok) setUsuarios(await carregarUsuarios());
        return resultado;
      },
      reemitirSenha: async (id) => {
        const resultado = await reemitirSenhaTemporaria(id);
        if (resultado.ok) setUsuarios(await carregarUsuarios());
        return resultado;
      },
      removerFuncionario: async (id) => {
        setUsuarios(await removerUsuario(id));
      },
      trocarSenha: async (senhaAtual, novaSenha, confirmarSenha) => {
        if (!sessao) return { ok: false, erro: 'Sessão inválida.' };
        const resultado = await atualizarSenha(sessao.id, senhaAtual, novaSenha, confirmarSenha);
        if (resultado.ok) {
          setSessao(resultado.sessao);
          setUsuarios(await carregarUsuarios());
        }
        return resultado;
      },
      cadastrarMaterial: async (dados) => {
        const resultado = registrarMaterial(dados, materiais);
        if (!resultado.ok) return resultado;
        setMateriais(resultado.materiais);
        await storageService.gravarMateriais(resultado.materiais);
        return resultado;
      },
      definirPrecoConstrucao: async (valor) => {
        const resultado = validarPrecoConstrucao(valor);
        if (!resultado.ok) return resultado;
        setPrecoConstrucao(resultado.preco);
        await storageService.gravarPrecoConstrucao(resultado.preco);
        return resultado;
      },
      gerarRelatorio: async () => {
        const resultado = criarRelatorioFinanceiro(materiais, precoConstrucao);
        if (!resultado.ok) return resultado;
        const atualizados = [resultado.relatorio, ...relatorios];
        setRelatorios(atualizados);
        await storageService.gravarRelatorios(atualizados);
        return resultado;
      },
      removerMaterial: async (id) => {
        const atualizados = materiais.filter((item) => item.id !== id);
        setMateriais(atualizados);
        await storageService.gravarMateriais(atualizados);
      },
      removerRelatorio: async (id) => {
        const atualizados = relatorios.filter((item) => item.id !== id);
        setRelatorios(atualizados);
        await storageService.gravarRelatorios(atualizados);
      },
    }),
    [pronto, sessao, funcionarios, materiais, relatorios, precoConstrucao, resumoFinanceiro]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp deve ser usado dentro de AppProvider');
  return ctx;
}
