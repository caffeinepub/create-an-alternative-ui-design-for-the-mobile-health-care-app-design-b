import React, { useRef, useEffect } from 'react';
import { Stethoscope, BookOpen, FileText, Navigation } from 'lucide-react';
import type { AssistantMessage } from './assistantTypes';
import { MessageRenderer } from './MessageRenderer';
import { TypingIndicator } from './TypingIndicator';
import { SuggestedPromptChip } from './SuggestedPromptChip';

interface AssistantPanelProps {
  transcript: AssistantMessage[];
  isProcessing: boolean;
  onSuggestedPrompt?: (prompt: string) => void;
}

const SUGGESTED_PROMPTS = [
  { prompt: 'What are symptoms of diabetes?', icon: '🩺' },
  { prompt: 'How to manage high blood pressure?', icon: '❤️' },
  { prompt: 'Tell me about heart health', icon: '🫀' },
  { prompt: 'How can I improve my sleep?', icon: '😴' },
];

const CAPABILITY_BADGES = [
  { icon: Stethoscope, label: 'Medical', color: 'text-blue-500' },
  { icon: BookOpen, label: 'General Knowledge', color: 'text-green-500' },
  { icon: FileText, label: 'Reports', color: 'text-orange-500' },
  { icon: Navigation, label: 'Navigation', color: 'text-purple-500' },
];

const SPECIALTY_BADGE_COLORS: Record<string, string> = {
  Cardiology: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300',
  Dermatology: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300',
  Pediatrics: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300',
  Surgery: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300',
  Neurology: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300',
  'General Practice': 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300',
  Anesthesiology: 'bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-300',
  Oncology: 'bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-300',
  Gynecology: 'bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-300',
  Radiology: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300',
  Emergency: 'bg-red-200 text-red-800 dark:bg-red-900/50 dark:text-red-200',
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
    SPECIALTY_BADGE_COLORS[specialty] ||
    'bg-muted text-muted-foreground';
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

export function AssistantPanel({
  transcript,
  isProcessing,
  onSuggestedPrompt,
}: AssistantPanelProps) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [transcript, isProcessing]);

  const isEmpty = transcript.length === 0;

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {isEmpty && !isProcessing ? (
        /* Empty / Welcome State */
        <div className="flex-1 overflow-y-auto flex flex-col items-center justify-center px-4 py-6 text-center">
          <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-4 overflow-hidden">
            <img
              src="/assets/generated/assistant-avatar.dim_64x64.png"
              alt="Assistant"
              className="w-full h-full object-cover"
              onError={(e) => {
                const t = e.target as HTMLImageElement;
                t.style.display = 'none';
                if (t.parentElement) {
                  t.parentElement.innerHTML =
                    '<span class="text-primary font-bold">AI</span>';
                }
              }}
            />
          </div>
          <h3 className="font-semibold text-foreground mb-1">
            Health & General Assistant
          </h3>
          <p className="text-xs text-muted-foreground mb-4 max-w-xs leading-relaxed">
            Ask me about medical topics, general knowledge, or navigate the app.
          </p>

          {/* Capability Badges */}
          <div className="flex flex-wrap gap-2 justify-center mb-5">
            {CAPABILITY_BADGES.map(({ icon: Icon, label, color }) => (
              <span
                key={label}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-muted text-xs font-medium text-muted-foreground"
              >
                <Icon className={'w-3 h-3 ' + color} />
                {label}
              </span>
            ))}
          </div>

          {/* Suggested Prompts */}
          {onSuggestedPrompt && (
            <div className="w-full space-y-2">
              {SUGGESTED_PROMPTS.map((item) => (
                <SuggestedPromptChip
                  key={item.prompt}
                  prompt={item.prompt}
                  icon={item.icon}
                  onClick={onSuggestedPrompt}
                />
              ))}
            </div>
          )}
        </div>
      ) : (
        /* Messages */
        <div className="flex-1 overflow-y-auto px-3 py-3 space-y-3">
          {transcript.map((msg) => (
            <div
              key={msg.id ?? msg.timestamp}
              className={
                'flex items-start gap-2 ' +
                (msg.role === 'user' ? 'flex-row-reverse' : 'flex-row')
              }
            >
              {/* Avatar */}
              {msg.role === 'assistant' && (
                <div className="shrink-0 w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center overflow-hidden mt-0.5">
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
                <div className="shrink-0 w-7 h-7 rounded-full bg-primary flex items-center justify-center mt-0.5">
                  <span className="text-primary-foreground text-xs font-bold">
                    U
                  </span>
                </div>
              )}

              {/* Bubble */}
              <div className="flex flex-col max-w-[85%]">
                {/* Specialty badge for assistant messages */}
                {msg.role === 'assistant' && msg.specialty && (
                  <SpecialtyBadge specialty={msg.specialty} />
                )}
                <div
                  className={
                    'rounded-2xl px-3 py-2 ' +
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
                </div>
              </div>
            </div>
          ))}

          {isProcessing && <TypingIndicator />}
          <div ref={bottomRef} />
        </div>
      )}
    </div>
  );
}

export default AssistantPanel;
