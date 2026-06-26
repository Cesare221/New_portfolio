# Graph Report - meu-portfolio  (2026-05-23)

## Corpus Check
- 14 files · ~7,075 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 104 nodes · 93 edges · 16 communities (15 shown, 1 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- [[_COMMUNITY_Community 0|Community 0]]
- [[_COMMUNITY_Community 1|Community 1]]
- [[_COMMUNITY_Community 2|Community 2]]
- [[_COMMUNITY_Community 3|Community 3]]
- [[_COMMUNITY_Community 4|Community 4]]
- [[_COMMUNITY_Community 5|Community 5]]
- [[_COMMUNITY_Community 6|Community 6]]
- [[_COMMUNITY_Community 7|Community 7]]
- [[_COMMUNITY_Community 9|Community 9]]
- [[_COMMUNITY_Community 10|Community 10]]

## God Nodes (most connected - your core abstractions)
1. `AGENTS.md - Portfólio Portfolio` - 10 edges
2. `Portfólio - Cesar Delmondes` - 8 edges
3. `scripts` - 5 edges
4. `Componentes` - 5 edges
5. `Visão Geral` - 4 edges
6. `Animações` - 4 edges
7. `Responsividade` - 3 edges
8. `Boas Práticas` - 3 edges
9. `React + Vite` - 3 edges
10. `Section()` - 2 edges

## Surprising Connections (you probably didn't know these)
- None detected - all connections are within the same source files.

## Communities (16 total, 1 thin omitted)

### Community 0 - "Community 0"
Cohesion: 0.13
Nodes (14): Ajustes Mobile, Boas Práticas, Breakpoints, code:bash (npm run dev      # Dev server), Comandos, Cores Principais, Efeitos Especiais, Fazer (+6 more)

### Community 1 - "Community 1"
Cohesion: 0.15
Nodes (12): AGENTS.md - Portfólio Portfolio, code:bash (npm run dev       # Dev server (Vite)), code:bash (npm run lint && npm run build), Comandos, Design System, Estrutura, graphify, Padrões de Código (+4 more)

### Community 2 - "Community 2"
Cohesion: 0.15
Nodes (13): devDependencies, autoprefixer, eslint, @eslint/js, eslint-plugin-react-hooks, eslint-plugin-react-refresh, globals, postcss (+5 more)

### Community 3 - "Community 3"
Cohesion: 0.20
Nodes (9): name, private, scripts, build, dev, lint, preview, type (+1 more)

### Community 4 - "Community 4"
Cohesion: 0.25
Nodes (8): dependencies, gsap, @gsap/react, lenis, lucide-react, react, react-dom, react-icons

### Community 5 - "Community 5"
Cohesion: 0.18
Nodes (5): Section(), PERSONAL_INFO, PROJECTS, SKILLS, SOCIAL_LINKS

### Community 6 - "Community 6"
Cohesion: 0.50
Nodes (4): Animações, Cursor Customizado, Hero Reveal, Scroll Reveal

### Community 7 - "Community 7"
Cohesion: 0.40
Nodes (5): Botões, Cards, Componentes, Navegação, Seções

### Community 9 - "Community 9"
Cohesion: 0.14
Nodes (13): code:bash (# Instalar dependências), code:block2 (meu-portfolio/), 🎨 Design System, 📁 Estrutura, Expanding the ESLint configuration, 🤖 IA Agents, 📦 Instalação, 📄 Licença (+5 more)

## Knowledge Gaps
- **67 isolated node(s):** `name`, `private`, `version`, `type`, `dev` (+62 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **1 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `devDependencies` connect `Community 2` to `Community 3`?**
  _High betweenness centrality (0.054) - this node is a cross-community bridge._
- **Why does `dependencies` connect `Community 4` to `Community 3`?**
  _High betweenness centrality (0.035) - this node is a cross-community bridge._
- **What connects `name`, `private`, `version` to the rest of the system?**
  _67 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Community 0` be split into smaller, more focused modules?**
  _Cohesion score 0.13333333333333333 - nodes in this community are weakly interconnected._
- **Should `Community 9` be split into smaller, more focused modules?**
  _Cohesion score 0.14285714285714285 - nodes in this community are weakly interconnected._