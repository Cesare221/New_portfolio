export const PERSONAL = {
  name: 'Cesar Delmondes',
  firstName: 'Cesar',
  lastname: 'Delmondes',
heroPortrait: {
  src: '/images/hero-cesar.webp',
  width: 1600,
  height: 1200,
},
aboutPortrait: {
  src: '/images/sobre-cesar.webp',
  width: 1000,
  height: 1092,
},

  role: 'Full Stack • Automação • Integração • APIs',
  bio:
    'Construo aplicações web completas com React, Node.js e TypeScript, unindo engenharia sólida, interfaces claras e foco em resultados reais para o usuário.',
  email: 'cesard.dev@gmail.com',
  linkedin: 'https://linkedin.com/in/cdelmondes',
  github: 'https://github.com/Cesare221',
  whatsapp: 'https://wa.me/5562982623408',
};

export const TECH_STACK = [
  { name: 'JavaScript', icon: 'javascript', category: 'frontend' },
  { name: 'TypeScript', icon: 'typescript', category: 'frontend' },
  { name: 'HTML5', icon: 'html5', category: 'frontend' },
  { name: 'CSS3', icon: 'css3', category: 'frontend' },
  { name: 'React', icon: 'react', category: 'frontend' },
  { name: 'Next.js', icon: 'nextjs', category: 'frontend' },
  { name: 'Tailwind CSS', icon: 'tailwind', category: 'frontend' },
  { name: 'Node.js', icon: 'nodejs', category: 'backend' },
  { name: 'Python', icon: 'python', category: 'backend' },
  { name: 'PostgreSQL', icon: 'postgresql', category: 'data' },
  { name: 'Docker', icon: 'docker', category: 'data' },
  { name: 'Prisma', icon: 'prisma', category: 'data' },
  { name: 'MongoDB', icon: 'mongodb', category: 'data' },
  { name: 'Supabase', icon: 'supabase', category: 'data' },
  { name: 'Vercel', icon: 'vercel', category: 'deploy' },
  { name: 'Railway', icon: 'railway', category: 'deploy' },
  { name: 'Docker', icon: 'docker', category: 'deploy' },
  { name: 'Git', icon: 'git', category: 'tools' },
  { name: 'GitHub', icon: 'github', category: 'tools' },
  { name: 'Codex', icon: 'codex', category: 'tools' },
  { name: 'Claude Code', icon: 'claude', category: 'tools' },
  { name: 'Resend', icon: 'resend', category: 'integrations' },
  { name: 'Grok API', icon: 'grok', category: 'integrations' },
  { name: 'Sentry', icon: 'sentry', category: 'integrations' },
];

export const STACK_GROUPS = [
  { id: 'frontend', title: 'Interfaces' },
  { id: 'backend', title: 'Backend e automação' },
  { id: 'data', title: 'Dados e autenticação' },
  { id: 'deploy', title: 'Deploy e infraestrutura' },
  { id: 'integrations', title: 'Integrações e monitoramento' },
  { id: 'tools', title: 'Ferramentas de desenvolvimento' },
];

