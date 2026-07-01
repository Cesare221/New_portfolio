export const PERSONAL = {
  name: 'Cesar Delmondes',
  firstName: 'Cesar',
  role: 'Desenvolvedor Full-stack',
  bio:
    'Construo aplicacoes web completas com React, Node.js e TypeScript, unindo engenharia solida, interfaces claras e foco em resultados reais para o usuario.',
  email: 'cesard.dev@gmail.com',
  linkedin: 'https://linkedin.com/in/cdelmondes',
  github: 'https://github.com/Cesare221',
  whatsapp: 'https://wa.me/5562982623408',
};

export const TECH_STACK = [
  { name: 'JavaScript', icon: 'javascript' },
  { name: 'TypeScript', icon: 'typescript' },
  { name: 'React', icon: 'react' },
  { name: 'Next.js', icon: 'nextjs' },
  { name: 'Node.js', icon: 'nodejs' },
  { name: 'Tailwind CSS', icon: 'tailwind' },
  { name: 'Python', icon: 'python' },
  { name: 'PostgreSQL', icon: 'postgresql' },
  { name: 'Prisma', icon: 'prisma' },
  { name: 'Docker', icon: 'docker' },
  { name: 'HTML5', icon: 'html5' },
  { name: 'CSS3', icon: 'css3' },
  { name: 'Git', icon: 'git' },
];

