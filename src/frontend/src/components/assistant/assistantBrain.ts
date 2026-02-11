import { CommandResult } from './assistantTypes';
import { 
  findMedicalTopic, 
  needsClarification, 
  generateClarifyingResponse, 
  generateMedicalResponse,
  getGeneralHealthResponse,
  EMERGENCY_GUIDANCE
} from './medicalKnowledgeBase';

// Local deterministic command interpreter with medical knowledge
export function interpretCommand(userInput: string, conversationHistory: any[] = []): CommandResult {
  const normalized = userInput.toLowerCase().trim();

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

  // Navigation patterns (including chatbot navigation)
  const navigationPatterns = [
    { pattern: /\b(go to|open|navigate to|take me to|show|visit)\s+(home|dashboard)\b/i, target: '/home', name: 'Home' },
    { pattern: /\b(go to|open|navigate to|take me to|show|visit)\s+(profile|account|settings)\b/i, target: '/profile', name: 'Profile' },
    { pattern: /\b(go to|open|navigate to|take me to|show|visit)\s+(sign in|login|signin)\b/i, target: '/signin', name: 'Sign In' },
    { pattern: /\b(go to|open|navigate to|take me to|show|visit)\s+(welcome|start|beginning|main)\b/i, target: '/', name: 'Welcome' },
    { pattern: /\b(go to|open|navigate to|take me to|show|visit)\s+(chat|chatbot|assistant)\b/i, target: '/chat', name: 'Chatbot' },
    { pattern: /\b(back to|return to)\s+(home|dashboard)\b/i, target: '/home', name: 'Home' },
    { pattern: /\b(back to|return to)\s+(welcome|start)\b/i, target: '/', name: 'Welcome' },
    { pattern: /\bopen\s+(chat|chatbot|assistant)\b/i, target: '/chat', name: 'Chatbot' },
    { pattern: /\bhome\b/i, target: '/home', name: 'Home' },
    { pattern: /\bprofile\b/i, target: '/profile', name: 'Profile' },
  ];

  // Check for navigation commands
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
        
        // Provide detailed medical response
        return {
          type: 'medical',
          message: generateMedicalResponse(topic),
        };
      }
      
      // General medical query without specific topic match
      return {
        type: 'medical',
        message: getGeneralHealthResponse(),
      };
    }
  }

  // Help patterns
  const helpPatterns = [
    /\b(help|what can you do|commands|how do i|assist)\b/i,
    /\b(what|how)\b.*\b(work|use)\b/i,
  ];

  for (const pattern of helpPatterns) {
    if (pattern.test(normalized)) {
      return {
        type: 'help',
        message: `I'm your medical assistant! I can help you with:

MEDICAL INFORMATION:
• Symptoms and conditions
• Medication information
• General health guidance
• Emergency guidance

NAVIGATION:
• "Go to home" or "Open home"
• "Go to profile" or "Show profile"
• "Open chatbot" or "Go to chat"
• "Back to welcome"

Try asking me about symptoms, medications, or health topics!

⚠️ Remember: This is for informational purposes only. Always consult a healthcare professional for medical advice.`,
      };
    }
  }

  // Greeting patterns
  const greetingPatterns = [
    /\b(hi|hello|hey|greetings)\b/i,
  ];

  for (const pattern of greetingPatterns) {
    if (pattern.test(normalized)) {
      return {
        type: 'help',
        message: `Hello! I'm your medical assistant. I can provide general health information and help you navigate the app.

Ask me about:
• Symptoms (headaches, fever, cough)
• Chronic conditions (diabetes, blood pressure)
• Medications
• Allergies
• General health questions

Or say "help" to see all available commands.

⚠️ This is for informational purposes only. Always consult a healthcare professional.`,
      };
    }
  }

  // Default fallback
  return {
    type: 'unknown',
    message: `I'm not sure how to help with that. I can:

• Provide general health information (ask about symptoms, conditions, medications)
• Navigate you to different pages ("go to home", "open profile", "open chatbot")
• Answer questions about health topics

Try asking a health question or say "help" to see all available commands.`,
  };
}
