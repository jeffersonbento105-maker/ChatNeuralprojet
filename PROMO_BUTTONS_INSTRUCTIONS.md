# PromoButtons Component - Instruções de Uso

## Componente Criado

O componente `PromoButtons` foi criado em `client/src/components/PromoButtons.tsx` e já está integrado no ChatNeural.

## Características Implementadas

### Posicionamento
- Localizado na mesma altura do título "ChatNeural", alinhados à direita
- Integrado no header usando `flex justify-between` 
- Layout horizontal (`flex gap-2`) para os botões ficarem lado a lado
- Não interfere no layout existente

### Botões

#### 1. Botão de Email
- **Ícone**: 📧 (emoji de email)
- **Texto**: "Email" em inglês à esquerda do ícone
- **Cor**: Azul (`bg-blue-500` com hover `bg-blue-600`)
- **Forma**: Pill/oval com bordas totalmente arredondadas (`rounded-full`)
- **Funcionalidade**: Abre janela de geração de email em nova aba

#### 2. Botão de Recipe
- **Ícone**: 🍰 (emoji de fatia de bolo)
- **Texto**: "Recipe" em inglês à esquerda do ícone
- **Cor**: Roxo (`bg-purple-500` com hover `bg-purple-600`)
- **Forma**: Pill/oval com bordas totalmente arredondadas (`rounded-full`)
- **Funcionalidade**: Abre visualizador de receitas em nova aba

### Tooltips Multilíngues

#### Detecção de Idioma
- Usa `navigator.language` para detectar automaticamente o idioma do browser
- Suporta: Português, Inglês e Espanhol
- Fallback para Inglês se não detectar um idioma suportado

#### Mensagens por Idioma

**Email:**
- **Português**: "Com o ChatNeural você pode criar emails formais, amigáveis e neutros dentro do chat."
- **Inglês**: "With ChatNeural you can create formal, friendly, and neutral emails in chat."
- **Espanhol**: "Con ChatNeural puedes crear correos formales, amigables y neutrales dentro del chat."

**Bolo:**
- **Português**: "Crie bolos de casamento e aniversários com o ChatNeural."
- **Inglês**: "Create wedding and birthday cakes with ChatNeural."
- **Espanhol**: "Crea pasteles de boda y cumpleaños con ChatNeural."

### Estilo dos Tooltips
- Fundo cinza escuro (`bg-gray-800`)
- Texto branco (`text-white`)
- Tamanho pequeno (`text-xs`)
- Arredondado (`rounded`)
- Padding interno (`px-2 py-1`)
- Aparecem à direita dos botões (`left-full ml-2`)
- Seta apontando para o botão
- Somente ao passar o mouse (hover)

## Integração no Projeto

O componente foi automaticamente integrado em:

1. **Importado** em `client/src/pages/chat.tsx`
2. **Renderizado** dentro do header ao lado do título "ChatNeural"
3. **Posicionado** usando flexbox para alinhamento perfeito com o título

## Como Usar em Outros Projetos

```tsx
import PromoButtons from './components/PromoButtons';

function App() {
  return (
    <div className="relative min-h-screen">
      <PromoButtons />
      {/* Resto do seu conteúdo */}
    </div>
  );
}
```

## Características Técnicas

- **Framework**: React + TypeScript
- **Estilização**: TailwindCSS
- **Responsivo**: Adaptável a diferentes tamanhos de tela
- **Acessibilidade**: Inclui `data-testid` para testes
- **Performance**: Lightweight, sem dependências externas
- **Detecção de idioma**: Automática via browser API

## Customização

Para personalizar as cores, textos ou posicionamento, edite o arquivo `client/src/components/PromoButtons.tsx`:

- **Cores**: Modifique as classes `bg-blue-500`, `bg-orange-500`
- **Posição**: Altere `top-4 left-4` para a posição desejada
- **Textos**: Edite o objeto `tooltips` com as mensagens
- **Idiomas**: Adicione novos idiomas no objeto `tooltips` e na lógica de detecção

## Notas Importantes

- O componente não tem funcionalidade além do visual
- Respeita completamente o design existente do ChatNeural
- Tooltips só aparecem no hover, não alteram o layout
- Compatível com todos os browsers modernos
- Funciona em dispositivos móveis e desktop