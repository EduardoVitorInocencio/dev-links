# SPEC.md — Especificação técnica do DevLinks

## 1. Visão geral

DevLinks é uma aplicação web de página única para apresentar um perfil pessoal e uma coleção de links externos. A interface foi implementada como uma SPA client-side, sem backend, roteamento ou camada de autenticação.

O fluxo atualmente entregue é composto por:

- avatar com fallback textual;
- nome/título e identificador do perfil;
- alternância entre temas claro e escuro;
- background responsivo e específico para cada tema;
- lista de links configurada por dados;
- rodapé informativo.

O objetivo arquitetural é manter o conteúdo separado da apresentação, concentrar a regra de tema em um hook e reutilizar primitivas visuais para reduzir duplicação de markup.

## 2. Escopo atual

### 2.1 Incluído

- Renderização de uma página de links pessoais.
- Layout responsivo para mobile e desktop.
- Temas `light` e `dark`.
- Persistência da preferência de tema em `localStorage`.
- Uso de `prefers-color-scheme` como fallback da primeira visita.
- Links externos abrirão em nova aba com `noopener noreferrer`.
- Fallback textual quando o avatar não pode ser carregado.
- Catálogo de links tipado em `src/data/links.ts`.

### 2.2 Fora do escopo atual

- API, banco de dados ou CMS.
- Login, cadastro ou gerenciamento de usuários.
- Painel administrativo para editar links.
- Roteamento entre páginas.
- Analytics, tracking ou métricas de cliques.
- Testes automatizados configurados no repositório.
- Internacionalização.

## 3. Stack e ferramentas

| Camada | Tecnologia | Uso no projeto |
| --- | --- | --- |
| Runtime de interface | React 19 | Composição da UI e gerenciamento de estado local |
| Tipagem | TypeScript | Props, contratos de dados e configuração |
| Build/dev server | Vite 8 | HMR, desenvolvimento local e build de produção |
| Estilos | Tailwind CSS 4 | Classes utilitárias e layout responsivo |
| Integração CSS | `@tailwindcss/vite` | Integração do Tailwind com o Vite |
| Ícones | `react-icons` | Ícones de tema e ícones disponíveis para redes sociais |
| Lint | Oxlint | Análise estática |
| Módulos | ESM | Configurado por `"type": "module"` |

As versões exatas e os scripts de execução são definidos em `package.json` e devem ser tratados como a fonte de verdade das dependências.

## 4. Arquitetura

### 4.1 Modelo de alto nível

```text
index.html
    |
    v
src/main.tsx
    |
    +--> StrictMode
           |
           v
        App.tsx
           |
           +--> useTheme() ------------------> localStorage
           |       |
           |       +--------------------------> html[data-theme]
           |
           +--> seleção de assets por tema
           |
           +--> Avatar
           +--> Text
           +--> ToggleButton
           +--> LinksList -----> data/links.ts -----> Button
           +--> Footer (Text)
```

### 4.2 Organização por camadas

```text
src/
├── main.tsx                 # bootstrap do React
├── App.tsx                  # composição da tela principal
├── index.css                # tokens CSS e importação do Tailwind
├── assets/                  # backgrounds e avatares empacotados pelo Vite
├── data/                    # conteúdo estático da aplicação
├── hooks/                   # regras de estado reutilizáveis
└── components/
    ├── features/            # blocos funcionais da página
    └── ui/                  # primitivas visuais reutilizáveis
```

As dependências devem seguir a direção abaixo:

```text
features -> ui
features -> data
App      -> features, ui, hooks, assets
hooks    -> APIs do navegador
ui       -> props e estilos
```

Não existe uma camada de serviços porque o produto atual não realiza chamadas de rede nem possui fonte de dados remota.

## 5. Bootstrap e composição da aplicação

### 5.1 `index.html`

Define o documento HTML base, o elemento `#root`, o favicon e o viewport. O título atual do documento é `devlinks`. O atributo `lang` ainda está como `en`, embora o conteúdo visível esteja em português; essa é uma pendência de acessibilidade/documentação do shell HTML.

### 5.2 `src/main.tsx`

Importa o CSS global, localiza `#root` e monta `App` dentro de `StrictMode`. O operador `!` pressupõe que o elemento exista no `index.html`.

### 5.3 `src/App.tsx`

É o componente orquestrador da tela. Suas responsabilidades são:

1. Consumir `useTheme`.
2. Derivar os backgrounds mobile/desktop e o avatar conforme o tema.
3. Renderizar o background em uma camada absoluta não interativa.
4. Manter o conteúdo visível em uma camada `relative z-10`.
5. Montar avatar, textos, toggle, lista de links e rodapé.

O layout limita o conteúdo a `588px` e usa `min-h-dvh`, centralização horizontal e espaçamentos utilitários do Tailwind.

## 6. Estado e fluxo de tema

### 6.1 Contrato

```ts
type Theme = "dark" | "light";
```

O hook `src/hooks/useTheme.ts` expõe:

```ts
{
  theme: Theme;
  toggleTheme: () => void;
}
```

