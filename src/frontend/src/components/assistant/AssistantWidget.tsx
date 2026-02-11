import { useState, useCallback } from 'react';
import { useNavigate, useLocation } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { MessageSquare } from 'lucide-react';
import { AssistantPanel } from './AssistantPanel';
import { AssistantStatus } from './assistantTypes';
import { interpretCommand } from './assistantBrain';
import { useAssistantTranscript } from './useAssistantTranscript';
import { getErrorFallbackResponse } from './medicalKnowledgeBase';

export function AssistantWidget() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [status, setStatus] = useState<AssistantStatus>('idle');
  const [errorMessage, setErrorMessage] = useState<string>();
  const [inputValue, setInputValue] = useState('');
  const { transcript, addMessage, clearTranscript } = useAssistantTranscript();

  const handleCommand = useCallback(async (userInput: string) => {
    if (!userInput.trim()) return;

    // Add user message
    addMessage('user', userInput);
    setInputValue('');
    setStatus('processing');
    setErrorMessage(undefined);

    try {
      // Interpret command immediately (no artificial delay)
      const result = interpretCommand(userInput, transcript);

      // Handle navigation
      if (result.type === 'navigation' && result.navigationTarget) {
        addMessage('assistant', result.message);
        setStatus('idle');
        
        // Navigate immediately after adding confirmation message
        setTimeout(() => {
          navigate({ to: result.navigationTarget as '/' | '/signin' | '/home' | '/profile' | '/chat' | '/report' });
          setIsOpen(false);
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
    } catch (error) {
      // On error, add a fallback assistant message and return to idle
      console.error('Error processing command:', error);
      addMessage('assistant', getErrorFallbackResponse());
      setStatus('idle');
    }
  }, [addMessage, navigate, transcript]);

  const handleSendMessage = useCallback(() => {
    handleCommand(inputValue);
  }, [inputValue, handleCommand]);

  const handleVoiceInput = useCallback((text: string) => {
    if (text.trim()) {
      handleCommand(text);
    }
  }, [handleCommand]);

  const handleClearConversation = useCallback(() => {
    clearTranscript();
    setStatus('idle');
    setErrorMessage(undefined);
    setInputValue('');
  }, [clearTranscript]);

  // Don't show widget on /chat page
  if (location.pathname === '/chat') {
    return null;
  }

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button
          size="icon"
          className="fixed bottom-24 right-4 h-14 w-14 rounded-full shadow-lg z-50"
          aria-label="Open voice assistant"
        >
          <MessageSquare className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-full sm:max-w-md p-0 flex flex-col">
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
      </SheetContent>
    </Sheet>
  );
}
