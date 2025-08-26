# ChatNeural - Text Renderer

Um visualizador dinâmico de texto e receitas construído com React, que renderiza JSON limpo e estruturado com design moderno inspirado no ChatGPT.

## 🚀 Funcionalidades

- **Renderização dinâmica** de JSON estruturado
- **Suporte a receitas** com escalonamento de ingredientes
- **Interface ChatGPT-like** com mensagens em bolhas
- **Barra de envio fixa** no rodapé
- **Design responsivo** e moderno
- **Limpeza automática** de markdown simples (**, *)
- **Playground interativo** para testar JSON

## 📁 Estrutura do Projeto

```
src/
├── components/
│   ├── TextRenderer.jsx      # Renderizador principal
│   ├── RecipeRenderer.jsx    # Renderizador específico para receitas
│   ├── ChatPlayground.jsx    # Container de mensagens
│   └── SendBar.jsx          # Barra de entrada fixa
├── data/
│   └── sample.json          # Dados de exemplo
├── utils/
│   ├── textUtils.js         # Utilitários de texto
│   └── recipeUtils.js       # Utilitários de receitas
├── styles/
│   └── styles.css           # Estilos principais
├── App.js                   # Componente principal
└── index.js                 # Entrada da aplicação
```

## 🛠️ Como executar

### Pré-requisitos
- Node.js 16+ 
- npm ou yarn

### Instalação
```bash
# Clone o projeto
git clone <repository-url>

# Instale as dependências
npm install

# Execute o projeto
npm start
```

A aplicação estará disponível em `http://localhost:3000`

## 📝 Formatos de JSON Suportados

### Texto Genérico
```json
{
  "title": "Título do Conteúdo",
  "author": "Nome do Autor",
  "content": [
    "Parágrafo 1",
    "Parágrafo 2",
    "Parágrafo 3"
  ]
}
```

### Receitas
```json
{
  "title": "Nome da Receita",
  "author": "Chef/Fonte",
  "servings": 8,
  "ingredients": [
    { "name": "Farinha", "amount": 250, "unit": "g" },
    { "name": "Açúcar", "amount": 200, "unit": "g" }
  ],
  "steps": [
    "Passo 1 da receita",
    "Passo 2 da receita"
  ]
}
```

## 🎨 Características do Design

- **Layout centralizado** com largura máxima de 720px
- **Fundo cinza claro** (#f3f4f6)
- **Cartões brancos** com sombra suave para mensagens
- **Barra de envio fixa** que não se move com o scroll
- **Animações suaves** de entrada para mensagens
- **Tipografia Inter** para melhor legibilidade

## 🔧 Utilitários Incluídos

### Texto (`textUtils.js`)
- `stripSimpleMarkdown()` - Remove formatação básica
- `parseSimpleMarkdownToNodes()` - Converte texto em nós estruturados

### Receitas (`recipeUtils.js`)
- `scaleIngredients()` - Escala ingredientes por porção
- `estimateCookingTime()` - Calcula tempo estimado
- `validateRecipe()` - Valida estrutura de receita
- `formatIngredient()` - Formata ingredientes para exibição

## 📱 Responsividade

- **Desktop**: Layout completo com máxima largura
- **Tablet**: Ajustes de padding e espaçamento  
- **Mobile**: Interface otimizada para telas pequenas

## 🧪 Testes

O projeto inclui `data-testid` em elementos principais para facilitar testes automatizados:

- `message-input` - Campo de entrada
- `send-button` - Botão de envio
- `chat-messages` - Container de mensagens
- `recipe-title` - Título da receita
- `servings-input` - Campo de ajuste de porções

## 🚀 Deploy no Replit

1. Crie um novo Repl React
2. Cole os arquivos na estrutura correta
3. Execute `npm install && npm start`
4. A aplicação estará disponível na URL do Replit

## 📄 Licença

Este projeto é open source e disponível sob a [MIT License](LICENSE).