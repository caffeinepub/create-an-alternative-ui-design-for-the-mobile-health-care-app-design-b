import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { Send, Mic, MicOff, ArrowLeft, RotateCcw, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { processUserInput } from '../components/assistant/assistantBrain';
import { MessageRenderer } from '../components/assistant/MessageRenderer';
import { TypingIndicator } from '../components/assistant/TypingIndicator';
import { SuggestedPromptChip } from '../components/assistant/SuggestedPromptChip';
import { useSpeechRecognition } from '../components/assistant/useSpeechRecognition';
import type { SpecialtyFilter } from '../components/assistant/assistantTypes';

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  specialty?: string;
}

const SUGGESTED_PROMPTS = [
  { prompt: 'What are the symptoms of diabetes?', icon: '🩺' },
  { prompt: 'How do I manage high blood pressure?', icon: '❤️' },
  { prompt: 'Tell me about heart health', icon: '🫀' },
  { prompt: 'What should I know about cholesterol?', icon: '🔬' },
  { prompt: 'How can I improve my sleep?', icon: '😴' },
  { prompt: 'What foods boost the immune system?', icon: '🥗' },
];

const SPECIALTY_OPTIONS: Array<{ key: SpecialtyFilter; label: string; emoji: string }> = [
  { key: 'autoDetect', label: 'Auto-detect', emoji: '🔍' },
  { key: 'cardiologist', label: 'Cardiology', emoji: '🫀' },
  { key: 'dermatologist', label: 'Dermatology', emoji: '🩹' },
  { key: 'pediatrician', label: 'Pediatrics', emoji: '👶' },
  { key: 'surgeon', label: 'Surgery', emoji: '🔬' },
  { key: 'neurologist', label: 'Neurology', emoji: '🧠' },
  { key: 'generalPractitioner', label: 'General Practice', emoji: '🩺' },
  { key: 'anesthesiologist', label: 'Anesthesiology', emoji: '💉' },
  { key: 'oncologist', label: 'Oncology', emoji: '🎗️' },
  { key: 'gynecologist', label: 'Gynecology', emoji: '🌸' },
  { key: 'radiologist', label: 'Radiology', emoji: '🔭' },
];

const SPECIALTY_BADGE_COLORS: Record<string, string> = {
  Cardiology: 'bg-red-100 text-red-700',
  Dermatology: 'bg-orange-100 text-orange-700',
  Pediatrics: 'bg-yellow-100 text-yellow-700',
  Surgery: 'bg-blue-100 text-blue-700',
  Neurology: 'bg-purple-100 text-purple-700',
  'General Practice': 'bg-green-100 text-green-700',
  Anesthesiology: 'bg-cyan-100 text-cyan-700',
  Oncology: 'bg-pink-100 text-pink-700',
  Gynecology: 'bg-rose-100 text-rose-700',
  Radiology: 'bg-indigo-100 text-indigo-700',
  Emergency: 'bg-red-200 text-red-800',
};

const SPECIALTY_EMOJIS: Record<string, string> = {
  Cardiology: '🫀',
  Dermatology: '🩹',
  Pediatrics: '👶',
  Surgery: '🔬',
  Neurology: '🧠',
  'General Practice': '🩺',
  Anesthesiology: '💉',
  Oncology: '🎗️',
  Gynecology: '🌸',
  Radiology: '🔭',
  Emergency: '🚨',
};

function SpecialtyBadge({ specialty }: { specialty: string }) {
  const colorClass =
    SPECIALTY_BADGE_COLORS[specialty] || 'bg-muted text-muted-foreground';
  const emoji = SPECIALTY_EMOJIS[specialty] || '🏥';
  return (
    <span
      className={
        'inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium mb-1 ' +
        colorClass
      }
    >
      <span>{emoji}</span>
      <span>{specialty}</span>
    </span>
  );
}

