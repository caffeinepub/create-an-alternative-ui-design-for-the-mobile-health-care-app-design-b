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
  type: 'navigation' | 'help' | 'unknown' | 'medical' | 'report-list' | 'report-analysis' | 'report-paste-request';
  message: string;
  navigationTarget?: string;
  reportList?: Array<{ id: string; filename: string }>;
  awaitingReportSelection?: boolean;
  awaitingReportText?: boolean;
}

export interface ReportAnalysisContext {
  state: 'idle' | 'awaiting-selection' | 'awaiting-paste' | 'analyzing';
  selectedReportId?: string;
  selectedReportFilename?: string;
}
