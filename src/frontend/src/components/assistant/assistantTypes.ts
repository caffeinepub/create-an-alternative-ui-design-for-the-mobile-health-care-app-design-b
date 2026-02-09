// Assistant message and state types

export type AssistantMessageRole = 'user' | 'assistant' | 'system';

export interface AssistantMessage {
  id: string;
  role: AssistantMessageRole;
  content: string;
  timestamp: number;
}

export type AssistantStatus = 'idle' | 'listening' | 'processing' | 'error';

export interface AssistantState {
  isOpen: boolean;
  status: AssistantStatus;
  errorMessage?: string;
  transcript: AssistantMessage[];
}

export interface CommandResult {
  type: 'navigation' | 'help' | 'unknown';
  message: string;
  navigationTarget?: string;
}
