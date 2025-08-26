# 📋 Instruções para Recriar o Projeto

## 🚀 Como usar estes arquivos

### Opção 1: Projeto React Standalone
1. **Crie um novo projeto React**:
   ```bash
   npx create-react-app text-renderer
   cd text-renderer
   ```

2. **Substitua os arquivos**:
   - Cole `src/App.js` → substitui o App.js original
   - Cole `src/index.js` → substitui o index.js original  
   - Cole `public/index.html` → substitui o index.html original
   - Crie as pastas e arquivos conforme a estrutura:
     ```
     src/
     ├── components/
     ├── data/
     ├── utils/
     └── styles/
     ```

3. **Execute**:
   ```bash
   npm start
   ```

### Opção 2: Integrar ao ChatNeural Existente
Os arquivos já estão criados na estrutura do seu projeto atual. Para usar:

1. **Navegue para `/receitas`** - Visualizador já integrado
2. **Use os componentes criados** para renderizar JSON em outras partes do app
3. **Aproveite os utilitários** em `utils/` para processar dados

## 🎯 Funcionalidades Implementadas

### ✅ Componentes Criados
- **TextRenderer.jsx** - Renderizador principal que detecta tipo de conteúdo
- **RecipeRenderer.jsx** - Renderizador específico para receitas com escalonamento
- **ChatPlayground.jsx** - Container de mensagens estilo ChatGPT
- **SendBar.jsx** - Barra de entrada fixa no rodapé

### ✅ Utilitários
- **textUtils.js** - Limpeza de markdown simples e parsing
- **recipeUtils.js** - Escalonamento de ingredientes e validações

### ✅ Design
- **Layout centralizado** 720px máximo
- **Mensagens em bolhas** (usuário à direita, assistente à esquerda)
- **Barra fixa** no rodapé (igual ChatGPT)
- **Animações suaves** de entrada
- **Totalmente responsivo**

## 📝 Formatos JSON Aceitos

### Texto Genérico
```json
{
  "title": "Explicação sobre React",
  "author": "Developer",
  "content": [
    "React é uma biblioteca JavaScript.",
    "Usada para construir interfaces de usuário.",
    "Desenvolvida pelo Facebook."
  ]
}
```

### Receitas Completas
```json
{
  "title": "Bolo de Chocolate",
  "author": "Chef Maria",
  "servings": 8,
  "ingredients": [
    { "name": "Chocolate", "amount": 200, "unit": "g" },
    { "name": "Farinha", "amount": 250, "unit": "g" }
  ],
  "steps": [
    "Derreta o chocolate em banho-maria.",
    "Misture com a farinha gradualmente.",
    "Asse por 30 minutos a 180°C."
  ]
}
```

## 🎨 Personalização do Design

### Cores Principais (CSS Variables)
```css
:root {
  --bg: #f3f4f6;        /* Fundo geral */
  --card: #ffffff;      /* Fundo dos cards */
  --muted: #6b7280;     /* Texto secundário */
  --primary: #111827;   /* Texto principal */
  --border: rgba(15,23,42,0.06); /* Bordas */
}
```

### Estrutura de Classes
- `.text-block` - Card principal de mensagem
- `.message.user` - Mensagem do usuário (direita, azul)
- `.message.assistant` - Mensagem do assistente (esquerda, branco)
- `.send-bar` - Barra fixa do rodapé
- `.recipe-*` - Classes específicas para receitas

## 🔧 Testando Componentes

### No ChatNeural
1. Acesse `http://localhost:5000/receitas`
2. Veja os exemplos carregados automaticamente
3. Use o botão "Receitas" no header principal

### Standalone React
1. Execute `npm start`
2. Acesse `http://localhost:3000`  
3. Cole JSON no campo de entrada para testar

## 📱 Responsividade

- **Desktop**: Layout completo com sidebar
- **Tablet**: Ajustes de largura e padding
- **Mobile**: Mensagens ocupam 95% da largura, interface otimizada

## 🚨 Pontos Importantes

1. **Mantém design original** - Não altera cores sem permissão
2. **Barra fixa** - Comportamento igual ao ChatGPT
3. **JSON limpo** - Remove automaticamente ** e * do texto
4. **Escalabilidade** - Receitas ajustam proporções automaticamente
5. **Fallbacks** - Trata dados incompletos ou malformados

## 🎯 Como Usar no Replit

1. **Crie um novo Repl** do tipo "React"
2. **Cole todos os arquivos** na estrutura correta
3. **Execute**:
   ```bash
   npm install
   npm start
   ```
4. **Teste** colando diferentes JSONs no campo de entrada

---

**✨ Resultado**: Interface completa que renderiza texto e receitas de forma dinâmica, mantendo o visual profissional e a usabilidade do ChatNeural original.