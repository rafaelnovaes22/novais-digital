# Arquitetura: Reunião de Alinhamento — Dados para Configuração do Assistente IA

Este documento mapeia todos os dados que precisam ser coletados na **reunião de validação** (30 min) após a IA ter feito o scraping e análise dos materiais do cliente.

---

## Fluxo Geral

```
1. Cliente preenche briefing online (3 passos — contato, objetivo, links)
2. IA faz scraping dos links e materiais enviados
3. IA gera relatório com: identidade da empresa, tom de voz, catálogo, FAQ inferido, público-alvo
4. Reunião de alinhamento: validar o que a IA montou + coletar restrições críticas
5. Configuração final do assistente
```

---

## Dados Inferidos pela IA (pré-reunião)

A IA deve extrair automaticamente dos links/materiais:

### Identidade da Empresa
- Razão social / nome fantasia
- Segmento de atuação
- Descrição da empresa
- Diferenciais competitivos
- Valores da marca
- Ano de fundação (se disponível)

### Produtos e Serviços
- Lista de produtos/serviços principais
- Faixa de preços / ticket médio
- Público-alvo identificado
- Categorias de catálogo

### Tom de Voz e Personalidade
- Tom predominante (formal, descontraído, técnico, etc.)
- Adjetivos de personalidade da marca
- Uso de emojis (análise das redes sociais)
- Tratamento (você vs. senhor/senhora)
- Exemplos de mensagens típicas extraídos das redes

### FAQ Inferido
- Perguntas frequentes extraídas de:
  - Seção FAQ do site
  - Comentários do Instagram
  - Avaliações Google Meu Negócio
  - Conteúdo recorrente nos posts

### Canais e Presença Digital
- Canais ativos identificados
- Horário de funcionamento (Google Meu Negócio)
- Volume estimado de interações

---

## Dados a Validar na Reunião

### Bloco 1: Validação do Relatório IA (~10 min)
O consultor apresenta o que a IA inferiu e o cliente confirma/corrige:

- [ ] Identidade da empresa está correta?
- [ ] Lista de produtos/serviços está completa?
- [ ] Tom de voz gerado representa a marca?
- [ ] FAQ inferido faz sentido? Falta algo?
- [ ] Público-alvo identificado está correto?

### Bloco 2: Restrições Críticas (~10 min)
Informações que **só o cliente pode fornecer** — a IA não consegue inferir:

- **Comportamentos proibidos do assistente** (o que NUNCA deve fazer/dizer)
- **Linguagem proibida** (termos, expressões, assuntos a evitar)
- **Limites de atuação** (o que o assistente NÃO deve tentar resolver sozinho)
- **Critérios de escalação para humano** (quando transferir para atendente)
- **Dados sensíveis** que não podem ser coletados/armazenados
- **Requisitos de compliance** (LGPD, regulações setoriais)
- **Proibições comerciais** (descontos não autorizados, promessas indevidas)

### Bloco 3: Fluxo e Operação (~10 min)

- **Objetivo refinado**: confirmar meta principal e KPIs desejados
- **Horário de atendimento**: quando o assistente deve estar ativo
- **Escalação**:
  - Para quem escalar? (WhatsApp, e-mail, ticket)
  - Contatos dos responsáveis
  - Tempo máximo de espera aceitável
- **Integrações desejadas**: CRM, ERP, agenda, pagamento
- **Idiomas**: além de pt-BR, precisa de outros?
- **Promoções**: como comunicar ofertas e condições especiais?
- **Filiais/localidades**: atendimento varia por região?
- **Pós-venda**: política de devolução, garantia, fidelidade
- **Prazo e expectativa**: quando quer ir ao ar? Orçamento mensal?

---

## Dados Estruturados para o Sistema

Após a reunião, o consultor preenche o mapeamento técnico:

```typescript
interface ConfiguracaoAssistente {
  // Identidade (validada da IA)
  empresa: {
    nome: string;
    segmento: string;
    descricao: string;
    diferenciais: string[];
    valores: string[];
  };

  // Produtos (validados da IA)
  catalogo: {
    produtos: Array<{ nome: string; descricao: string; preco?: string }>;
    ticketMedio: { min?: number; max?: number };
    publicoAlvo: string;
  };

  // Tom de voz (validado da IA)
  personalidade: {
    tom: string;
    adjetivos: string[];
    emojis: "sim" | "nao" | "moderado";
    tratamento: "voce" | "senhor_senhora";
    nomeAssistente?: string;
    exemplos: string[];
    linguagemProibida: string[];
  };

  // FAQ (validado + complementado na reunião)
  faq: Array<{ pergunta: string; resposta: string }>;

  // Restrições (coletadas na reunião)
  restricoes: {
    comportamentosProibidos: string[];
    limitesAtuacao: string[];
    dadosSensiveis: string[];
    compliance: string[];
  };

  // Operação (coletada na reunião)
  operacao: {
    horario: { dias: string; inicio: string; fim: string };
    escalacao: {
      criterios: string[];
      canais: string[];
      contatos: string[];
      tempoMaximo: string;
    };
    integracoes: string[];
    idiomas: string[];
  };

  // Métricas (definidas na reunião)
  metricas: {
    kpis: string[];
    frequenciaRelatorios: string;
    baselineAtual?: string;
  };

  // Timeline
  timeline: {
    prazo: string;
    dataLancamento?: string;
    orcamentoMensal?: string;
  };
}
```

---

## Checklist Pós-Reunião

- [ ] Relatório IA validado e corrigido
- [ ] Restrições críticas documentadas
- [ ] Fluxo de escalação definido
- [ ] Integrações mapeadas
- [ ] Timeline e orçamento alinhados
- [ ] Proposta comercial enviada
- [ ] Próximos passos comunicados ao cliente
