export type ConfidenceLevel = 'high' | 'medium' | 'low';

export type AssistantMessageRole = 'user' | 'assistant' | 'system';

export interface AssistantMessage {
  id: string;
  role: AssistantMessageRole;
  content: string;
  timestamp: number;
  confidence?: ConfidenceLevel;
  summary?: string;
  isExpanded?: boolean;
  specialty?: string;
}

export type AssistantStatus =
  | 'idle'
  | 'listening'
  | 'processing'
  | 'speaking'
  | 'error';

export interface ReportAnalysisContext {
  state: 'idle' | 'awaiting-selection' | 'awaiting-paste' | 'analyzing';
  selectedReportId?: string;
  selectedReportFilename?: string;
}

export interface CommandResult {
  type:
    | 'navigation'
    | 'help'
    | 'unknown'
    | 'medical'
    | 'report-list'
    | 'report-analysis'
    | 'report-paste-request'
    | 'custom-qa'
    | 'general_knowledge'
    | 'emergency'
    | 'fallback'
    | 'greeting'
    | 'thanks';
  message: string;
  navigationTarget?: string;
  reportList?: Array<{ id: string; filename: string }>;
  awaitingReportSelection?: boolean;
  awaitingReportText?: boolean;
  matchType?: 'exact' | 'fuzzy' | 'none';
  similarityScore?: number;
  customQAUsed?: boolean;
  detectedLanguage?: string;
  category?: string;
  specialty?: string;
}

export type SpecialtyFilter =
  | 'cardiologist'
  | 'dermatologist'
  | 'pediatrician'
  | 'surgeon'
  | 'neurologist'
  | 'generalPractitioner'
  | 'anesthesiologist'
  | 'oncologist'
  | 'gynecologist'
  | 'radiologist'
  | 'autoDetect';
