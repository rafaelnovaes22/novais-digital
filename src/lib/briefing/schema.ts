import { z } from "zod";

// Validação de CNPJ
function validarCNPJ(cnpj: string): boolean {
  const clean = cnpj.replace(/\D/g, "");
  if (clean.length !== 14) return false;
  if (/^(\d)\1+$/.test(clean)) return false;

  const calcDigit = (s: string, weights: number[]) => {
    const sum = s.split("").reduce((acc, d, i) => acc + parseInt(d) * weights[i], 0);
    const rem = sum % 11;
    return rem < 2 ? 0 : 11 - rem;
  };

  const w1 = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
  const w2 = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
  const d1 = calcDigit(clean.slice(0, 12), w1);
  const d2 = calcDigit(clean.slice(0, 13), w2);

  return parseInt(clean[12]) === d1 && parseInt(clean[13]) === d2;
}

// Seção 1: Identidade da Empresa
export const step01Schema = z.object({
  razaoSocial: z.string().min(2, "Razão social obrigatória"),
  nomeFantasia: z.string().min(2, "Nome fantasia obrigatório"),
  cnpj: z
    .string()
    .optional()
    .refine((v) => !v || validarCNPJ(v), "CNPJ inválido"),
  segmento: z.string().min(1, "Selecione um segmento"),
  segmentoOutro: z.string().optional(),
  porte: z.string().min(1, "Selecione o porte da empresa"),
  site: z.string().url("URL inválida").optional().or(z.literal("")),
  descricaoEmpresa: z
    .string()
    .min(20, "Descreva a empresa com pelo menos 20 caracteres"),
  anoFundacao: z
    .string()
    .optional()
    .refine(
      (v) => !v || (/^\d{4}$/.test(v) && parseInt(v) >= 1900 && parseInt(v) <= new Date().getFullYear()),
      "Ano inválido"
    ),
  diferenciais: z.string().min(10, "Descreva os diferenciais"),
});

// Seção 2: Produtos e Serviços
export const step02Schema = z.object({
  principaisProdutos: z
    .string()
    .min(10, "Liste os principais produtos/serviços"),
  ticketMedioMin: z.string().optional(),
  ticketMedioMax: z.string().optional(),
  publicoAlvo: z.string().min(10, "Descreva o público-alvo"),
  doresPublico: z.string().min(10, "Descreva as principais dores do público"),
  restricoesProdutos: z.string().optional(),
});

// Seção 3: Canais de Venda
export const step03Schema = z.object({
  canaisAtivos: z
    .array(z.string())
    .min(1, "Selecione pelo menos um canal"),
  canalPrincipal: z.string().min(1, "Indique o canal principal"),
  volumeMensalAtendimentos: z.string().optional(),
  ferramentasAtuais: z.string().optional(),
  integracoesDesejadas: z.string().optional(),
});

// Seção 4: Filosofia de Atendimento
export const step04Schema = z.object({
  filosofiaAtendimento: z
    .string()
    .min(10, "Descreva a filosofia de atendimento"),
  valorEmpresa: z.string().min(5, "Informe o principal valor da empresa"),
  proibicoesAtendimento: z.string().optional(),
  exemploBomAtendimento: z.string().optional(),
  exemploMauAtendimento: z.string().optional(),
  horarioAtendimento: z.array(z.string()).optional(),
  horarioInicio: z.string().optional(),
  horarioFim: z.string().optional(),
});

// Seção 5: Tom de Voz
export const step05Schema = z.object({
  tomVoz: z.string().min(1, "Selecione o tom de voz"),
  adjetivosPersonalidade: z
    .string()
    .min(5, "Informe adjetivos da personalidade"),
  linguagemProibida: z.string().optional(),
  exemplosMensagens: z.string().optional(),
  usarEmojis: z.enum(["sim", "nao", "moderado"]).optional(),
  tratamentoCliente: z.enum(["voce", "senhor_senhora"]).optional(),
  nomeAssistente: z.string().optional(),
});

// Seção 6: Objetivo do Assistente
export const step06Schema = z.object({
  objetivosPrincipais: z
    .array(z.string())
    .min(1, "Selecione pelo menos um objetivo"),
  objetivoOutro: z.string().optional(),
  metaPrincipal: z.string().min(10, "Descreva a meta principal"),
  resultadoEsperado: z.string().min(10, "Descreva o resultado esperado"),
  abrangenciaAssistente: z
    .enum(["apenas_novo_canal", "substituir_atendimento", "complementar"])
    .optional(),
});

// Seção 7: Jornada do Cliente
export const step07Schema = z.object({
  etapasJornada: z.string().min(10, "Descreva as etapas da jornada"),
  pontosPrincipaisContato: z.string().optional(),
  duracaoMediaCicloVenda: z.string().optional(),
  momentoIdealAbordagem: z.string().optional(),
  acaoAposVenda: z.string().optional(),
});

// Seção 8: FAQ
export const step08Schema = z.object({
  perguntasFrequentes: z
    .array(
      z.object({
        pergunta: z.string(),
        resposta: z.string(),
      })
    )
    .optional(),
  topicosNaoResponder: z.string().optional(),
  respostaPadraoForaEscopo: z.string().optional(),
});