export const PROJECTS = [
  {
    id: 1,
    title: 'CliniDent — Gestão de clínicas',
    description:
      'Gestão para clínicas com agenda, confirmação de consultas e integração com WhatsApp.',
    problem:
      'Clínicas dependem de confirmações manuais, agenda fragmentada e comunicação dispersa, o que aumenta faltas e retrabalho operacional.',
    solution:
      'Desenvolvi uma aplicação com painel administrativo, agenda centralizada, confirmação por link e fluxo de atendimento conectado ao WhatsApp.',
    impact:
      'Centraliza a rotina da clínica, reduz etapas manuais e torna o acompanhamento de consultas mais claro para equipe e pacientes.',
    image: '/images/clinident-project.webp',
    imageFit: 'contain',
    tags: ['React', 'TypeScript', 'Node.js', 'MongoDB', 'WhatsApp'],
    liveUrl: 'https://clinica-odonto-ashy.vercel.app/', demoAvailable: false,
    githubUrl: 'https://github.com/Cesare221/Odonto-clinic',
  },

  {
    id: 2,
    title: 'DOCGEN — Automação jurídica',
    description:
      'Automação jurídica com OCR para extrair dados de documentos e gerar petições em DOCX e PDF.',
    problem:
      'Equipes jurídicas perdem tempo ao ler documentos manualmente, copiar dados para modelos e revisar campos sensíveis em fluxos repetitivos de peticionamento.',
    solution:
      'Desenvolvi um pipeline com OCR, extração de campos, validação de CPF/contato/endereço/pedido, integração com Google Drive (ou qualquer driver de armazenamento) e preenchimento automático de templates para gerar DOCX e PDFs finais.',
    impact:
      'O sistema reduz retrabalho operacional, melhora a padronização dos documentos e deixa a equipe focada na revisão jurídica em vez da digitação e montagem manual.',
    image: '/images/docgen-project.webp',
    tags: ['Python', 'OCR', 'Google Drive', 'DOCX/PDF', 'Automação Jurídica'],
    liveUrl: 'https://advocacia-pipeline-main.fly.dev/',
    githubUrl: 'https://github.com/Cesare221/DOCGEN_PROJECT',
  },

  {
    id: 3,
    title: 'Leitor Seguro OCR',
    description:
      'Sistema web para leitura de listas de presença em PDF ou imagem, com extração estruturada para XLSX e identificação de presença, rúbricas e manuscritos.',
    problem:
      'Conferir listas de presença manualmente toma tempo, dificulta auditoria e gera retrabalho quando há campos manuscritos ou arquivos em volume.',
    solution:
      'Desenvolvi um pipeline híbrido com Gemini como leitura principal e Document AI como fallback por página, convertendo PDFs e imagens em planilhas organizadas com status de presença e texto manuscrito tratado.',
    impact:
      'O sistema reduz o trabalho operacional de digitalização, melhora a rastreabilidade da execução e entrega saída pronta para conferência e uso em Excel.',
    image: '/images/leitor-ocr-card.png',
    tags: ['Python', 'OCR', 'Gemini', 'Document AI', 'XLSX'],
    liveUrl: 'https://leitor-ocr.fly.dev/',
    githubUrl: 'https://github.com/Cesare221/Leitor_OCR',
  },

  {
    id: 4,
    title: 'Bolão - Gestão de Palpites',
    description:
      'Plataforma web para centralizar palpites, jogos, placares e ranking em tempo real para uma equipe interna.',
    problem:
      'O controle manual de palpites e rankings dificulta transparência, atualização rápida e engajamento dos participantes.',
    solution:
      'Implementei uma interface responsiva com dashboard, controle de jogos, atualização de placares e ranking calculado automaticamente.',
    impact:
      'Torna a experiência mais organizada e confiável, com acompanhamento visual dos resultados e menos trabalho manual de administração.',
    image: '/images/bolao-project.webp',
    imageFit: 'cover',
    tags: ['React', 'Realtime', 'Ranking'],
    liveUrl: 'https://bolaohemo.vercel.app/',
    githubUrl: 'https://github.com/Cesare221/bolao-hemo',
  },

  {
    id: 5,
    title: 'MemoryDepo - Segundo cérebro',
    description:
      'Aplicação web para capturar notas, ideias, links e trechos em um espaço pessoal com busca instantânea e organização por tipo.',
    problem:
      'Ideias, referências e pequenos trechos úteis se perdem quando ficam espalhados entre abas, conversas, arquivos e anotações soltas.',
    solution:
      'Criei um app React com captura rápida, filtros por categoria, busca instântanea, itens fixados, edição, cópia, exportação e importação em JSON.',
    impact:
      'Ajuda o usuário a transformar informações dispersas em um repositório pessoal consultável, leve e acessível direto pelo navegador.',
    image: '/images/memorydepo-project.webp',
    imageFit: 'cover',
    tags: ['React', 'Vite', 'LocalStorage', 'UX'],
    liveUrl: 'https://memorycard-gold.vercel.app/',
    githubUrl: 'https://github.com/Cesare221/MemoryCard',
  },

  {
    id: 6,
    title: 'Life Dashboard - Painel pessoal',
    description:
      'Painel pessoal para acompanhar hábitos, sono, água, passos, despesas e memória diária em uma interface leve e responsiva.',
    problem:
      'Rotinas pessoais costumam ficar divididas entre aplicativos, planilhas e anotações, dificultando uma visão clara do dia e do progresso.',
    solution:
      'Desenvolvi um dashboard React com perfil, progresso do ano/mês/dia, hábitos, métricas de saúde, despesas e histórico salvo no navegador.',
    impact:
      'Entrega uma visão prática da rotina em um só lugar, ajudando o usuário a acompanhar consistência, gastos e indicadores pessoais sem login.',
    image: '/images/lifedashboard-project.webp',
    imageFit: 'cover',
    tags: ['React', 'Vite', 'Docker', 'Fly.io', 'LocalStorage'],
    liveUrl: 'https://meu-painel-pessoal.fly.dev/',
    githubUrl: 'https://github.com/Cesare221/Life_control_dashboard',
  },

  {
    id: 7,
    title: 'Roleta de Decisão',
    description:
      'Aplicativo web para cadastrar opções, girar a roleta e deixar a sorte escolher com visual refinado e navegação leve.',
    problem:
      'Escolhas rápidas e sorteios do dia a dia normalmente dependem de listas improvisadas ou interfaces genéricas, com pouca clareza visual e pouco engajamento.',
    solution:
      'Criei uma experiência com roleta central animada, cadastro de opções, presets, histórico de sorteios e configurações para tornar o uso simples e envolvente.',
    impact:
      'O projeto transforma uma decisão casual em uma experiência memorável, combinando usabilidade, apelo visual e feedback imediato durante a interação.',
    image: '/images/roulette-project.webp',
    imageFit: 'cover',
    tags: ['React', 'Vite', 'Interactive UI', 'Animation'],
    liveUrl: 'https://roulette-beta-eight.vercel.app/',
    githubUrl: '',
  },
];

export const NAV_LINKS = [
  { name: 'Inicio', href: '#inicio' },
  { name: 'Sobre', href: '#sobre' },
  { name: 'Stack', href: '#stack' },
  { name: 'Projetos', href: '#projetos' },
  { name: 'Contato', href: '#contato' },
];
