import React, { useState, useRef, useCallback } from 'react';
import { MessageCircle, X, Send, Mic, MicOff, Minimize2 } from 'lucide-react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { useNavigate } from '@tanstack/react-router';
import { processUserInput } from './assistantBrain';
import { AssistantPanel } from './AssistantPanel';
import { useSpeechRecognition } from './useSpeechRecognition';
import type { AssistantMessage, SpecialtyFilter } from './assistantTypes';
import { getAllSpecialties } from './specialtyKnowledgeBase';

let msgIdCounter = 0;
function nextId(): string {
  return String(++msgIdCounter);
}

const SPECIALTY_OPTIONS: Array<{ key: SpecialtyFilter; label: string; emoji: string }> = [
  { key: 'autoDetect', label: 'Auto', emoji: '🔍' },
  { key: 'cardiologist', label: 'Cardiology', emoji: '🫀' },
  { key: 'dermatologist', label: 'Dermatology', emoji: '🩹' },
  { key: 'pediatrician', label: 'Pediatrics', emoji: '👶' },
  { key: 'surgeon', label: 'Surgery', emoji: '🔬' },
  { key: 'neurologist', label: 'Neurology', emoji: '🧠' },
  { key: 'generalPractitioner', label: 'General', emoji: '🩺' },
  { key: 'anesthesiologist', label: 'Anesthesia', emoji: '💉' },
  { key: 'oncologist', label: 'Oncology', emoji: '🎗️' },
  { key: 'gynecologist', label: 'Gynecology', emoji: '🌸' },
  { key: 'radiologist', label: 'Radiology', emoji: '🔭' },
];

export function AssistantWidget() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [transcript, setTranscript] = useState<AssistantMessage[]>([]);
  const [input, setInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedSpecialty, setSelectedSpecialty] = useState<SpecialtyFilter>('autoDetect');
  const inputRef = useRef<HTMLInputElement>(null);
  const {
    isListening,
    start,
    stop,
    transcript: speechTranscript,
    isSupported,
  } = useSpeechRecognition();

  // Fill input from speech
  React.useEffect(() => {
    if (speechTranscript) {
      setInput(speechTranscript);
    }
  }, [speechTranscript]);

  const addMessage = useCallback(
    (role: 'user' | 'assistant', content: string, specialty?: string) => {
      const msg: AssistantMessage = {
        id: nextId(),
        role,
        content,
        timestamp: Date.now(),
        confidence: 'high',
        specialty,
      };
      setTranscript((prev) => [...prev, msg]);
      return msg;
    },
    []
  );

  const handleSend = useCallback(
    async (text?: string) => {
      const messageText = (text ?? input).trim();
      if (!messageText || isProcessing) return;

      addMessage('user', messageText);
      setInput('');
      setIsProcessing(true);

      const thinkingDelay = Math.min(600 + messageText.length * 4, 1800);

      setTimeout(() => {
        try {
          const result = processUserInput(messageText, selectedSpecialty);
          const responseText =
            result.message ||
            "I'm here to help! Please try asking a specific health question.";
          addMessage('assistant', responseText, result.specialty);

          if (result.type === 'navigation' && result.navigationTarget) {
            setTimeout(() => {
              setIsOpen(false);
              navigate({ to: result.navigationTarget as string });
            }, 800);
          }
        } catch {
          addMessage(
            'assistant',
            'I encountered an issue. Please try again.',
            'General Practice'
          );
        } finally {
          setIsProcessing(false);
        }
      }, thinkingDelay);
    },
    [input, isProcessing, addMessage, navigate, selectedSpecialty]
  );

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSend();
    }
  };

  const handleVoice = () => {
    if (isListening) stop();
    else start();
  };

  return (
    <>
      {/* Floating Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-primary text-primary-foreground shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200 flex items-center justify-center"
          aria-label="Open Health Assistant"
        >
          <MessageCircle className="w-6 h-6" />
        </button>
      )}

      {/* Sheet Panel */}
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetContent side="right" className="w-full sm:w-[400px] p-0 flex flex-col">
          {/* Header */}
          <SheetHeader className="shrink-0 px-4 py-3 border-b border-border bg-card">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center overflow-hidden shrink-0">
                <img
                  src="/assets/generated/assistant-avatar.dim_64x64.png"
                  alt="Assistant"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const t = e.target as HTMLImageElement;
                    t.style.display = 'none';
                    if (t.parentElement) {
                      t.parentElement.innerHTML =
                        '<span class="text-primary text-xs font-bold">AI</span>';
                    }
                  }}
                />
              </div>
              <div className="flex-1">
                <SheetTitle className="text-sm font-semibold text-left">
                  Health Assistant
                </SheetTitle>
                <p className="text-xs text-muted-foreground text-left">
                  Medical & General Knowledge
                </p>
              </div>
              <div className="flex items-center gap-1">
                {transcript.length > 0 && (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setTranscript([])}
                    className="w-7 h-7 rounded-full text-muted-foreground"
                    title="Clear chat"
                  >
                    <Minimize2 className="w-3.5 h-3.5" />
                  </Button>
                )}
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsOpen(false)}
                  className="w-7 h-7 rounded-full text-muted-foreground"
                >
                  <X className="w-3.5 h-3.5" />
                </Button>
              </div>
            </div>
          </SheetHeader>

          {/* Specialty Selector */}
          <div className="shrink-0 px-3 pt-2 pb-1 border-b border-border bg-background">
            <div className="flex gap-1 overflow-x-auto pb-1 scrollbar-hide">
              {SPECIALTY_OPTIONS.map((opt) => (
                <button
                  key={opt.key}
                  onClick={() => setSelectedSpecialty(opt.key)}
                  className={
                    'shrink-0 flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium transition-colors ' +
                    (selectedSpecialty === opt.key
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-muted-foreground hover:bg-muted/80')
                  }
                  title={opt.label}
                >
                  <span>{opt.emoji}</span>
                  <span>{opt.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Panel */}
          <div className="flex-1 overflow-hidden">
            <AssistantPanel
              transcript={transcript}
              isProcessing={isProcessing}
              onSuggestedPrompt={(p) => handleSend(p)}
            />
          </div>

          {/* Input */}
          <div className="shrink-0 px-3 py-3 border-t border-border bg-background">
            <div className="flex items-center gap-2 bg-muted rounded-xl px-3 py-2 focus-within:ring-1 focus-within:ring-primary/30 transition-all">
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask a health question..."
                className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none"
                disabled={isProcessing}
              />
              <div className="flex items-center gap-1">
                {isSupported && (
                  <button
                    onClick={handleVoice}
                    className={
                      'p-1.5 rounded-full transition-colors ' +
                      (isListening
                        ? 'text-destructive bg-destructive/10'
                        : 'text-muted-foreground hover:text-foreground')
                    }
                  >
                    {isListening ? (
                      <MicOff className="w-3.5 h-3.5" />
                    ) : (
                      <Mic className="w-3.5 h-3.5" />
                    )}
                  </button>
                )}
                <button
                  onClick={() => handleSend()}
                  disabled={!input.trim() || isProcessing}
                  className="p-1.5 rounded-full bg-primary text-primary-foreground disabled:opacity-40 hover:bg-primary/90 transition-colors"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}

export default AssistantWidget;
