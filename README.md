# ChatNeural - AI Assistant Platform

Um aplicativo web moderno de chatbot com assistentes IA analíticos e criativos, geração de e-mails profissionais e interface glassmorphism.

## 🚀 Deploy no Replit

Este projeto está configurado para rodar automaticamente no Replit. Siga estes passos:

### 1. Configurar API Key do OpenAI

1. Vá para a aba **Secrets** no painel lateral do Replit
2. Adicione um novo secret com a chave: `OPENAI_API_KEY`
3. Cole sua chave da API OpenAI como valor
4. Salve o secret

### 2. Executar o Projeto

1. Clique no botão **Run** no Replit
2. O projeto iniciará automaticamente na porta configurada
3. Acesse o aplicativo na URL fornecida pelo Replit

## ✨ Funcionalidades

### 🤖 Assistentes IA
- **Clark**: Assistente analítico e objetivo
  - Respostas estruturadas e educativas
  - Explicações passo-a-passo
  - Máximo 1 emoji por resposta
  
- **Ragnaria**: Assistente criativa e acolhedora
  - Ideias inovadoras e exemplos práticos
  - Linguagem leve e amigável
  - 2-3 emojis quando apropriado

### 💬 Interface de Chat
- Bolhas de conversa modernas (usuário à direita, IA à esquerda)
- Indicador "digitando..." com animação
- Histórico curto de 5 turnos mantido automaticamente
- Suporte a Enter para enviar e Shift+Enter para nova linha
- Auto-redimensionamento do campo de texto

### 📧 Gerador de E-mails
- Painel lateral para geração de e-mails profissionais
- 3 tons disponíveis: Formal, Neutro, Amigável
- Detecção automática de idioma (PT-BR/EN)
- Botões para copiar e regenerar e-mails

### 🌐 Detecção de Idioma
- Suporte automático para Português e Inglês
- System prompts adaptativos por idioma
- Interface se adapta ao idioma detectado

### 🎨 Design
- Tema glassmorphism com transparências sutis
- Gradientes roxo→azul no cabeçalho
- Cantos arredondados 2xl e sombras suaves
- Microanimações em hover/focus
- Totalmente responsivo (320px+ até desktop)

## 🛠️ Tecnologias

### Backend
- Node.js 18+ com fetch nativo
- Express.js para API REST
- OpenAI API (modelo gpt-4o)
- CORS configurado

### Frontend
- HTML5 puro
- CSS3 com glassmorphism e animações
- JavaScript ES6+ vanilla
- Bootstrap 5 via CDN

### Endpoints da API
- `GET /api/health` - Status da aplicação
- `POST /api/chat` - Envio de mensagens para assistentes
- `POST /api/email` - Geração de e-mails profissionais

## 📁 Estrutura do Projeto