### 6.2 Inicialização

Na primeira renderização, o hook:

1. lê `devlinks-theme` do `localStorage`;
2. aceita o valor apenas se ele for `dark` ou `light`;
3. caso não exista um valor válido, consulta `window.matchMedia("(prefers-color-scheme: dark)")`;
4. usa `dark` quando a preferência do sistema estiver ativa e `light` caso contrário.

### 6.3 Atualização

Quando o estado muda, um `useEffect`:

- define `document.documentElement.dataset.theme`;
- persiste o valor em `localStorage`.

O `ToggleButton` recebe o valor atual por prop e chama `toggleTheme` no clique. O controle é, portanto, controlado pelo estado de `App`; ele não mantém uma cópia independente do tema.

### 6.4 Limites do mecanismo

O código não trata exceções de acesso ao `localStorage` e não escuta mudanças posteriores em `prefers-color-scheme`. A preferência do sistema é usada somente como fallback durante a inicialização.

## 7. Tema visual e estilos

`src/index.css` importa Tailwind CSS e define tokens como variáveis no elemento `html`:

- `--page-background`;
- `--text`;
- `--surface`;
- `--surface-hover`;
- `--stroke`;
- `--highlight`;
- `--fallback-background`.

O tema é aplicado por seletores `:root[data-theme="light"]` e `:root[data-theme="dark"]`. Os componentes usam essas variáveis dentro de classes Tailwind, o que permite trocar a aparência global sem duplicar componentes.

Os backgrounds são renderizados por um `<picture>` no `App`:

- abaixo de `768px`, o `<img>` usa o background mobile;
- a partir de `768px`, o `<source>` usa o background desktop;
- a seleção light/dark é feita em JavaScript antes de passar os imports ao elemento.

O background ocupa a tela inteira com posicionamento absoluto. O conteúdo principal fica acima dele em uma camada relativa com `z-10`.

## 8. Componentes e contratos

### 8.1 Componentes efetivamente usados

#### `Avatar`

Arquivo: `src/components/ui/Avatar.tsx`

Props:

```ts
type AvatarProps = {
  src: string;
  alt: string;
  fallbackText?: string;
};
```

Renderiza uma imagem circular de `112x112`. Se o carregamento falhar, substitui a imagem por `fallbackText`, cujo valor padrão é `DL`. Quando `src` muda, o estado de falha é resetado para permitir uma nova tentativa.

#### `Text`

Arquivo: `src/components/ui/Text.tsx`

Centraliza tags (`p`, `span`, `h1`, `h2`) e variantes tipográficas (`body`, `small`, `title`). A classe adicional é recebida por `className`.

#### `Button`

Arquivo: `src/components/ui/Button.tsx`

Renderiza um `<a>` quando `href` é informado e um `<button>` caso contrário. Compartilha estilos visuais, aceita `onClick`, `disabled`, `target` e `className`, e adiciona `rel="noopener noreferrer"` para links com `target="_blank"`.

#### `ToggleButton`

Arquivo: `src/components/ui/ToogleButton.tsx`

O nome do arquivo é intencionalmente `ToogleButton.tsx` e deve ser preservado nas importações atuais. O componente usa `role="switch"`, `aria-checked` e um rótulo contextual. O ícone e a posição do controle são derivados de `value === "light"`.

#### `LinksList`

Arquivo: `src/components/features/LinksList.tsx`

Lê `links` de `src/data/links.ts`, percorre a coleção e renderiza cada entrada através de `Button`. A navegação recebe `aria-label="Links principais"` e todos os links atuais abrem em nova aba.

### 8.2 Componentes existentes, mas não conectados ao fluxo atual

- `src/components/features/Profile.tsx`: arquivo presente, sem implementação renderizada.
- `src/components/features/SocialLinks.tsx`: arquivo presente, sem implementação renderizada.
- `src/components/ui/Picture.jsx`: abstração de `<picture>` com tratamento de erro, mas não é utilizada por `App` no fluxo atual.
- `src/components/ui/Icon.tsx`: possui registro para GitHub, Instagram, Medium, YouTube, LinkedIn, sol e lua; atualmente o `App` usa apenas os ícones de sol/lua por meio do toggle.

Esses arquivos não devem ser descritos como funcionalidades disponíveis ao usuário enquanto não forem conectados à composição principal.

## 9. Modelo de dados

O conteúdo dos links é estático e tipado:

```ts
export type LinkItem = {
  id: string;
  label: string;
  href: string;
};
```

Regras do catálogo:

- `id` deve ser estável e único para servir como `key` do React;
- `label` é o texto exibido no botão;
- `href` é o destino externo;
- a ordem do array define a ordem visual dos links.

Os destinos atuais usam URLs de exemplo (`example.com`) e precisam ser substituídos pelos destinos reais antes de uma publicação.

## 10. Assets

Os assets são importados diretamente por módulos TypeScript em `src/App.tsx`, permitindo que o Vite resolva e empacote os caminhos:

