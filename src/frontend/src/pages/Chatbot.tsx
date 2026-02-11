import { PageTitle } from '../designB/components/DesignBTypography';
import { AssistantPanel } from '../components/assistant/AssistantPanel';
import { useAssistantTranscript } from '../components/assistant/useAssistantTranscript';
import { useRequireAuth } from '../hooks/useRequireAuth';
import { useCallback } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { interpretCommand } from '../components/assistant/assistantBrain';
import { AssistantMessage, AssistantStatus } from '../components/assistant/assistantTypes';
import { useState } from 'react';

export default function Chatbot() {
  // Protect this route - redirect to signin if not authenticated
  useRequireAuth();

  const navigate = useNavigate();
  const { transcript, addMessage, clearTranscript } = useAssistantTranscript();
  const [status, setStatus] = useState<AssistantStatus>('idle');
  const [errorMessage, setErrorMessage] = useState<string>();
  const [inputValue, setInputValue] = useState('');

  const handleCommand = useCallback(async (userInput: string) => {
    if (!userInput.trim()) return;

    // Add user message
    addMessage('user', userInput);
    setInputValue('');
    setStatus('processing');
    setErrorMessage(undefined);

    // Interpret command immediately (no artificial delay)
    const result = interpretCommand(userInput, transcript);

    // Handle navigation
    if (result.type === 'navigation' && result.navigationTarget) {
      addMessage('assistant', result.message);
      setStatus('idle');
      
      // Navigate immediately after adding confirmation message
      setTimeout(() => {
        navigate({ to: result.navigationTarget as '/' | '/signin' | '/home' | '/profile' | '/chat' });
      }, 100);
    } else if (result.type === 'medical') {
      // Add medical response
      addMessage('assistant', result.message);
      setStatus('idle');
    } else {
      // Add assistant response
      addMessage('assistant', result.message);
      setStatus('idle');
    }
  }, [addMessage, navigate, transcript]);

  const handleSendMessage = useCallback(() => {
    handleCommand(inputValue);
  }, [inputValue, handleCommand]);

  const handleVoiceInput = useCallback((text: string) => {
    handleCommand(text);
  }, [handleCommand]);

  const handleClearConversation = useCallback(() => {
    clearTranscript();
    setStatus('idle');
    setErrorMessage(undefined);
    setInputValue('');
  }, [clearTranscript]);

  return (
    <div className="flex flex-col h-screen">
      {/* Header Section - Fixed */}
      <div className="flex-shrink-0 container max-w-4xl mx-auto px-4 pt-8 pb-4">
        <PageTitle>Medical Assistant</PageTitle>
        <p className="text-muted-foreground mt-2">
          Ask me about symptoms, medications, or general health questions
        </p>
      </div>

      {/* Chat Panel - Flexible, Scrollable */}
      <div className="flex-1 min-h-0 container max-w-4xl mx-auto px-4 pb-8">
        <div className="h-full border border-border rounded-lg overflow-hidden bg-card">
          <AssistantPanel
            transcript={transcript}
            status={status}
            errorMessage={errorMessage}
            inputValue={inputValue}
            onInputChange={setInputValue}
            onSendMessage={handleSendMessage}
            onVoiceInput={handleVoiceInput}
            onClearConversation={handleClearConversation}
          />
        </div>
      </div>
    </div>
  );
}
