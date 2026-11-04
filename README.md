# DevLinks

Página de links pessoais construída com React, TypeScript, Vite e Tailwind CSS. O projeto apresenta um perfil, links principais, avatar com variação por tema e alternância entre light e dark mode.

## Stack

- React 19 para composição da interface.
- TypeScript para tipagem dos componentes, props e dados.
- Vite para desenvolvimento local, HMR e build de produção.
- Tailwind CSS 4 para classes utilitárias e layout responsivo.
- `react-icons` para os ícones do toggle.
- Oxlint para análise estática e linting.

## Conceitos aplicados

### Componentização

A interface é dividida em componentes reutilizáveis:

- `Button`: renderiza links ou botões de ação com estilos compartilhados.
- `ToggleButton`: componente controlado para alternar o tema.
- `Avatar`: exibe o avatar e oferece um fallback textual quando a imagem falha.
- `Text`: centraliza variantes tipográficas.
- `LinkList`: renderiza os links principais a partir de dados.

### Tema claro e escuro

O hook `useTheme` concentra a regra de tema:

1. Lê o tema salvo em `localStorage`.
2. Usa `prefers-color-scheme` como fallback inicial.
3. Atualiza `data-theme` no elemento `html`.
4. Persiste a escolha do usuário em `localStorage`.

Os tokens visuais ficam em `src/index.css` usando variáveis CSS, como `--page-background`, `--text`, `--surface` e `--stroke`. O `ToggleButton` recebe o tema atual via prop e mantém sua posição sincronizada com o estado.

### Renderização orientada por dados

Os links da página são definidos em `src/data/links.ts` e possuem o contrato `LinkItem`:

```ts
type LinkItem = {
  id: string;
  label: string;
  href: string;
};
```

O componente `LinkList` percorre essa coleção e cria um botão para cada item, evitando duplicação de markup.

### Responsividade e assets

O `App` seleciona imagens diferentes para light/dark mode e para mobile/desktop. O elemento `<picture>` permite trocar o background a partir do breakpoint de 768px, enquanto as classes utilitárias controlam o dimensionamento e o posicionamento.

### Acessibilidade

O toggle usa `role="switch"`, `aria-checked` e um `aria-label` contextual. Links externos abertos em nova aba recebem `rel="noopener noreferrer"`.

## Estrutura principal

```text
src/
├── App.tsx
├── main.tsx
├── index.css
├── assets/                # backgrounds e avatares
├── data/links.ts          # catálogo de links
├── hooks/useTheme.ts      # estado e persistência do tema
└── components/
    ├── features/          # blocos funcionais da página
    └── ui/                # componentes reutilizáveis
```

## Como executar

Requisitos: Node.js e npm.

```bash
npm install
npm run dev
```

O Vite disponibiliza a aplicação no endereço informado no terminal, normalmente `http://localhost:5173`.

## Scripts

```bash
npm run dev      # inicia o servidor de desenvolvimento
npm run build    # verifica o TypeScript e gera o build de produção
npm run lint     # executa o Oxlint
npm run preview  # serve localmente o build gerado
```

## Estado atual

O fluxo principal implementado é o da página de links, com avatar, backgrounds por tema, toggle light/dark e links configurados em `src/data/links.ts`. Os componentes `Profile`, `SocialLinks` e `Picture` existem no repositório, mas ainda não fazem parte do fluxo renderizado pelo `App` atual.

## Licença

Este projeto é privado e não possui uma licença de distribuição definida.
