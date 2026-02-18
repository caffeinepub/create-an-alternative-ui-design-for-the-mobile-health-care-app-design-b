import { useState, useEffect, useCallback } from 'react';
import { AssistantMessage, ConfidenceLevel } from './assistantTypes';
import { loadTranscript, saveTranscript, clearTranscript as clearStoredTranscript } from './assistantStorage';

export function useAssistantTranscript() {
  const [transcript, setTranscript] = useState<AssistantMessage[]>([]);

  // Load transcript from storage on mount
  useEffect(() => {
    const stored = loadTranscript();
    if (stored && stored.messages) {
      setTranscript(stored.messages as AssistantMessage[]);
    }
  }, []);

  // Save transcript to storage whenever it changes
  useEffect(() => {
    if (transcript.length > 0) {
      saveTranscript(transcript);
    }
  }, [transcript]);

  const addMessage = useCallback((role: 'user' | 'assistant', content: string, confidence?: ConfidenceLevel) => {
    const message: AssistantMessage = {
      id: `${Date.now()}-${Math.random()}`,
      role,
      content,
      timestamp: Date.now(),
      confidence: role === 'user' ? confidence : undefined,
    };
    setTranscript(prev => [...prev, message]);
  }, []);

  const clearTranscript = useCallback(() => {
    setTranscript([]);
    clearStoredTranscript();
  }, []);

  return {
    transcript,
    addMessage,
    clearTranscript,
  };
}