// Seção 9: Mídia e Conteúdo
export const step09Schema = z.object({
  tiposConteudoDisponiveis: z.array(z.string()).optional(),
  linksMateriais: z.string().optional(),
  frequenciaAtualizacaoConteudo: z.string().optional(),
  responsavelConteudo: z.string().optional(),
  possuiManualMarca: z.enum(["sim", "nao"]).optional(),
});

// Seção 10: Promoções
export const step10Schema = z.object({
  possuiPromocoes: z.enum(["sim", "nao", "ocasionalmente"]).optional(),
  tiposPromocoes: z.string().optional(),
  regrasComunicacaoPromocoes: z.string().optional(),
  canalDivulgacaoPromocoes: z.string().optional(),
  frequenciaPromocoes: z.string().optional(),
});

// Seção 11: Concorrência
export const step11Schema = z.object({
  principaisConcorrentes: z.string().optional(),
  diferencialCompetitivo: z
    .string()
    .min(10, "Descreva o diferencial competitivo"),
  pontosFracosVsCompetidor: z.string().optional(),
  posicionamentoPreco: z
    .enum(["premium", "intermediario", "economico"])
    .optional(),
});

// Seção 12: Filiais / Localização
export const step12Schema = z.object({
  possuiFiliais: z.enum(["sim", "nao"]).optional(),
  quantidadeFiliais: z.string().optional(),
  filiais: z
    .array(
      z.object({
        nome: z.string(),
        cidade: z.string(),
        estado: z.string(),
        telefone: z.string().optional(),
      })
    )
    .optional(),
  atendimentoNacional: z.enum(["sim", "nao"]).optional(),
  regioesPrioridade: z.string().optional(),
});

// Seção 13: Escalação
export const step13Schema = z.object({
  modalidadesEscalacao: z.array(z.string()).optional(),
  criteriosEscalacao: z
    .string()
    .min(5, "Descreva os critérios de escalação"),
  tempoMaximoResposta: z.string().optional(),
  responsavelEscalacao: z.string().optional(),
  contadoEscalacaoWhatsapp: z.string().optional(),
  sistemaTickets: z.string().optional(),
});

// Seção 14: Idiomas
export const step14Schema = z.object({
  idiomasPrincipais: z.array(z.string()).min(1, "Selecione ao menos um idioma"),
  idiomaSecundario: z.string().optional(),
  regiaoAtendimento: z.string().optional(),
  necessidadeTraducaoAutomatica: z.enum(["sim", "nao"]).optional(),
});

// Seção 15: Métricas
export const step15Schema = z.object({
  metricasSucesso: z.array(z.string()).optional(),
  kpisPrincipais: z.string().optional(),
  frequenciaRelatorios: z.string().optional(),
  ferramentaAnalise: z.string().optional(),
  baselineAtual: z.string().optional(),
});

// Seção 16: Catálogo e Dados
export const step16Schema = z.object({
  possuiCatalogo: z.enum(["sim", "nao", "parcial"]).optional(),
  formatoCatalogo: z.string().optional(),
  quantidadeProdutos: z.string().optional(),
  atualizacaoPrecos: z.string().optional(),
  sistemaERPCRM: z.string().optional(),
  dadosSensiveis: z.string().optional(),
});

// Seção 17: Compliance
export const step17Schema = z.object({
  requisitosCompliance: z.array(z.string()).optional(),
  politicaPrivacidade: z.enum(["sim", "nao"]).optional(),
  termosUso: z.enum(["sim", "nao"]).optional(),
  restricoesLegais: z.string().optional(),
  dadosNaoPermitidos: z.string().optional(),
});

// Seção 18: Expectativas e Timeline
export const step18Schema = z.object({
  prazoImplantacao: z.string().min(1, "Selecione o prazo"),
  dataDesejadaLancamento: z.string().optional(),
  orcamentoMensal: z.string().optional(),
  expectativaROI: z.string().optional(),
  riscosPercebidos: z.string().optional(),
  dependenciasExternas: z.string().optional(),
});

// Seção 19: Pós-Venda
export const step19Schema = z.object({
  politicaDevolucao: z.string().optional(),
  garantiaServico: z.string().optional(),
  programaFidelidade: z.enum(["sim", "nao"]).optional(),
  descricaoProgramaFidelidade: z.string().optional(),
  npsAtual: z.string().optional(),
  principaisReclamacoes: z.string().optional(),
  processoPosvenda: z.string().optional(),
  informacoesAdicionais: z.string().optional(),
});

// Schema completo
export const briefingSchema = z.object({
  ...step01Schema.shape,
  ...step02Schema.shape,
  ...step03Schema.shape,
  ...step04Schema.shape,
  ...step05Schema.shape,
  ...step06Schema.shape,
  ...step07Schema.shape,
  ...step08Schema.shape,
  ...step09Schema.shape,
  ...step10Schema.shape,
  ...step11Schema.shape,
  ...step12Schema.shape,
  ...step13Schema.shape,
  ...step14Schema.shape,
  ...step15Schema.shape,
  ...step16Schema.shape,
  ...step17Schema.shape,
  ...step18Schema.shape,
  ...step19Schema.shape,
});

export type BriefingSchema = typeof briefingSchema;