export default function Chat() {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [selectedSpecialty, setSelectedSpecialty] = useState<SpecialtyFilter>('autoDetect');
  const [showSpecialtyPicker, setShowSpecialtyPicker] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const { isListening, start, stop, transcript, isSupported } =
    useSpeechRecognition();

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  // Fill input from speech
  useEffect(() => {
    if (transcript) {
      setInput(transcript);
    }
  }, [transcript]);

  const handleSend = useCallback(
    async (text?: string) => {
      const messageText = (text ?? input).trim();
      if (!messageText || isTyping) return;

      const userMessage: ChatMessage = {
        id: 'user-' + Date.now(),
        role: 'user',
        content: messageText,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, userMessage]);
      setInput('');
      setIsTyping(true);
      setShowSpecialtyPicker(false);

      const thinkingDelay = Math.min(800 + messageText.length * 5, 2000);

      setTimeout(() => {
        try {
          const result = processUserInput(messageText, selectedSpecialty);
          const responseText =
            result.message ||
            "I'm here to help! Please try asking a specific health question.";

          const assistantMessage: ChatMessage = {
            id: 'assistant-' + Date.now(),
            role: 'assistant',
            content: responseText,
            timestamp: new Date(),
            specialty: result.specialty,
          };

          setMessages((prev) => [...prev, assistantMessage]);

          // Handle navigation
          if (result.type === 'navigation' && result.navigationTarget) {
            setTimeout(() => {
              navigate({ to: result.navigationTarget as string });
            }, 1000);
          }
        } catch {
          const errorMessage: ChatMessage = {
            id: 'error-' + Date.now(),
            role: 'assistant',
            content:
              'I encountered an issue processing your request. Please try again with a different question.',
            timestamp: new Date(),
            specialty: 'General Practice',
          };
          setMessages((prev) => [...prev, errorMessage]);
        } finally {
          setIsTyping(false);
        }
      }, thinkingDelay);
    },
    [input, isTyping, navigate, selectedSpecialty]
  );

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleVoice = () => {
    if (isListening) {
      stop();
    } else {
      start();
    }
  };

  const handleClear = () => {
    setMessages([]);
    setInput('');
  };

  const selectedOption =
    SPECIALTY_OPTIONS.find((o) => o.key === selectedSpecialty) ||
    SPECIALTY_OPTIONS[0];

  const isEmpty = messages.length === 0;

  return (
    <div className="flex flex-col h-screen bg-background">
      {/* Header */}
      <header className="flex items-center gap-3 px-4 py-3 border-b border-border bg-card/80 backdrop-blur-sm sticky top-0 z-10">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate({ to: '/home' })}
          className="rounded-full"
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div className="flex items-center gap-2.5 flex-1">
          <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center overflow-hidden shrink-0">
            <img
              src="/assets/generated/assistant-avatar.dim_64x64.png"
              alt="Assistant"
              className="w-full h-full object-cover"
              onError={(e) => {
                const t = e.target as HTMLImageElement;
                t.style.display = 'none';
                if (t.parentElement) {
                  t.parentElement.innerHTML =
                    '<span class="text-primary font-bold text-sm">AI</span>';
                }
              }}
            />
          </div>
          <div>
            <h1 className="font-semibold text-sm text-foreground">
              Health Assistant
            </h1>
            <p className="text-xs text-muted-foreground">
              Medical & General Knowledge
            </p>
          </div>
        </div>
        {messages.length > 0 && (
          <Button
            variant="ghost"
            size="icon"
            onClick={handleClear}
            className="rounded-full text-muted-foreground hover:text-foreground"
            title="Clear conversation"
          >
            <RotateCcw className="w-4 h-4" />
          </Button>
        )}
      </header>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto">
        {isEmpty ? (
          /* Welcome / Empty State */
          <div className="flex flex-col items-center justify-center min-h-full px-4 py-8 text-center">
            <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-5 overflow-hidden">
              <img
                src="/assets/generated/assistant-avatar.dim_64x64.png"
                alt="Assistant"
                className="w-full h-full object-cover"
                onError={(e) => {
                  const t = e.target as HTMLImageElement;
                  t.style.display = 'none';
                  if (t.parentElement) {
                    t.parentElement.innerHTML =
                      '<span class="text-primary font-bold text-2xl">AI</span>';
                  }
                }}
              />
            </div>
            <h2 className="text-xl font-bold text-foreground mb-2">
              Health Assistant
            </h2>
            <p className="text-muted-foreground text-sm max-w-sm mb-2 leading-relaxed">
              Ask me anything about health, medical conditions, symptoms, or
              general wellness across 10 medical specialties.
            </p>

            {/* Specialty chips */}
            <div className="flex flex-wrap gap-1.5 justify-center mb-6 max-w-lg">
              {SPECIALTY_OPTIONS.filter((o) => o.key !== 'autoDetect').map(
                (opt) => (
                  <button
                    key={opt.key}
                    onClick={() => {
                      setSelectedSpecialty(opt.key);
                      inputRef.current?.focus();
                    }}
                    className={
                      'flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium transition-colors border ' +
                      (selectedSpecialty === opt.key
                        ? 'bg-primary text-primary-foreground border-primary'
                        : 'bg-background text-muted-foreground border-border hover:border-primary/50 hover:text-foreground')
                    }
                  >
                    <span>{opt.emoji}</span>
                    <span>{opt.label}</span>
                  </button>
                )
              )}
            </div>

            {/* Suggested Prompts */}
            <div className="w-full max-w-lg">
              <p className="text-xs text-muted-foreground mb-3 font-medium uppercase tracking-wide">
                Suggested questions
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {SUGGESTED_PROMPTS.map((item) => (
                  <SuggestedPromptChip
                    key={item.prompt}
                    prompt={item.prompt}
                    icon={item.icon}
                    onClick={(p) => handleSend(p)}
                  />
                ))}
              </div>
            </div>
          </div>
        ) : (
          /* Chat Messages */
          <div className="px-4 py-4 space-y-4 max-w-3xl mx-auto w-full">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={
                  'flex items-start gap-3 ' +
                  (msg.role === 'user' ? 'flex-row-reverse' : 'flex-row')
                }
              >
                {/* Avatar */}
                {msg.role === 'assistant' && (
                  <div className="shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center overflow-hidden mt-0.5">
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
                )}
                {msg.role === 'user' && (
                  <div className="shrink-0 w-8 h-8 rounded-full bg-primary flex items-center justify-center mt-0.5">
                    <span className="text-primary-foreground text-xs font-bold">
                      You
                    </span>
                  </div>
                )}

                {/* Bubble */}
                <div className="flex flex-col max-w-[80%]">
                  {/* Specialty badge for assistant messages */}
                  {msg.role === 'assistant' && msg.specialty && (
                    <SpecialtyBadge specialty={msg.specialty} />
                  )}
                  <div
                    className={
                      'rounded-2xl px-4 py-3 ' +
                      (msg.role === 'user'
                        ? 'bg-primary text-primary-foreground rounded-tr-sm'
                        : 'bg-muted text-foreground rounded-tl-sm')
                    }
                  >
                    {msg.role === 'user' ? (
                      <p className="text-sm leading-relaxed">{msg.content}</p>
                    ) : (
                      <MessageRenderer content={msg.content} />
                    )}
                    <p
                      className={
                        'text-xs mt-1.5 ' +
                        (msg.role === 'user'
                          ? 'text-primary-foreground/60 text-right'
                          : 'text-muted-foreground')
                      }
                    >
                      {msg.timestamp.toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </p>
                  </div>
                </div>
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && <TypingIndicator />}

            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* Input Bar */}
      <div className="sticky bottom-0 bg-background/95 backdrop-blur-sm border-t border-border px-4 py-3">
        <div className="max-w-3xl mx-auto">
          {/* Specialty selector row */}
          <div className="flex items-center gap-2 mb-2">
            <div className="relative">
              <button
                onClick={() => setShowSpecialtyPicker((v) => !v)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-muted text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-muted/80 transition-colors border border-border"
              >
                <span>{selectedOption.emoji}</span>
                <span>{selectedOption.label}</span>
                <ChevronDown className="w-3 h-3" />
              </button>

              {showSpecialtyPicker && (
                <div className="absolute bottom-full left-0 mb-2 bg-card border border-border rounded-xl shadow-lg p-2 z-20 w-56">
                  <p className="text-xs text-muted-foreground px-2 pb-1 font-medium">
                    Select specialty
                  </p>
                  {SPECIALTY_OPTIONS.map((opt) => (
                    <button
                      key={opt.key}
                      onClick={() => {
                        setSelectedSpecialty(opt.key);
                        setShowSpecialtyPicker(false);
                      }}
                      className={
                        'w-full flex items-center gap-2 px-2 py-1.5 rounded-lg text-sm transition-colors ' +
                        (selectedSpecialty === opt.key
                          ? 'bg-primary/10 text-primary font-medium'
                          : 'text-foreground hover:bg-muted')
                      }
                    >
                      <span>{opt.emoji}</span>
                      <span>{opt.label}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
            <span className="text-xs text-muted-foreground">
              {selectedSpecialty === 'autoDetect'
                ? 'Specialty auto-detected from your question'
                : `Directing to ${selectedOption.label}`}
            </span>
          </div>

          <div className="flex items-end gap-2 bg-card border border-border rounded-2xl px-3 py-2 shadow-sm focus-within:border-primary/50 focus-within:ring-1 focus-within:ring-primary/20 transition-all">
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask a health question..."
              rows={1}
              className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground resize-none outline-none py-1.5 max-h-32 leading-relaxed"
              style={{ minHeight: '36px' }}
              onInput={(e) => {
                const target = e.target as HTMLTextAreaElement;
                target.style.height = 'auto';
                target.style.height =
                  Math.min(target.scrollHeight, 128) + 'px';
              }}
              disabled={isTyping}
            />
            <div className="flex items-center gap-1 pb-0.5">
              {isSupported && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleVoice}
                  className={
                    'rounded-full w-8 h-8 shrink-0 ' +
                    (isListening
                      ? 'text-destructive bg-destructive/10'
                      : 'text-muted-foreground hover:text-foreground')
                  }
                  title={isListening ? 'Stop listening' : 'Voice input'}
                >
                  {isListening ? (
                    <MicOff className="w-4 h-4" />
                  ) : (
                    <Mic className="w-4 h-4" />
                  )}
                </Button>
              )}
              <Button
                onClick={() => handleSend()}
                disabled={!input.trim() || isTyping}
                size="icon"
                className="rounded-full w-8 h-8 shrink-0"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
          <p className="text-xs text-muted-foreground text-center mt-2">
            For medical emergencies, call 911. This assistant provides general
            information only.
          </p>
        </div>
      </div>
    </div>
  );
}
