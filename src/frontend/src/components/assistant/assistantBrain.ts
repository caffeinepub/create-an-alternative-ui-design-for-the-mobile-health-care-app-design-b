import { CommandResult } from './assistantTypes';
import { 
  findMedicalTopic, 
  needsClarification, 
  generateClarifyingResponse, 
  generateMedicalResponse,
  getGeneralHealthResponse,
  getErrorFallbackResponse,
  EMERGENCY_GUIDANCE
} from './medicalKnowledgeBase';

// Local deterministic command interpreter with medical knowledge
export function interpretCommand(userInput: string, conversationHistory: any[] = []): CommandResult {
  const normalized = userInput.toLowerCase().trim();

  // Report analysis patterns (high priority - check early)
  const reportPatterns = [
    /\b(use|analyze|check|review|look at|explain|interpret)\s+(my\s+)?(report|reports|medical report|test result)/i,
    /\b(what does|explain)\s+(my\s+)?(report|test result)/i,
    /\banalyze\s+(my\s+)?report/i,
    /\breport\s+analysis/i,
  ];

  for (const pattern of reportPatterns) {
    if (pattern.test(normalized)) {
      return {
        type: 'report-list',
        message: '', // Will be populated by the widget/chatbot
        awaitingReportSelection: true,
      };
    }
  }

  // Flutter/.dart detection pattern (high priority - check first)
  const flutterPatterns = [
    /\b(flutter|flitter)\b/i,
    /\.dart\b/i,
    /\bdart\s+(file|extension|code)\b/i,
  ];

  for (const pattern of flutterPatterns) {
    if (pattern.test(normalized)) {
      return {
        type: 'help',
        message: `Flutter/.dart conversion is not supported in this project.\n\nThis application uses:\n• React + TypeScript for the frontend\n• Motoko for the backend (Internet Computer)\n• Tailwind CSS for styling\n\nI can help you:\n1. Build the requested feature in the existing React + TypeScript app\n2. Recreate specific functionality within the current stack\n\nWhat feature or process would you like to implement? I'm here to help you build it in React!`,
      };
    }
  }

  // Navigation patterns (excluding locate/location navigation)
  const navigationPatterns = [
    { pattern: /\b(go to|open|navigate to|take me to|show|visit)\s+(home|dashboard)\b/i, target: '/home', name: 'Home' },
    { pattern: /\b(go to|open|navigate to|take me to|show|visit)\s+(profile|account|settings)\b/i, target: '/profile', name: 'Profile' },
    { pattern: /\b(go to|open|navigate to|take me to|show|visit)\s+(sign in|login|signin)\b/i, target: '/signin', name: 'Sign In' },
    { pattern: /\b(go to|open|navigate to|take me to|show|visit)\s+(welcome|start|beginning|main)\b/i, target: '/', name: 'Welcome' },
    { pattern: /\b(go to|open|navigate to|take me to|show|visit)\s+(chat|chatbot|assistant)\b/i, target: '/chat', name: 'Chatbot' },
    { pattern: /\b(go to|open|navigate to|take me to|show|visit)\s+(report|reports|medical file|medical files)\b/i, target: '/report', name: 'Report' },
    { pattern: /\b(back to|return to)\s+(home|dashboard)\b/i, target: '/home', name: 'Home' },
    { pattern: /\b(back to|return to)\s+(welcome|start)\b/i, target: '/', name: 'Welcome' },
    { pattern: /\bopen\s+(chat|chatbot|assistant)\b/i, target: '/chat', name: 'Chatbot' },
    { pattern: /\bhome\b/i, target: '/home', name: 'Home' },
    { pattern: /\bprofile\b/i, target: '/profile', name: 'Profile' },
  ];

  // Check for navigation commands (but not "report" alone - that's handled above)
  for (const { pattern, target, name } of navigationPatterns) {
    if (pattern.test(normalized)) {
      return {
        type: 'navigation',
        message: `Navigating to ${name}...`,
        navigationTarget: target,
      };
    }
  }

  // Emergency keywords - always show emergency guidance
  const emergencyPatterns = [
    /\b(emergency|urgent|911|ambulance)\b/i,
    /\b(can't breathe|cannot breathe|difficulty breathing)\b/i,
    /\b(chest pain|heart attack)\b/i,
    /\b(severe bleeding|heavy bleeding)\b/i,
    /\b(unconscious|passed out)\b/i,
    /\b(stroke|facial drooping)\b/i,
    /\b(suicidal|want to die|kill myself)\b/i,
  ];

  for (const pattern of emergencyPatterns) {
    if (pattern.test(normalized)) {
      return {
        type: 'medical',
        message: EMERGENCY_GUIDANCE,
      };
    }
  }

  // Medical knowledge patterns
  const medicalPatterns = [
    /\b(symptom|symptoms|feel|feeling|pain|ache|hurt|sick|ill)\b/i,
    /\b(headache|fever|cough|cold|flu|nausea|dizzy|tired)\b/i,
    /\b(diabetes|blood sugar|insulin|glucose)\b/i,
    /\b(blood pressure|hypertension)\b/i,
    /\b(medication|medicine|drug|pill|prescription)\b/i,
    /\b(allergy|allergies|allergic)\b/i,
    /\b(health|medical|doctor|treatment)\b/i,
  ];

  for (const pattern of medicalPatterns) {
    if (pattern.test(normalized)) {
      const topic = findMedicalTopic(userInput);
      
      if (topic) {
        // Check if we need clarification
        if (needsClarification(userInput, conversationHistory)) {
          return {
            type: 'medical',
            message: generateClarifyingResponse(topic),
          };
        }
        
        // Generate full medical response (answer-first, disclaimers at end)
        return {
          type: 'medical',
          message: generateMedicalResponse(topic),
        };
      }
      
      // Medical-sounding but no specific topic match
      return {
        type: 'medical',
        message: getGeneralHealthResponse(),
      };
    }
  }

  // Greeting patterns
  const greetingPatterns = [
    /\b(hello|hi|hey|greetings|good morning|good afternoon|good evening)\b/i,
  ];

  for (const pattern of greetingPatterns) {
    if (pattern.test(normalized)) {
      return {
        type: 'help',
        message: `Hello! I'm your medical assistant. I can help you with:\n\n• Information about common symptoms\n• General health questions\n• Medication safety tips\n• Chronic condition management\n• Analyzing your medical reports\n• When to seek medical care\n\nWhat would you like to know about?`,
      };
    }
  }

  // Help patterns
  const helpPatterns = [
    /\b(help|what can you do|capabilities|commands)\b/i,
  ];

  for (const pattern of helpPatterns) {
    if (pattern.test(normalized)) {
      return {
        type: 'help',
        message: `I'm here to provide general health information. I can help with:\n\n• Common symptoms (headaches, fever, cough, etc.)\n• Chronic conditions (diabetes, blood pressure)\n• Medication safety\n• Allergies\n• Analyzing your medical reports\n• When to seek medical care\n• Navigation (e.g., "go to profile")\n\nJust ask me a question about your health concern!`,
      };
    }
  }

  // Default fallback - treat as potential medical question
  return {
    type: 'help',
    message: `I'm not sure I understood that. I can help with:\n\n• Common symptoms and health concerns\n• Medication information\n• Chronic condition management\n• Analyzing your medical reports\n• General wellness questions\n• Navigation (e.g., "go to home")\n\nCould you rephrase your question or ask about a specific health topic?`,
  };
}
