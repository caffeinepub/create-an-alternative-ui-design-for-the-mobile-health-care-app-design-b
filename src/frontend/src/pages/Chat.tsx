import { useState } from 'react';
import { AssistantPanel } from '../components/assistant/AssistantPanel';
import { PageTitle } from '../designB/components/DesignBTypography';
import { useRequireAuth } from '../hooks/useRequireAuth';
import { CloseButton } from '../components/CloseButton';
import { useAssistantTranscript } from '../components/assistant/useAssistantTranscript';
import { interpretCommand } from '../components/assistant/assistantBrain';
import type { AssistantStatus } from '../components/assistant/assistantTypes';

export default function Chat() {
  useRequireAuth();

  const { transcript, addMessage, clearTranscript } = useAssistantTranscript();
  const [status, setStatus] = useState<AssistantStatus>('idle');
  const [inputValue, setInputValue] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | undefined>();

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userInput = inputValue.trim();
    setInputValue('');
    setErrorMessage(undefined);

    addMessage('user', userInput);
    setStatus('processing');

    try {
      const result = interpretCommand(userInput);
      addMessage('assistant', result.message || 'I processed your request.');
    } catch (error: any) {
      setErrorMessage(error.message || 'An error occurred');
      addMessage('assistant', 'I apologize, but I encountered an error. Please try again.');
    } finally {
      setStatus('idle');
    }
  };

  const handleVoiceInput = async (text: string, confidence?: 'high' | 'medium' | 'low') => {
    if (!text.trim()) return;

    setErrorMessage(undefined);
    addMessage('user', text, confidence);
    setStatus('processing');

    try {
      const result = interpretCommand(text);
      addMessage('assistant', result.message || 'I processed your request.');
    } catch (error: any) {
      setErrorMessage(error.message || 'An error occurred');
      addMessage('assistant', 'I apologize, but I encountered an error. Please try again.');
    } finally {
      setStatus('idle');
    }
  };

  return (
    <div className="h-[calc(100vh-2rem)] flex flex-col pb-4">
      <CloseButton />
      <div className="mb-4">
        <PageTitle>Medical Assistant</PageTitle>
      </div>
      <div className="flex-1 min-h-0">
        <AssistantPanel
          transcript={transcript}
          status={status}
          errorMessage={errorMessage}
          inputValue={inputValue}
          onInputChange={setInputValue}
          onSendMessage={handleSendMessage}
          onVoiceInput={handleVoiceInput}
          onClearConversation={clearTranscript}
        />
      </div>
    </div>
  );
}
