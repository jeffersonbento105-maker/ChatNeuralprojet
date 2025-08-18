import { apiRequest } from "./queryClient";

export interface ChatRequest {
  assistant: 'clark' | 'ragnaria';
  message: string;
  history: Array<{ role: string; content: string }>;
}

export interface EmailRequest {
  prompt: string;
  tone: 'formal' | 'neutral' | 'friendly';
  lang: 'pt' | 'en';
}

export async function sendChatMessage(request: ChatRequest): Promise<string> {
  const response = await apiRequest('POST', '/api/chat', request);
  const data = await response.json();
  return data.reply;
}

export async function generateEmail(request: EmailRequest): Promise<string> {
  const response = await apiRequest('POST', '/api/email', request);
  const data = await response.json();
  return data.email;
}

export async function checkHealth(): Promise<{ status: string; app: string }> {
  const response = await apiRequest('GET', '/api/health');
  return await response.json();
}
