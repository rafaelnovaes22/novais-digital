// Opções para selects, radios e checkboxes do formulário de briefing

export const SEGMENTOS = [
  "E-commerce",
  "Varejo físico",
  "Serviços B2B",
  "Serviços B2C",
  "Saúde e bem-estar",
  "Educação",
  "Imobiliário",
  "Financeiro / Seguros",
  "Alimentação / Restaurante",
  "Tecnologia / SaaS",
  "Indústria",
  "Logística / Transporte",
  "Turismo / Hotelaria",
  "Jurídico",
  "Outro",
];

export const PORTES = [
  "MEI / Microempresa (até 9 funcionários)",
  "Pequena empresa (10–49 funcionários)",
  "Média empresa (50–249 funcionários)",
  "Grande empresa (250+ funcionários)",
];

export const CANAIS_VENDA = [
  "WhatsApp",
  "Instagram DM",
  "Facebook Messenger",
  "Telegram",
  "Site / chat online",
  "Telefone / ligação",
  "E-mail",
  "Loja física",
  "Marketplace (Mercado Livre, Amazon etc.)",
  "Outro",
];

export const OBJETIVOS_ASSISTENTE = [
  "Atendimento ao cliente (dúvidas e suporte)",
  "Vendas / conversão de leads",
  "Agendamento de serviços / consultas",
  "Pós-venda e fidelização",
  "Qualificação de leads",
  "Suporte técnico",
  "Triagem e escalação para humanos",
  "Geração de orçamentos",
  "FAQ automatizado",
  "Outro",
];

export const TONS_VOZ = [
  "Formal e profissional",
  "Amigável e descontraído",
  "Técnico e especialista",
  "Empático e acolhedor",
  "Direto e objetivo",
  "Inspirador e motivacional",
  "Jovem e moderno",
];

export const IDIOMAS = [
  "Português (Brasil)",
  "Inglês",
  "Espanhol",
  "Francês",
  "Alemão",
  "Italiano",
  "Mandarim",
  "Outro",
];

export const HORARIOS_ATENDIMENTO = [
  "Segunda a Sexta",
  "Segunda a Sábado",
  "Segunda a Domingo",
  "Fins de semana",
  "24 horas / 7 dias",
];

export const FREQUENCIAS_UPDATE = [
  "Diariamente",
  "Semanalmente",
  "Quinzenalmente",
  "Mensalmente",
  "Quando necessário",
];

export const TIPOS_CONTEUDO = [
  "Fotos de produtos",
  "Vídeos demonstrativos",
  "Catálogo PDF",
  "Tabela de preços",
  "Manual / documentação",
  "Depoimentos / cases",
  "Blog / artigos",
  "FAQ existente",
  "Scripts de atendimento",
  "Outro",
];

export const METRICAS_SUCESSO = [
  "Taxa de resolução no primeiro contato",
  "Tempo médio de resposta",
  "Satisfação do cliente (CSAT)",
  "Taxa de conversão em vendas",
  "Redução de chamados para humanos",
  "Volume de atendimentos automatizados",
  "Agendamentos realizados",
  "Leads qualificados gerados",
  "NPS (Net Promoter Score)",
  "Outro",
];

export const COMPLIANCE_REQUISITOS = [
  "LGPD (Lei Geral de Proteção de Dados)",
  "Setor financeiro (BACEN)",
  "Setor de saúde (ANVISA / CFM)",
  "ISO 27001",
  "SOC 2",
  "PCI DSS (pagamentos)",
  "Não se aplica",
];

export const MODALIDADES_ESCALACAO = [
  "Transferência para atendente humano via WhatsApp",
  "Criação de ticket no sistema de suporte",
  "Agendamento de ligação",
  "Envio de e-mail para equipe",
  "Notificação no sistema interno",
];

export const FORMATOS_CATALOGO = [
  "Planilha Excel / CSV",
  "PDF",
  "Google Sheets",
  "JSON / API",
  "Sistema ERP / CRM (integração)",
  "Não tenho catálogo estruturado",
];

export const EXPECTATIVAS_PRAZO = [
  "Urgente (até 2 semanas)",
  "Curto prazo (1 mês)",
  "Médio prazo (2–3 meses)",
  "Longo prazo (3+ meses)",
  "Sem prazo definido",
];

export const STEP_GROUPS = [
  { label: "Empresa", steps: [1, 2], color: "accent" },
  { label: "Atendimento", steps: [3, 4], color: "accent" },
  { label: "Assistente", steps: [5, 6, 7], color: "accent" },
  { label: "Conteúdo", steps: [8, 9, 10], color: "accent" },
  { label: "Operação", steps: [11, 12, 13, 14], color: "accent" },
  { label: "Dados", steps: [15, 16, 17], color: "accent" },
  { label: "Fechamento", steps: [18, 19], color: "accent" },
] as const;

export const TOTAL_STEPS = 19;
