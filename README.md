# Roteiros de Estudo — Dias 1 a 3

Projeto inicial de uma plataforma educacional feita com Next.js e React.

## O que já funciona

- Catálogo com roteiros carregados de arquivos JSON.
- Filtro por ano escolar e disciplina.
- Cartões clicáveis que abrem a página de detalhes de cada roteiro.
- Rota dinâmica `/roteiros/[id]`.
- Mensagem para roteiro não encontrado.
- Informações do professor e da disciplina relacionadas por identificadores.
- Consulta ao resumo de um artigo da Wikipédia.
- Estados de carregamento, sucesso e erro na consulta externa.
- Seis roteiros de exemplo em `data/roteiros.json`.

> Nesta etapa, os dados são exemplos fictícios para desenvolver a interface. Não existe login, banco de dados ou servidor próprio.

## Requisitos

- Node.js 20.9 ou superior
- npm

Confira as versões no terminal:

```bash
node -v
npm -v
```

## Como executar

1. Instale as dependências:

```bash
npm install
```

2. Inicie o modo de desenvolvimento:

```bash
npm run dev
```

3. Abra no navegador:

http://localhost:3000

Para parar o servidor, pressione `Ctrl + C` no terminal.

## Como testar

- Na página inicial, escolha um ano e/ou uma disciplina nos filtros.
- Clique em um cartão para abrir os detalhes.
- Na página de detalhes, veja as informações do roteiro e aguarde o resumo da Wikipédia.
- Para testar a mensagem de identificador inexistente durante o desenvolvimento, abra uma URL como:
  `http://localhost:3000/roteiros/nao-existe`

## Como gerar a versão estática

O projeto já está configurado com `output: "export"` em `next.config.js`.

Execute:

```bash
npm run build
```

Se o build terminar sem erros, o Next.js gera a pasta `out` com os arquivos estáticos.

A rota dinâmica usa `generateStaticParams()` para gerar uma página para cada ID existente em `data/roteiros.json`.

**Observação:** a consulta à Wikipédia depende de internet e pode falhar. O restante do roteiro continua aparecendo mesmo quando isso acontece. Para testar o site exportado localmente, use um servidor estático; não abra os arquivos HTML diretamente pelo gerenciador de arquivos.

## Organização das pastas

```text
app/
  layout.js                 Estrutura comum das páginas
  page.js                   Catálogo de roteiros
  globals.css               Estilos
  roteiros/[id]/page.js     Detalhes de um roteiro
components/
  FiltroRoteiros.js         Filtros de ano e disciplina
  RoteiroCard.js            Cartão de roteiro
  ProfessorInfo.js          Dados do professor
  QuestoesFixacao.js        Questões e respostas
  ApoioWikipedia.js         Consulta externa à Wikipédia
data/
  roteiros.json             Roteiros de exemplo
  professores.json          Professores de exemplo
  disciplinas.json          Disciplinas de exemplo
```

## Componentes React

Os componentes recebem dados por `props`. Por exemplo, `RoteiroCard` recebe um roteiro e monta o cartão correspondente. Isso evita repetir o mesmo HTML para cada roteiro.

## API externa

É usada a API pública de resumo da Wikipédia em português:

`https://pt.wikipedia.org/api/rest_v1/page/summary/`

A requisição é feita no navegador com `fetch`. O componente mostra uma mensagem enquanto carrega, o texto quando funciona ou uma mensagem de erro quando não consegue consultar a API.

## Limites desta primeira etapa

- O formulário de solicitação do professor ainda não foi implementado.
- Os dados são estáticos e não podem ser alterados pelo site.
- Não há autenticação nem banco de dados.
- As questões são exibidas com as respostas; a interação para o aluno responder pode ser feita em uma etapa futura.
