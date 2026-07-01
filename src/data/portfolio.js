export const PERSONAL = {
  name: 'Cesar Delmondes',
  firstName: 'Cesar',
  role: 'Desenvolvedor Full-stack',
  bio:
    'Construo aplicações web completas com React, Node.js e TypeScript, unindo engenharia sólida, interfaces claras e foco em resultados reais para o usuário.',
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
    title: 'Clinident - Gestão de Clínica',
    description:
      'Sistema full-stack para clínicas odontológicas com dashboard, agenda, confirmação por link, remarcação e fluxo de WhatsApp.',
    problem:
      'Clínicas dependem de confirmações manuais, agenda fragmentada e comunicação dispersa, o que aumenta faltas e retrabalho operacional.',
    solution:
      'Desenvolvi uma aplicação com painel administrativo, agenda centralizada, confirmação por link e fluxo de atendimento conectado ao WhatsApp.',
    impact:
      'Centraliza a rotina da clínica, reduz etapas manuais e torna o acompanhamento de consultas mais claro para equipe e pacientes.',
    image: '/images/clinident-project.webp',
    imageFit: 'contain',
    tags: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'WhatsApp'],
    liveUrl: 'https://clinica-odonto-ashy.vercel.app/',
    githubUrl: 'https://github.com/Cesare221/Odonto-clinic',
  },
  {
    id: 2,
    title: 'Docgen - Leitor OCR',
    description:
      'Ferramenta para extração de dados via OCR e geração automatizada de documentos para acelerar fluxos jurídicos.',
    problem:
      'Processos jurídicos com leitura manual de documentos consomem tempo, geram retrabalho e aumentam o risco de erro humano.',
    solution:
      'Criei um fluxo de OCR que extrai informações relevantes, organiza dados e apoia a geração automática de petições/documentos.',
    impact:
      'Ajuda a transformar documentos brutos em informações utilizáveis mais rápido, liberando tempo para análise e revisão especializada.',
    image: '/images/docgen-project.webp',
    tags: ['Python', 'OCR', 'Web API'],
    liveUrl: 'https://leitor-ocr.fly.dev/',
    githubUrl: 'https://github.com/Cesare221/DOCGEN_PROJECT/tree/main',
  },
  {
    id: 3,
    title: 'Bolão da UCT - Gestão de Palpites',
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
];

export const NAV_LINKS = [
  { name: 'Início', href: '#inicio' },
  { name: 'Sobre', href: '#sobre' },
  { name: 'Stack', href: '#stack' },
  { name: 'Projetos', href: '#projetos' },
  { name: 'Contato', href: '#contato' },
];