```text
src/assets/
├── avatar-light.png
├── avatar-dark.png
├── bg-desktop-light.png
├── bg-desktop-dark.png
├── bg-mobile-light.png
└── bg-mobile-dark.jpg
```

A escolha do avatar e do background é derivada do mesmo estado `theme`, garantindo coerência visual entre a imagem de perfil e o restante da página.

## 11. Acessibilidade e comportamento semântico

Comportamentos implementados:

- `<main>` organiza o conteúdo principal;
- `<nav aria-label="Links principais">` identifica a navegação;
- o avatar possui `alt` e fallback com `role="img"`;
- o toggle possui semântica de switch e rótulo contextual;
- links externos recebem `rel="noopener noreferrer"`;
- o background decorativo usa `alt=""` e não deve competir com o conteúdo;
- o HTML inclui meta viewport para visualização responsiva.

Pendências conhecidas:

- ajustar `lang="en"` para `lang="pt-BR"` se o conteúdo continuar em português;
- validar contraste e foco visível em uma auditoria visual/acessível;
- avaliar um estado visual específico para links realmente desabilitados, pois `aria-disabled` em âncoras não equivale ao atributo `disabled` de um botão.

## 12. Requisitos funcionais implementados

| ID | Requisito | Implementação |
| --- | --- | --- |
| RF-01 | Exibir avatar e identificação do perfil | `App` + `Avatar` + `Text` |
| RF-02 | Alternar tema claro/escuro | `useTheme` + `ToggleButton` |
| RF-03 | Persistir tema escolhido | `localStorage` com a chave `devlinks-theme` |
| RF-04 | Respeitar preferência do sistema na primeira visita | `matchMedia` em `useTheme` |
| RF-05 | Exibir links configuráveis | `links.ts` + `LinksList` |
| RF-06 | Abrir links externos em nova aba | `Button` com `target="_blank"` |
| RF-07 | Adaptar background por viewport | `<picture>` e breakpoint de `768px` |
| RF-08 | Recuperar visualmente de falha do avatar | fallback de `Avatar` |

## 13. Requisitos não funcionais

- **Responsividade:** o conteúdo deve permanecer legível a partir de `320px` de largura e aproveitar a composição desktop a partir de `768px`.
- **Manutenibilidade:** novos links devem ser adicionados ao catálogo de dados, sem duplicar markup em `LinksList`.
- **Tipagem:** novos componentes TypeScript devem manter props explícitas e compatíveis com as regras de `tsconfig.app.json`.
- **Desempenho:** os assets locais são empacotados pelo Vite; não há chamadas de rede para buscar conteúdo durante a execução.
- **Segurança básica:** links abertos em nova aba usam `noopener noreferrer`.
- **Operação:** a aplicação pode ser executada como desenvolvimento local, build estático e preview do build.

## 14. Execução e validação

### Desenvolvimento

```bash
npm install
npm run dev
```

### Scripts disponíveis

```bash
npm run dev      # servidor de desenvolvimento com Vite
npm run build    # verificação TypeScript e build de produção
npm run lint     # análise estática com Oxlint
npm run preview  # preview local do build
```

### Verificação TypeScript em ambiente restrito

O build incremental pode falhar quando o ambiente não permite gravar `node_modules/.tmp/*.tsbuildinfo`. Nesse caso, a verificação equivalente sem cache incremental é:

```powershell
& .\node_modules\.bin\tsc.cmd -p tsconfig.app.json --noEmit --incremental false
```

Antes de integrar alterações, recomenda-se executar a checagem TypeScript, o lint e `git diff --check`.

## 15. Limitações atuais e próximos passos

As próximas evoluções abaixo são intencionais, mas não fazem parte da funcionalidade entregue neste estado:

1. Conectar `Profile` e `SocialLinks` à composição de `App`.
2. Substituir os dados de exemplo por links reais e conteúdo definitivo do perfil.
3. Corrigir o idioma do documento e revisar metadados de SEO/social sharing.
4. Adicionar testes de comportamento para tema, fallback do avatar e renderização da lista.
5. Decidir se `Picture` será a abstração oficial de imagens responsivas ou se o `<picture>` permanecerá no componente orquestrador.
6. Considerar uma fonte de dados externa somente se houver requisito de edição dinâmica; isso exigiria uma nova camada de serviço e tratamento de carregamento/erro.

Qualquer evolução deve preservar a separação entre dados, regras de estado, features e primitivas visuais, salvo decisão arquitetural registrada em uma nova revisão desta especificação.

## 16. Critérios de aceite da página atual

- A aplicação inicia com `npm run dev` e monta conteúdo em `#root`.
- O tema inicial respeita a preferência persistida ou, na ausência dela, a preferência do sistema.
- Alternar o toggle atualiza a aparência, o avatar/background e o valor persistido.
- Os quatro itens de `src/data/links.ts` aparecem na ordem definida e abrem em nova aba.
- O avatar exibe o fallback quando a imagem falha.
- A página mantém o background decorativo atrás do conteúdo principal.
- A checagem TypeScript e o lint podem ser executados conforme os scripts/configurações do projeto.

