import { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Card } from '@/components/ui/card';
import { Mic, MicOff, Send, Trash2, Volume2, VolumeX, Loader2 } from 'lucide-react';
import { AssistantMessage, AssistantStatus } from './assistantTypes';
import { useSpeechRecognition } from './useSpeechRecognition';
import { useSpeechSynthesis } from './useSpeechSynthesis';

interface AssistantPanelProps {
  transcript: AssistantMessage[];
  status: AssistantStatus;
  errorMessage?: string;
  inputValue: string;
  onInputChange: (value: string) => void;
  onSendMessage: () => void;
  onVoiceInput: (text: string) => void;
  onClearConversation: () => void;
}

export function AssistantPanel({
  transcript,
  status,
  errorMessage,
  inputValue,
  onInputChange,
  onSendMessage,
  onVoiceInput,
  onClearConversation,
}: AssistantPanelProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const speech = useSpeechRecognition();
  const tts = useSpeechSynthesis();

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [transcript]);

  // Handle final transcript from speech recognition
  useEffect(() => {
    if (speech.transcript && !speech.isListening) {
      onVoiceInput(speech.transcript);
      speech.reset();
    }
  }, [speech.transcript, speech.isListening, onVoiceInput, speech]);

  // Speak assistant responses if TTS is enabled
  useEffect(() => {
    if (transcript.length > 0) {
      const lastMessage = transcript[transcript.length - 1];
      if (lastMessage.role === 'assistant' && tts.isEnabled) {
        tts.speak(lastMessage.content);
      }
    }
  }, [transcript, tts]);

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onSendMessage();
    }
  };

  const getStatusText = () => {
    if (speech.error) return speech.error;
    if (errorMessage) return errorMessage;
    if (status === 'listening') return 'Listening...';
    if (status === 'processing') return 'Processing...';
    if (speech.isListening && speech.interimTranscript) {
      return `Hearing: "${speech.interimTranscript}"`;
    }
    return 'Ready to help! Type or speak your command.';
  };

  const getStatusColor = () => {
    if (speech.error || errorMessage || status === 'error') return 'text-destructive';
    if (status === 'listening' || speech.isListening) return 'text-primary';
    if (status === 'processing') return 'text-muted-foreground';
    return 'text-muted-foreground';
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-lg font-semibold">Voice Assistant</h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClearConversation}
            title="Clear conversation"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
        <p className={`text-sm ${getStatusColor()}`}>
          {getStatusText()}
        </p>
      </div>

      {/* Transcript */}
      <ScrollArea className="flex-1 p-4" ref={scrollRef}>
        <div className="space-y-4">
          {transcript.length === 0 ? (
            <div className="text-center text-muted-foreground py-8">
              <p className="mb-2">👋 Hi! I'm your assistant.</p>
              <p className="text-sm">Try saying "go to home" or "help"</p>
            </div>
          ) : (
            transcript.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <Card
                  className={`max-w-[80%] p-3 ${
                    message.role === 'user'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted'
                  }`}
                >
                  <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                  <p className="text-xs opacity-70 mt-1">
                    {new Date(message.timestamp).toLocaleTimeString()}
                  </p>
                </Card>
              </div>
            ))
          )}
        </div>
      </ScrollArea>

      <Separator />

      {/* Controls */}
      <div className="p-4 space-y-4">
        {/* TTS Toggle */}
        {tts.isSupported && (
          <div className="flex items-center justify-between">
            <Label htmlFor="tts-toggle" className="text-sm flex items-center gap-2">
              {tts.isEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
              Read responses aloud
            </Label>
            <Switch
              id="tts-toggle"
              checked={tts.isEnabled}
              onCheckedChange={tts.toggleEnabled}
            />
          </div>
        )}

        {/* Voice Input Button */}
        {speech.isSupported ? (
          <Button
            variant={speech.isListening ? 'destructive' : 'outline'}
            className="w-full"
            onClick={speech.isListening ? speech.stop : speech.start}
            disabled={status === 'processing'}
          >
            {speech.isListening ? (
              <>
                <MicOff className="mr-2 h-4 w-4" />
                Stop Listening
              </>
            ) : (
              <>
                <Mic className="mr-2 h-4 w-4" />
                Start Voice Input
              </>
            )}
          </Button>
        ) : (
          <div className="text-center text-sm text-muted-foreground p-2 bg-muted rounded">
            Voice input is not available in this browser. Please use the text input below.
          </div>
        )}

        {/* Text Input */}
        <div className="flex gap-2">
          <Input
            placeholder="Type your command..."
            value={inputValue}
            onChange={(e) => onInputChange(e.target.value)}
            onKeyPress={handleKeyPress}
            disabled={status === 'processing'}
          />
          <Button
            onClick={onSendMessage}
            disabled={!inputValue.trim() || status === 'processing'}
            size="icon"
          >
            {status === 'processing' ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Send className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
