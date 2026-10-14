import { gerarId } from './cryptoService';

export function parseNumero(valor) {
  if (valor === '' || valor == null) return NaN;
  const n = Number(String(valor).trim().replace(/\s/g, '').replace(',', '.'));
  return Number.isFinite(n) ? n : NaN;
}

export function formatarMoeda(valor) {
  return Number(valor || 0).toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });
}

export function formatarPercentual(valor) {
  if (valor == null || Number.isNaN(valor)) return '—';
  return `${valor.toFixed(2).replace('.', ',')}%`;
}

export function cadastrarMaterial({ nome, quantidade, custo }, atuais = []) {
  const nomeLimpo = nome?.trim();
  const qtd = parseNumero(quantidade);
  const custoUnitario = parseNumero(custo);

  if (!nomeLimpo) return { ok: false, erro: 'Informe o nome da matéria-prima.' };
  if (!(qtd > 0)) return { ok: false, erro: 'Informe uma quantidade válida.' };
  if (Number.isNaN(custoUnitario) || custoUnitario < 0) {
    return { ok: false, erro: 'Informe o custo unitário da matéria-prima.' };
  }

  const material = {
    id: gerarId(),
    nome: nomeLimpo,
    quantidade: qtd,
    custo: custoUnitario,
    custoTotal: qtd * custoUnitario,
  };

  return { ok: true, material, materiais: [...atuais, material] };
}

export function validarPrecoConstrucao(valor) {
  const preco = parseNumero(valor);
  if (!(preco > 0)) {
    return { ok: false, erro: 'Informe o preço cobrado da construção.' };
  }
  return { ok: true, preco };
}

export function calcularResumoFinanceiro(materiais = [], precoConstrucao) {
  const custoTotal = materiais.reduce(
    (acc, item) => acc + Number(item.quantidade) * Number(item.custo),
    0
  );
  const preco = parseNumero(precoConstrucao);
  const precoValido = Number.isFinite(preco) && preco > 0 ? preco : 0;
  const lucro = precoValido - custoTotal;
  const percentual = precoValido > 0 ? (lucro / precoValido) * 100 : null;

  return { custoTotal, preco: precoValido, lucro, percentual };
}

export function criarRelatorioFinanceiro(materiais, precoConstrucao) {
  const resumo = calcularResumoFinanceiro(materiais, precoConstrucao);
  if (!materiais.length) {
    return { ok: false, erro: 'Cadastre ao menos uma matéria-prima.' };
  }
  if (!resumo.preco) {
    return { ok: false, erro: 'Informe o preço cobrado da construção.' };
  }

  return {
    ok: true,
    relatorio: {
      id: gerarId(),
      titulo: 'Lucro da construção',
      data: new Date().toLocaleDateString('pt-BR'),
      ...resumo,
    },
  };
}
