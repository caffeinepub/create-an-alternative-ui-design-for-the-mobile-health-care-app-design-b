import { useState, useEffect, useCallback } from 'react';
import { AssistantMessage, ConfidenceLevel } from './assistantTypes';
import { loadTranscript, saveTranscript, clearTranscript as clearStoredTranscript } from './assistantStorage';

export function useAssistantTranscript() {
  const [transcript, setTranscript] = useState<AssistantMessage[]>([]);

  // Load transcript from storage on mount
  useEffect(() => {
    const stored = loadTranscript();
    if (stored && stored.messages) {
      const messages: AssistantMessage[] = stored.messages.map((msg) => ({
        id: msg.id,
        role: msg.role as AssistantMessage['role'],
        content: msg.content,
        timestamp: msg.timestamp,
        confidence: msg.confidence as ConfidenceLevel | undefined,
        // Convert null → undefined to satisfy AssistantMessage['summary'] type
        summary: msg.summary ?? undefined,
        isExpanded: msg.isExpanded ?? false,
      }));
      setTranscript(messages);
    }
  }, []);

  // Save transcript to storage whenever it changes
  useEffect(() => {
    if (transcript.length > 0) {
      saveTranscript(transcript);
    }
  }, [transcript]);

  const addMessage = useCallback(
    (
      role: 'user' | 'assistant',
      content: string,
      confidence?: ConfidenceLevel,
      summary?: string,
      specialty?: string
    ) => {
      const message: AssistantMessage = {
        id: `${Date.now()}-${Math.random()}`,
        role,
        content,
        timestamp: Date.now(),
        confidence: role === 'user' ? confidence : undefined,
        summary: role === 'assistant' ? summary : undefined,
        isExpanded: false,
        specialty,
      };
      setTranscript((prev) => [...prev, message]);
    },
    []
  );

  const toggleMessageExpanded = useCallback((messageId: string) => {
    setTranscript((prev) =>
      prev.map((msg) =>
        msg.id === messageId ? { ...msg, isExpanded: !msg.isExpanded } : msg
      )
    );
  }, []);

  const clearTranscript = useCallback(() => {
    setTranscript([]);
    clearStoredTranscript();
  }, []);

  return {
    transcript,
    addMessage,
    toggleMessageExpanded,
    clearTranscript,
  };
}