export const PROJECTS = [
  {
    id: 1,
    title: 'Clinident - Gestao de Clinica',
    description:
      'Sistema full-stack para clinicas odontologicas com dashboard, agenda, confirmacao por link, remarcacao e fluxo de WhatsApp.',
    problem:
      'Clinicas dependem de confirmacoes manuais, agenda fragmentada e comunicacao dispersa, o que aumenta faltas e retrabalho operacional.',
    solution:
      'Desenvolvi uma aplicacao com painel administrativo, agenda centralizada, confirmacao por link e fluxo de atendimento conectado ao WhatsApp.',
    impact:
      'Centraliza a rotina da clinica, reduz etapas manuais e torna o acompanhamento de consultas mais claro para equipe e pacientes.',
    image: '/images/clinident-project.webp',
    imageFit: 'contain',
    tags: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'WhatsApp'],
    liveUrl: 'https://clinica-odonto-ashy.vercel.app/',
    githubUrl: 'https://github.com/Cesare221/Odonto-clinic',
  },
  {
    id: 2,
    title: 'Docgen - Automacao Juridica',
    description:
      'Pipeline juridico para ler PDFs escaneados, extrair dados do cliente e gerar peticoes em DOCX/PDF a partir do modelo usado pela operacao.',
    problem:
      'Equipes juridicas perdem tempo ao ler documentos manualmente, copiar dados para modelos e revisar campos sensiveis em fluxos repetitivos de peticionamento.',
    solution:
      'Desenvolvi um pipeline com OCR, extracao de campos, validacao de CPF/contato/endereco/pedido, integracao com Google Drive e preenchimento automatico de templates para gerar DOCX e PDF finais.',
    impact:
      'O sistema reduz retrabalho operacional, melhora a padronizacao dos documentos e deixa a equipe focada na revisao juridica em vez da digitacao e montagem manual.',
    image: '/images/docgen-project.webp',
    tags: ['Python', 'OCR', 'Google Drive', 'DOCX/PDF', 'Automacao Juridica'],
    liveUrl: 'https://advocacia-pipeline-main.fly.dev/',
    githubUrl: '',
  },
  {
    id: 3,
    title: 'Leitor Seguro OCR',
    description:
      'Sistema web para leitura de listas de presenca em PDF ou imagem, com extracao estruturada para XLSX e identificacao de presenca, rubricas e manuscritos.',
    problem:
      'Conferir listas de presenca manualmente toma tempo, dificulta auditoria e gera retrabalho quando ha campos manuscritos ou arquivos em volume.',
    solution:
      'Desenvolvi um pipeline hibrido com Gemini como leitura principal e Document AI como fallback por pagina, convertendo PDFs e imagens em planilhas organizadas com status de presenca e texto manuscrito tratado.',
    impact:
      'O sistema reduz o trabalho operacional de digitalizacao, melhora a rastreabilidade da execucao e entrega saida pronta para conferencia e uso em Excel.',
    image: '/images/leitor-ocr-card.png',
    tags: ['Python', 'OCR', 'Gemini', 'Document AI', 'XLSX'],
    liveUrl: 'https://leitor-ocr.fly.dev/',
    githubUrl: 'https://github.com/Cesare221/Leitor_OCR',
  },
  {
    id: 4,
    title: 'Bolao da UCT - Gestao de Palpites',
    description:
      'Plataforma web para centralizar palpites, jogos, placares e ranking em tempo real para uma equipe interna.',
    problem:
      'O controle manual de palpites e rankings dificulta transparencia, atualizacao rapida e engajamento dos participantes.',
    solution:
      'Implementei uma interface responsiva com dashboard, controle de jogos, atualizacao de placares e ranking calculado automaticamente.',
    impact:
      'Torna a experiencia mais organizada e confiavel, com acompanhamento visual dos resultados e menos trabalho manual de administracao.',
    image: '/images/bolao-project.webp',
    imageFit: 'cover',
    tags: ['React', 'Realtime', 'Ranking'],
    liveUrl: 'https://bolaohemo.vercel.app/',
    githubUrl: 'https://github.com/Cesare221/bolao-hemo',
  },
  {
    id: 5,
    title: 'MemoryDepo - Segundo Cerebro Pessoal',
    description:
      'Aplicacao web para capturar notas, ideias, links e trechos em um espaco pessoal com busca instantanea e organizacao por tipo.',
    problem:
      'Ideias, referencias e pequenos trechos uteis se perdem quando ficam espalhados entre abas, conversas, arquivos e anotacoes soltas.',
    solution:
      'Criei um app React com captura rapida, filtros por categoria, busca instantanea, itens fixados, edicao, copia, exportacao e importacao em JSON.',
    impact:
      'Ajuda o usuario a transformar informacoes dispersas em um repositorio pessoal consultavel, leve e acessivel direto pelo navegador.',
    image: '/images/memorydepo-project.webp',
    imageFit: 'cover',
    tags: ['React', 'Vite', 'LocalStorage', 'UX'],
    liveUrl: 'https://memorycard-gold.vercel.app/',
    githubUrl: 'https://github.com/Cesare221/MemoryCard',
  },
  {
    id: 6,
    title: 'Life Dashboard - Meu Painel Pessoal',
    description:
      'Painel pessoal para acompanhar habitos, sono, agua, passos, despesas e memoria diaria em uma interface leve e responsiva.',
    problem:
      'Rotinas pessoais costumam ficar divididas entre aplicativos, planilhas e anotacoes, dificultando uma visao clara do dia e do progresso.',
    solution:
      'Desenvolvi um dashboard React com perfil, progresso do ano/mes/dia, habitos, metricas de saude, despesas e historico salvo no navegador.',
    impact:
      'Entrega uma visao pratica da rotina em um so lugar, ajudando o usuario a acompanhar consistencia, gastos e indicadores pessoais sem login.',
    image: '/images/lifedashboard-project.webp',
    imageFit: 'cover',
    tags: ['React', 'Vite', 'Docker', 'Fly.io', 'LocalStorage'],
    liveUrl: 'https://meu-painel-pessoal.fly.dev/',
    githubUrl: 'https://github.com/Cesare221/Life_control_dashboard',
  },
  {
    id: 7,
    title: 'Roleta de Decisao',
    description:
      'Aplicativo web para cadastrar opcoes, girar a roleta e deixar a sorte escolher com visual refinado e navegacao leve.',
    problem:
      'Escolhas rapidas e sorteios do dia a dia normalmente dependem de listas improvisadas ou interfaces genericas, com pouca clareza visual e pouco engajamento.',
    solution:
      'Criei uma experiencia com roleta central animada, cadastro de opcoes, presets, historico de sorteios e configuracoes para tornar o uso simples e envolvente.',
    impact:
      'O projeto transforma uma decisao casual em uma experiencia memoravel, combinando usabilidade, apelo visual e feedback imediato durante a interacao.',
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
