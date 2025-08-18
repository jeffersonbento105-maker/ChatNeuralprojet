(function() {
    'use strict';

    // Application State
    let state = {
        currentAssistant: 'clark',
        isTyping: false,
        isSidebarOpen: false,
        messages: [],
        selectedTone: 'formal',
        language: 'en'
    };

    // DOM Elements
    const elements = {
        assistantSelector: document.getElementById('assistantSelector'),
        messagesArea: document.getElementById('messagesArea'),
        messageInput: document.getElementById('messageInput'),
        sendButton: document.getElementById('sendButton'),
        emailSidebar: document.getElementById('emailSidebar'),
        emailToggle: document.getElementById('emailToggle'),
        closeSidebar: document.getElementById('closeSidebar'),
        emailPrompt: document.getElementById('emailPrompt'),
        emailResult: document.getElementById('emailResult'),
        emailActions: document.getElementById('emailActions'),
        generateEmail: document.getElementById('generateEmail'),
        copyEmail: document.getElementById('copyEmail'),
        regenerateEmail: document.getElementById('regenerateEmail'),
        toastContainer: document.getElementById('toastContainer'),
        statusText: document.getElementById('statusText'),
        emailTitle: document.getElementById('emailTitle'),
        emailDescLabel: document.getElementById('emailDescLabel'),
        toneLabel: document.getElementById('toneLabel'),
        toneFormal: document.getElementById('toneFormal'),
        toneNeutral: document.getElementById('toneNeutral'),
        toneFriendly: document.getElementById('toneFriendly'),
        generateText: document.getElementById('generateText'),
        resultLabel: document.getElementById('resultLabel'),
        emptyStateText: document.getElementById('emptyStateText'),
        copyText: document.getElementById('copyText'),
        regenerateText: document.getElementById('regenerateText')
    };

    // Assistant Configuration
    const assistants = {
        clark: {
            name: 'Clark',
            avatar: 'C',
            color: '#3B82F6',
            welcomeMessage: {
                en: "👋 Hi! I'm Clark, your analytical AI assistant. I can help you with detailed explanations, step-by-step solutions, and structured answers. How can I assist you today?",
                pt: "👋 Olá! Eu sou o Clark, seu assistente de IA analítico. Posso ajudar com explicações detalhadas, soluções passo-a-passo e respostas estruturadas. Como posso ajudar hoje?"
            }
        },
        ragnaria: {
            name: 'Ragnaria',
            avatar: 'R',
            color: '#8B5CF6',
            welcomeMessage: {
                en: "🌟 Hey there! I'm Ragnaria, your creative AI companion. I love brainstorming ideas, finding innovative solutions, and making conversations fun! What inspiring project can we work on together? ✨",
                pt: "🌟 Olá! Eu sou a Ragnaria, sua companheira de IA criativa. Adoro fazer brainstorming, encontrar soluções inovadoras e tornar conversas divertidas! Que projeto inspirador podemos desenvolver juntas? ✨"
            }
        }
    };

    // Language Detection
    function detectLanguage(text) {
        const ptWords = ['o', 'a', 'e', 'é', 'da', 'do', 'que', 'não', 'como', 'para', 'com', 'uma', 'por'];
        const enWords = ['the', 'and', 'is', 'to', 'of', 'a', 'in', 'that', 'have', 'for', 'not', 'with', 'you'];
        
        const words = text.toLowerCase().split(/\s+/);
        let ptScore = 0;
        let enScore = 0;
        
        words.forEach(word => {
            if (ptWords.includes(word)) ptScore++;
            if (enWords.includes(word)) enScore++;
        });
        
        return ptScore > enScore ? 'pt' : 'en';
    }

    // Toast notifications
    function showToast(message, type = 'success') {
        const toast = document.createElement('div');
        toast.className = `alert alert-${type === 'success' ? 'success' : type === 'error' ? 'danger' : 'warning'} alert-dismissible fade show position-fixed`;
        toast.style.cssText = 'top: 2rem; right: 2rem; z-index: 1050; min-width: 300px;';
        
        toast.innerHTML = `
            <div class="d-flex align-items-center">
                <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'} me-2"></i>
                ${message}
                <button type="button" class="btn-close ms-auto" data-bs-dismiss="alert"></button>
            </div>
        `;
        
        elements.toastContainer.appendChild(toast);
        
        // Auto remove after 3 seconds
        setTimeout(() => {
            if (toast.parentElement) {
                toast.remove();
            }
        }, 3000);
    }

    // Scroll to bottom of messages
    function scrollToBottom() {
        elements.messagesArea.scrollTop = elements.messagesArea.scrollHeight;
    }

    // Update typing indicator
    function updateTypingIndicator(show) {
        state.isTyping = show;
        
        // Remove existing typing indicator
        const existingTyping = document.querySelector('.typing-indicator-container');
        if (existingTyping) {
            existingTyping.remove();
        }
        
        if (show) {
            const assistant = assistants[state.currentAssistant];
            const typingText = state.language === 'pt' ? 'Pensando...' : 'Thinking...';
            
            const typingDiv = document.createElement('div');
            typingDiv.className = 'message ai typing-indicator-container';
            typingDiv.innerHTML = `
                <div class="message-avatar">${assistant.avatar}</div>
                <div class="typing-indicator">
                    <div class="typing-dots">
                        <div class="typing-dot"></div>
                        <div class="typing-dot"></div>
                        <div class="typing-dot"></div>
                    </div>
                    <span class="ms-2">${typingText}</span>
                </div>
            `;
            
            elements.messagesArea.appendChild(typingDiv);
        }
        
        elements.sendButton.disabled = show;
        setTimeout(scrollToBottom, 100);
    }

    // Create message element
    function createMessageElement(content, isUser = false, assistant = null) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${isUser ? 'user' : 'ai'}`;
        
        const avatar = isUser ? 'U' : (assistant ? assistants[assistant].avatar : 'A');
        
        messageDiv.innerHTML = `
            <div class="message-avatar">${avatar}</div>
            <div class="message-bubble">
                <p>${content.replace(/\n/g, '<br>')}</p>
            </div>
        `;
        
        return messageDiv;
    }

    // Add message to chat
    function addMessage(content, isUser = false, assistant = null) {
        const messageElement = createMessageElement(content, isUser, assistant);
        elements.messagesArea.appendChild(messageElement);
        
        // Add to message history for API calls
        state.messages.push({
            role: isUser ? 'user' : 'assistant',
            content: content
        });
        
        // Keep only last 5 exchanges (10 messages)
        if (state.messages.length > 10) {
            state.messages = state.messages.slice(-10);
        }
        
        setTimeout(scrollToBottom, 100);
    }

    // Send message to chat API
    async function sendMessage() {
        const message = elements.messageInput.value.trim();
        if (!message || state.isTyping) return;

        // Detect language and update state
        state.language = detectLanguage(message);
        updateUILanguage();
        
        // Add user message
        addMessage(message, true);
        elements.messageInput.value = '';
        resetTextareaHeight();
        
        // Show typing indicator
        updateTypingIndicator(true);
        
        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    assistant: state.currentAssistant,
                    message: message,
                    history: state.messages.slice(-10)
                })
            });
            
            const data = await response.json();
            
            if (!response.ok) {
                throw new Error(data.message || data.error || 'Failed to send message');
            }
            
            updateTypingIndicator(false);
            addMessage(data.reply, false, state.currentAssistant);
            
            showToast(state.language === 'pt' ? 'Mensagem enviada!' : 'Message sent!');
            
        } catch (error) {
            updateTypingIndicator(false);
            console.error('Error sending message:', error);
            showToast(
                state.language === 'pt' ? 'Erro ao enviar mensagem' : 'Error sending message', 
                'error'
            );
        }
    }

    // Generate email
    async function generateEmail() {
        const prompt = elements.emailPrompt.value.trim();
        if (!prompt) {
            showToast(
                state.language === 'pt' ? 'Por favor, descreva o e-mail' : 'Please describe the email', 
                'warning'
            );
            return;
        }
        
        const originalText = elements.generateText.textContent;
        elements.generateEmail.disabled = true;
        elements.generateText.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>' + 
            (state.language === 'pt' ? 'Gerando...' : 'Generating...');
        
        try {
            const response = await fetch('/api/email', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    prompt: prompt,
                    tone: state.selectedTone,
                    lang: state.language
                })
            });
            
            const data = await response.json();
            
            if (!response.ok) {
                throw new Error(data.message || data.error || 'Failed to generate email');
            }
            
            elements.emailResult.innerHTML = `<pre style="white-space: pre-wrap; font-family: inherit; margin: 0;">${data.email}</pre>`;
            elements.emailActions.classList.remove('d-none');
            
            showToast(state.language === 'pt' ? 'E-mail gerado com sucesso!' : 'Email generated successfully!');
            
        } catch (error) {
            console.error('Error generating email:', error);
            showToast(
                state.language === 'pt' ? 'Erro ao gerar e-mail' : 'Error generating email', 
                'error'
            );
        } finally {
            elements.generateEmail.disabled = false;
            elements.generateText.textContent = originalText;
        }
    }

    // Copy email to clipboard
    async function copyToClipboard() {
        try {
            const emailText = elements.emailResult.querySelector('pre')?.textContent || elements.emailResult.textContent;
            await navigator.clipboard.writeText(emailText);
            showToast(state.language === 'pt' ? 'E-mail copiado!' : 'Email copied!');
        } catch (error) {
            showToast(state.language === 'pt' ? 'Erro ao copiar' : 'Copy failed', 'error');
        }
    }

    // Reset textarea height
    function resetTextareaHeight() {
        elements.messageInput.style.height = 'auto';
        elements.messageInput.style.height = '44px';
    }

    // Update UI language
    function updateUILanguage() {
        const texts = {
            statusText: state.language === 'pt' ? 'Online' : 'Online',
            emailTitle: state.language === 'pt' ? 'Gerar E-mail Profissional' : 'Generate Professional Email',
            emailDescLabel: state.language === 'pt' ? 'Descrição do E-mail' : 'Email Description',
            toneLabel: state.language === 'pt' ? 'Tom' : 'Tone',
            toneFormal: state.language === 'pt' ? 'Formal' : 'Formal',
            toneNeutral: state.language === 'pt' ? 'Neutro' : 'Neutral',
            toneFriendly: state.language === 'pt' ? 'Amigável' : 'Friendly',
            generateText: state.language === 'pt' ? 'Gerar E-mail' : 'Generate Email',
            resultLabel: state.language === 'pt' ? 'E-mail Gerado' : 'Generated Email',
            emptyStateText: state.language === 'pt' ? 'Seu e-mail gerado aparecerá aqui' : 'Your generated email will appear here',
            copyText: state.language === 'pt' ? 'Copiar' : 'Copy',
            regenerateText: state.language === 'pt' ? 'Regenerar' : 'Regenerate',
            placeholder: state.language === 'pt' ? 
                'Digite sua mensagem... (Enter para enviar, Shift+Enter para nova linha)' : 
                'Type your message... (Press Enter to send, Shift+Enter for new line)'
        };

        Object.keys(texts).forEach(key => {
            if (elements[key]) {
                if (key === 'placeholder') {
                    elements.messageInput.placeholder = texts[key];
                } else {
                    elements[key].textContent = texts[key];
                }
            }
        });
    }

    // Switch assistant
    function switchAssistant(assistant) {
        state.currentAssistant = assistant;
        
        // Clear messages and add new welcome message
        elements.messagesArea.innerHTML = '';
        state.messages = [];
        
        const welcomeMessage = assistants[assistant].welcomeMessage[state.language];
        addMessage(welcomeMessage, false, assistant);
    }

    // Event Listeners
    elements.assistantSelector.addEventListener('change', (e) => {
        switchAssistant(e.target.value);
    });

    elements.sendButton.addEventListener('click', sendMessage);

    elements.messageInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    });

    // Auto-resize textarea
    elements.messageInput.addEventListener('input', function() {
        this.style.height = 'auto';
        this.style.height = Math.min(this.scrollHeight, 120) + 'px';
    });

    // Email sidebar events
    elements.emailToggle.addEventListener('click', () => {
        state.isSidebarOpen = !state.isSidebarOpen;
        elements.emailSidebar.classList.toggle('open', state.isSidebarOpen);
    });

    elements.closeSidebar.addEventListener('click', () => {
        state.isSidebarOpen = false;
        elements.emailSidebar.classList.remove('open');
    });

    // Tone selection
    document.querySelectorAll('.tone-option').forEach(button => {
        button.addEventListener('click', (e) => {
            document.querySelectorAll('.tone-option').forEach(b => b.classList.remove('active'));
            e.currentTarget.classList.add('active');
            state.selectedTone = e.currentTarget.dataset.tone;
        });
    });

    elements.generateEmail.addEventListener('click', generateEmail);
    elements.copyEmail.addEventListener('click', copyToClipboard);
    elements.regenerateEmail.addEventListener('click', generateEmail);

    // Initialize application
    function init() {
        // Add initial welcome message
        const welcomeMessage = assistants[state.currentAssistant].welcomeMessage[state.language];
        addMessage(welcomeMessage, false, state.currentAssistant);
        
        // Focus input
        elements.messageInput.focus();
        
        // Update UI language
        updateUILanguage();
        
        console.log('🧠 ChatNeural initialized successfully!');
    }

    // Start the application when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
