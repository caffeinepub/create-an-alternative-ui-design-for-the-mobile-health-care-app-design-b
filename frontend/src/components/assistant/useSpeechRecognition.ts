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

export type RecognitionErrorType = 'network' | 'no-speech' | 'aborted' | 'not-allowed' | 'unknown';

export interface RecognitionError {
  type: RecognitionErrorType;
  message: string;
}

export type ConfidenceLevel = 'high' | 'medium' | 'low';

export interface RecognitionResult {
  transcript: string;
  confidence: ConfidenceLevel;
}

export function useSpeechRecognition() {
  const [isSupported, setIsSupported] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [interimTranscript, setInterimTranscript] = useState('');
  const [confidence, setConfidence] = useState<ConfidenceLevel>('high');
  const [error, setError] = useState<RecognitionError | null>(null);
  const [isRetrying, setIsRetrying] = useState(false);
  const recognitionRef = useRef<ISpeechRecognition | null>(null);
  const retryCountRef = useRef(0);
  const maxRetries = 3;
  const retryTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const getConfidenceLevel = (confidenceScore: number): ConfidenceLevel => {
    if (confidenceScore >= 0.8) return 'high';
    if (confidenceScore >= 0.5) return 'medium';
    return 'low';
  };

  const reinitializeRecognition = useCallback(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) return null;

    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.lang = 'en-US';

    recognition.addEventListener('result', (event: Event) => {
      const e = event as SpeechRecognitionEvent;
      let interim = '';
      let final = '';
      let maxConfidence = 1.0;

      for (let i = e.resultIndex; i < e.results.length; i++) {
        const result = e.results[i];
        const transcriptText = result[0].transcript;
        const resultConfidence = result[0].confidence || 1.0;
        
        if (result.isFinal) {
          final += transcriptText;
          maxConfidence = Math.min(maxConfidence, resultConfidence);
        } else {
          interim += transcriptText;
          // Track interim confidence for ambient noise detection
          if (resultConfidence < 0.3) {
            // Very low confidence might indicate noise
            maxConfidence = Math.min(maxConfidence, resultConfidence);
          }
        }
      }

      if (final) {
        setTranscript(final);
        setConfidence(getConfidenceLevel(maxConfidence));
        setInterimTranscript('');
        retryCountRef.current = 0; // Reset retry count on success
      } else {
        setInterimTranscript(interim);
      }
    });

    recognition.addEventListener('error', (event: Event) => {
      const e = event as SpeechRecognitionErrorEvent;
      setIsListening(false);
      
      let errorType: RecognitionErrorType = 'unknown';
      let errorMessage = '';

      switch (e.error) {
        case 'not-allowed':
          errorType = 'not-allowed';
          errorMessage = 'Microphone permission denied. Please allow microphone access in your browser settings.';
          break;
        case 'no-speech':
          errorType = 'no-speech';
          errorMessage = 'No speech detected. Please try again and speak clearly.';
          break;
        case 'aborted':
          errorType = 'aborted';
          errorMessage = 'Speech recognition was aborted. Please try again.';
          break;
        case 'network':
          errorType = 'network';
          errorMessage = 'Network error occurred. Please check your connection and try again.';
          break;
        default:
          errorType = 'unknown';
          errorMessage = `Speech recognition error: ${e.error}`;
      }

      setError({ type: errorType, message: errorMessage });

      // Attempt retry for recoverable errors
      if ((errorType === 'no-speech' || errorType === 'network' || errorType === 'aborted') && 
          retryCountRef.current < maxRetries) {
        retryCountRef.current++;
        setIsRetrying(true);
        
        // Exponential backoff: 1s, 2s, 4s
        const retryDelay = Math.pow(2, retryCountRef.current - 1) * 1000;
        
        retryTimeoutRef.current = setTimeout(() => {
          setIsRetrying(false);
          setError(null);
          if (recognitionRef.current) {
            try {
              recognitionRef.current.start();
              setIsListening(true);
            } catch (err) {
              console.error('Retry failed:', err);
            }
          }
        }, retryDelay);
      }
    });

    recognition.addEventListener('end', () => {
      setIsListening(false);
      setIsRetrying(false);
    });

    return recognition;
  }, []);

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      setIsSupported(true);
      recognitionRef.current = reinitializeRecognition();
    } else {
      setIsSupported(false);
    }

    return () => {
      if (retryTimeoutRef.current) {
        clearTimeout(retryTimeoutRef.current);
      }
      if (recognitionRef.current) {
        recognitionRef.current.abort();
      }
    };
  }, [reinitializeRecognition]);

  const start = useCallback(() => {
    if (!recognitionRef.current || !isSupported) {
      setError({
        type: 'unknown',
        message: 'Speech recognition is not supported in this browser.',
      });
      return;
    }

    setError(null);
    setTranscript('');
    setInterimTranscript('');
    setConfidence('high');
    setIsListening(true);
    retryCountRef.current = 0;

    try {
      recognitionRef.current.start();
    } catch (err) {
      setIsListening(false);
      setError({
        type: 'unknown',
        message: 'Failed to start speech recognition. Please try again.',
      });
    }
  }, [isSupported]);

  const stop = useCallback(() => {
    if (retryTimeoutRef.current) {
      clearTimeout(retryTimeoutRef.current);
      retryTimeoutRef.current = null;
    }
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    setIsListening(false);
    setIsRetrying(false);
  }, []);

  const reset = useCallback(() => {
    setTranscript('');
    setInterimTranscript('');
    setConfidence('high');
    setError(null);
    setIsRetrying(false);
    retryCountRef.current = 0;
  }, []);

  return {
    isSupported,
    isListening,
    transcript,
    interimTranscript,
    confidence,
    error,
    isRetrying,
    start,
    stop,
    reset,
  };
}
