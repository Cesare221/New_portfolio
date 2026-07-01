# Graph Report - meu-portfolio  (2026-07-01)

## Corpus Check
- 21 files · ~127,923 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 169 nodes · 183 edges · 17 communities (16 shown, 1 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `90cfd5fe`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- [[_COMMUNITY_Community 0|Community 0]]
- [[_COMMUNITY_Community 1|Community 1]]
- [[_COMMUNITY_Community 2|Community 2]]
- [[_COMMUNITY_Community 3|Community 3]]
- [[_COMMUNITY_Community 4|Community 4]]
- [[_COMMUNITY_Community 5|Community 5]]
- [[_COMMUNITY_Community 6|Community 6]]
- [[_COMMUNITY_Community 7|Community 7]]
- [[_COMMUNITY_Community 8|Community 8]]
- [[_COMMUNITY_Community 9|Community 9]]
- [[_COMMUNITY_Community 10|Community 10]]

## God Nodes (most connected - your core abstractions)
1. `AGENTS.md - Portfólio Portfolio` - 10 edges
2. `Portfólio - Cesar Delmondes` - 8 edges
3. `scripts` - 6 edges
4. `Componentes` - 5 edges
5. `SimplexNoise` - 4 edges
6. `createParticles()` - 4 edges
7. `Visão Geral` - 4 edges
8. `Animações` - 4 edges
9. `Section()` - 3 edges
10. `mapRange()` - 3 edges

## Surprising Connections (you probably didn't know these)
- None detected - all connections are within the same source files.

## Communities (17 total, 1 thin omitted)

### Community 0 - "Community 0"
Cohesion: 0.08
Nodes (23): Ajustes Mobile, Animações, Boas Práticas, Botões, Breakpoints, Cards, code:bash (npm run dev      # Dev server), Comandos (+15 more)

### Community 1 - "Community 1"
Cohesion: 0.15
Nodes (12): AGENTS.md - Portfólio Portfolio, code:bash (npm run dev       # Dev server (Vite)), code:bash (npm run lint && npm run build), Comandos, Design System, Estrutura, graphify, Padrões de Código (+4 more)

### Community 2 - "Community 2"
Cohesion: 0.15
Nodes (13): devDependencies, autoprefixer, eslint, @eslint/js, eslint-plugin-react-hooks, eslint-plugin-react-refresh, globals, postcss (+5 more)

### Community 3 - "Community 3"
Cohesion: 0.18
Nodes (10): name, private, scripts, build, dev, lint, preview, test (+2 more)

### Community 4 - "Community 4"
Cohesion: 0.20
Nodes (10): dependencies, gsap, @gsap/react, lenis, lucide-react, motion, react, react-dom (+2 more)

### Community 5 - "Community 5"
Cohesion: 0.09
Nodes (19): NAV_LINKS, PERSONAL, PROJECTS, TECH_STACK, SITE_META, AntigravityBackground, App(), NAV_LINKS (+11 more)

### Community 6 - "Community 6"
Cohesion: 0.26
Nodes (6): Button(), Section(), SectionHeader(), SkillIcon(), GLOW_COLORS, SpotlightCard()

### Community 7 - "Community 7"
Cohesion: 0.15
Nodes (12): bodyLength, buttons, canvases, cssSupportsReducedMotion, focusables, headings, images, lang (+4 more)

### Community 8 - "Community 8"
Cohesion: 0.15
Nodes (12): AntigravityBackground(), clamp(), createParticles(), createPointsTexture(), mapRange(), PALETTES, poissonDiskSampling(), random() (+4 more)

### Community 9 - "Community 9"
Cohesion: 0.14
Nodes (13): code:bash (# Instalar dependências), code:block2 (meu-portfolio/), 🎨 Design System, 📁 Estrutura, Expanding the ESLint configuration, 🤖 IA Agents, 📦 Instalação, 📄 Licença (+5 more)

## Knowledge Gaps
- **90 isolated node(s):** `name`, `private`, `version`, `type`, `dev` (+85 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **1 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `devDependencies` connect `Community 2` to `Community 3`?**
  _High betweenness centrality (0.023) - this node is a cross-community bridge._
- **Why does `dependencies` connect `Community 4` to `Community 3`?**
  _High betweenness centrality (0.018) - this node is a cross-community bridge._
- **What connects `name`, `private`, `version` to the rest of the system?**
  _90 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Community 0` be split into smaller, more focused modules?**
  _Cohesion score 0.08333333333333333 - nodes in this community are weakly interconnected._
- **Should `Community 5` be split into smaller, more focused modules?**
  _Cohesion score 0.09113300492610837 - nodes in this community are weakly interconnected._
- **Should `Community 9` be split into smaller, more focused modules?**
  _Cohesion score 0.14285714285714285 - nodes in this community are weakly interconnected._