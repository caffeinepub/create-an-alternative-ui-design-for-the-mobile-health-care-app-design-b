import { useState, useEffect, useRef, useCallback } from 'react';

interface SpeechRecognitionEvent extends Event {
  results: SpeechRecognitionResultList;
  resultIndex: number;
}

interface SpeechRecognitionErrorEvent extends Event {
  error: string;
  message: string;
}

interface SpeechRecognitionResult {
  isFinal: boolean;
  [index: number]: SpeechRecognitionAlternative;
}

interface SpeechRecognitionAlternative {
  transcript: string;
  confidence: number;
}

interface SpeechRecognitionResultList {
  length: number;
  item(index: number): SpeechRecognitionResult;
  [index: number]: SpeechRecognitionResult;
}

interface ISpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  start(): void;
  stop(): void;
  abort(): void;
}

declare global {
  interface Window {
    SpeechRecognition?: new () => ISpeechRecognition;
    webkitSpeechRecognition?: new () => ISpeechRecognition;
  }
}

export function useSpeechRecognition() {
  const [isSupported, setIsSupported] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [interimTranscript, setInterimTranscript] = useState('');
  const [error, setError] = useState<string | null>(null);
  const recognitionRef = useRef<ISpeechRecognition | null>(null);

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      setIsSupported(true);
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.lang = 'en-US';

      recognition.addEventListener('result', (event: Event) => {
        const e = event as SpeechRecognitionEvent;
        let interim = '';
        let final = '';

        for (let i = e.resultIndex; i < e.results.length; i++) {
          const result = e.results[i];
          const transcriptText = result[0].transcript;
          if (result.isFinal) {
            final += transcriptText;
          } else {
            interim += transcriptText;
          }
        }

        if (final) {
          setTranscript(final);
          setInterimTranscript('');
        } else {
          setInterimTranscript(interim);
        }
      });

      recognition.addEventListener('error', (event: Event) => {
        const e = event as SpeechRecognitionErrorEvent;
        setIsListening(false);
        if (e.error === 'not-allowed') {
          setError('Microphone permission denied. Please allow microphone access in your browser settings.');
        } else if (e.error === 'no-speech') {
          setError('No speech detected. Please try again.');
        } else {
          setError(`Speech recognition error: ${e.error}`);
        }
      });

      recognition.addEventListener('end', () => {
        setIsListening(false);
      });

      recognitionRef.current = recognition;
    } else {
      setIsSupported(false);
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.abort();
      }
    };
  }, []);

  const start = useCallback(() => {
    if (!recognitionRef.current || !isSupported) {
      setError('Speech recognition is not supported in this browser.');
      return;
    }

    setError(null);
    setTranscript('');
    setInterimTranscript('');
    setIsListening(true);

    try {
      recognitionRef.current.start();
    } catch (err) {
      setIsListening(false);
      setError('Failed to start speech recognition. Please try again.');
    }
  }, [isSupported]);

  const stop = useCallback(() => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    setIsListening(false);
  }, []);

  const reset = useCallback(() => {
    setTranscript('');
    setInterimTranscript('');
    setError(null);
  }, []);

  return {
    isSupported,
    isListening,
    transcript,
    interimTranscript,
    error,
    start,
    stop,
    reset,
  };
}
