# AIControls Component - Instruções de Uso

## Componente Criado

O componente `AIControls` foi criado em `client/src/components/AIControls.tsx` e já está integrado no ChatNeural.

## Características Implementadas

### Posicionamento
- Ícone de cérebro à **esquerda** do título "ChatNeural"
- Botão de alternância à **direita** do título "ChatNeural"
- Todos alinhados na mesma linha usando flexbox
- Não altera o layout ou design existente

### Ícone de Cérebro (Esquerda)
- **Ícone**: 🧠 (emoji de cérebro)
- **Cor**: Roxo (`text-purple-600`)
- **Animação**: Nenhuma (imagem fixa)
- **Tamanho**: Pequeno e discreto (`w-6 h-6`)
- **Posição**: Margem direita de 12px (`mr-3`)

### Botão de Alternância (Direita)
- **Funcionalidade**: Alterna entre Clark e Ragnaria
- **Estados**:
  - **Clark**: Fundo cinza claro (`bg-gray-200`), texto cinza escuro
  - **Ragnaria**: Fundo roxo (`bg-purple-400`), texto branco
- **Estilo**: Pequeno, arredondado (`px-3 py-1 text-xs rounded-full`)
- **Posição**: Margem esquerda de 12px (`ml-3`)

### Tooltips Multilíngues

#### Detecção de Idioma
- Usa `navigator.language` para detectar automaticamente o idioma do browser
- Suporta: Português, Inglês e Espanhol
- Fallback para Inglês se não detectar um idioma suportado

#### Mensagens por Idioma

**Clark:**
- **Português**: "Inteligência lógica e objetiva"
- **Inglês**: "Logical and objective intelligence"
- **Espanhol**: "Inteligencia lógica y objetiva"

**Ragnaria:**
- **Português**: "Inteligência criativa e livre"
- **Inglês**: "Creative and free intelligence"
- **Espanhol**: "Inteligencia creativa y libre"

### Estilo dos Tooltips
- Fundo cinza escuro (`bg-gray-800`)
- Texto branco (`text-white`)
- Tamanho pequeno (`text-xs`)
- Arredondado (`rounded`)
- Padding interno (`px-2 py-1`)
- Aparecem abaixo do botão (`top-full mt-2`)
- Seta apontando para cima
- Somente ao passar o mouse (hover)

## Integração no Projeto

O componente foi automaticamente integrado em:

1. **Importado** em `client/src/pages/chat.tsx`
2. **Renderizado** duas vezes no header:
   - Uma instância à esquerda do título (ícone do cérebro)
   - Uma instância à direita do título (botão de alternância)
3. **Posicionado** usando flexbox para alinhamento perfeito

## Estrutura do Header

```tsx
<div className="flex items-center justify-between">
  <div className="flex items-center">
    <AIControls />  {/* Ícone à esquerda */}
    <h1>ChatNeural</h1>
    <AIControls />  {/* Botão à direita */}
  </div>
  <PromoButtons />
</div>
```

## Como Usar em Outros Projetos

```tsx
import AIControls from './components/AIControls';

function App() {
  return (
    <header>
      <div className="flex items-center">
        <AIControls />
        <h1>Título do App</h1>
        <AIControls />
      </div>
    </header>
  );
}
```

## Características Técnicas

- **Framework**: React + TypeScript
- **Estilização**: TailwindCSS
- **Estado**: useState para controle do assistente ativo
- **Animação**: CSS keyframes para rotação do cérebro
- **Responsivo**: Adaptável a diferentes tamanhos de tela
- **Acessibilidade**: Inclui `data-testid` para testes
- **Performance**: Lightweight, sem dependências externas

## Estilo Visual

O ícone do cérebro é uma imagem fixa sem animação, mantendo o design limpo e discreto conforme solicitado.

## Customização

Para personalizar as cores, textos ou animação, edite o arquivo `client/src/components/AIControls.tsx`:

- **Cores**: Modifique as classes `bg-gray-200`, `bg-purple-400`, `text-purple-600`
- **Estilo**: Modifique classes CSS para ajustar aparência
- **Textos**: Edite o objeto `tooltips` com as mensagens
- **Idiomas**: Adicione novos idiomas no objeto `tooltips` e na lógica de detecção

## Estado do Componente

O componente mantém estado interno:
- `currentAssistant`: 'clark' | 'ragnaria'
- `language`: 'pt' | 'en' | 'es'

A alternância entre assistentes é puramente visual e não afeta a lógica do chat.

## Notas Importantes

- O componente é renderizado duas vezes para posicionar elementos diferentes
- Respeita completamente o design existente do ChatNeural
- Tooltips só aparecem no hover, não alteram o layout
- Compatível com todos os browsers modernos
- Funciona em dispositivos móveis e desktop
- O ícone do cérebro é fixo e não distrai do conteúdo