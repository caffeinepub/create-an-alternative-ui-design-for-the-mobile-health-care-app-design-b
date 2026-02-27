const STORAGE_KEY = 'healthcare-assistant-transcript-v3';

export interface StoredTranscript {
  version: number;
  messages: Array<{
    id: string;
    role: string;
    content: string;
    timestamp: number;
    confidence?: 'high' | 'medium' | 'low';
    summary?: string | null;
    isExpanded?: boolean;
  }>;
}

export function loadTranscript(): StoredTranscript | null {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      // Try to migrate from v2
      const v2Stored = localStorage.getItem('healthcare-assistant-transcript-v2');
      if (v2Stored) {
        const v2Data = JSON.parse(v2Stored);
        if (v2Data.version === 2) {
          // Migrate to v3 with summary and isExpanded fields
          const migratedMessages = v2Data.messages.map((msg: any) => ({
            ...msg,
            summary: null,
            isExpanded: false,
          }));
          const newData: StoredTranscript = {
            version: 3,
            messages: migratedMessages,
          };
          saveTranscript(migratedMessages);
          return newData;
        }
      }
      // Try to migrate from v1
      const v1Stored = localStorage.getItem('healthcare-assistant-transcript-v1');
      if (v1Stored) {
        const v1Data = JSON.parse(v1Stored);
        if (v1Data.version === 1) {
          // Migrate to v3 with default values
          const migratedMessages = v1Data.messages.map((msg: any) => ({
            ...msg,
            confidence: 'high' as const,
            summary: null,
            isExpanded: false,
          }));
          const newData: StoredTranscript = {
            version: 3,
            messages: migratedMessages,
          };
          saveTranscript(migratedMessages);
          return newData;
        }
      }
      return null;
    }
    const parsed = JSON.parse(stored);
    if (parsed.version === 3) {
      return parsed;
    }
    return null;
  } catch {
    return null;
  }
}

export function saveTranscript(messages: Array<{ 
  id: string; 
  role: string; 
  content: string; 
  timestamp: number;
  confidence?: 'high' | 'medium' | 'low';
  summary?: string | null;
  isExpanded?: boolean;
}>) {
  try {
    const data: StoredTranscript = {
      version: 3,
      messages,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    // Silently fail if storage is unavailable
  }
}

export function clearTranscript() {
  try {
    localStorage.removeItem(STORAGE_KEY);
    // Also clear old versions
    localStorage.removeItem('healthcare-assistant-transcript-v2');
    localStorage.removeItem('healthcare-assistant-transcript-v1');
  } catch {
    // Silently fail if storage is unavailable
  }
}
