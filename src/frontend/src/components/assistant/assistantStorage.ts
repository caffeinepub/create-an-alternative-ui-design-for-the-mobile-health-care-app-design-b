const STORAGE_KEY = 'healthcare-assistant-transcript-v2';

export interface StoredTranscript {
  version: number;
  messages: Array<{
    id: string;
    role: string;
    content: string;
    timestamp: number;
    confidence?: 'high' | 'medium' | 'low';
  }>;
}

export function loadTranscript(): StoredTranscript | null {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      // Try to migrate from v1
      const oldStored = localStorage.getItem('healthcare-assistant-transcript-v1');
      if (oldStored) {
        const oldData = JSON.parse(oldStored);
        if (oldData.version === 1) {
          // Migrate to v2 with default high confidence
          const migratedMessages = oldData.messages.map((msg: any) => ({
            ...msg,
            confidence: 'high' as const,
          }));
          const newData: StoredTranscript = {
            version: 2,
            messages: migratedMessages,
          };
          saveTranscript(migratedMessages);
          return newData;
        }
      }
      return null;
    }
    const parsed = JSON.parse(stored);
    if (parsed.version === 2) {
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
}>) {
  try {
    const data: StoredTranscript = {
      version: 2,
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
    // Also clear old version
    localStorage.removeItem('healthcare-assistant-transcript-v1');
  } catch {
    // Silently fail if storage is unavailable
  }
}
