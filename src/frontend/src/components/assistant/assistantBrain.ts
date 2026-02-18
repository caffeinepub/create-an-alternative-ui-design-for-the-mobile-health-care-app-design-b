import { CommandResult } from './assistantTypes';
import { 
  findMedicalTopic, 
  getErrorFallbackResponse,
  EMERGENCY_GUIDANCE
} from './medicalKnowledgeBase';

// Levenshtein distance for fuzzy matching
function levenshteinDistance(str1: string, str2: string): number {
  const len1 = str1.length;
  const len2 = str2.length;
  const matrix: number[][] = [];

  for (let i = 0; i <= len1; i++) {
    matrix[i] = [i];
  }

  for (let j = 0; j <= len2; j++) {
    matrix[0][j] = j;
  }

  for (let i = 1; i <= len1; i++) {
    for (let j = 1; j <= len2; j++) {
      const cost = str1[i - 1] === str2[j - 1] ? 0 : 1;
      matrix[i][j] = Math.min(
        matrix[i - 1][j] + 1,
        matrix[i][j - 1] + 1,
        matrix[i - 1][j - 1] + cost
      );
    }
  }

  return matrix[len1][len2];
}

// Fuzzy match with max distance of 2
function fuzzyMatch(input: string, target: string): boolean {
  if (input === target) return true;
  if (input.includes(target) || target.includes(input)) return true;
  return levenshteinDistance(input.toLowerCase(), target.toLowerCase()) <= 2;
}

// Normalize input
function normalizeInput(input: string): string {
  return input.toLowerCase().trim().replace(/\s+/g, ' ');
}

// Local deterministic command interpreter with medical knowledge
export function interpretCommand(
  userInput: string, 
  conversationHistory: any[] = []
): CommandResult {
  const normalized = normalizeInput(userInput);

  // Report analysis patterns (high priority - check early)
  const reportPatterns = [
    /\b(use|analyze|check|review|look at|explain|interpret|show|view|display|open)\s+(my\s+)?(report|reports|medical report|test result)/i,
    /\b(what does|explain|tell me about)\s+(my\s+)?(report|test result)/i,
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

  // Navigation patterns with expanded synonyms and fuzzy matching
  const navigationCommands = [
    { 
      keywords: ['home', 'dashboard', 'main', 'start'],
      patterns: [
        /\b(go to|open|navigate to|take me to|show|visit|display|view)\s+(home|dashboard|main page|start page)\b/i,
        /\b(back to|return to)\s+(home|dashboard)\b/i,
      ],
      target: '/home',
      name: 'Home'
    },
    { 
      keywords: ['profile', 'account', 'settings', 'proffle', 'profil'],
      patterns: [
        /\b(go to|open|navigate to|take me to|show|visit|display|view)\s+(profile|account|settings|my profile)\b/i,
      ],
      target: '/profile',
      name: 'Profile'
    },
    { 
      keywords: ['signin', 'login', 'sign in', 'log in'],
      patterns: [
        /\b(go to|open|navigate to|take me to|show|visit)\s+(sign in|login|signin|log in)\b/i,
      ],
      target: '/signin',
      name: 'Sign In'
    },
    { 
      keywords: ['welcome', 'start', 'beginning', 'main'],
      patterns: [
        /\b(go to|open|navigate to|take me to|show|visit)\s+(welcome|start|beginning|main)\b/i,
        /\b(back to|return to)\s+(welcome|start)\b/i,
      ],
      target: '/',
      name: 'Welcome'
    },
    { 
      keywords: ['chat', 'chatbot', 'assistant', 'bot'],
      patterns: [
        /\b(go to|open|navigate to|take me to|show|visit)\s+(chat|chatbot|assistant|bot)\b/i,
        /\bopen\s+(chat|chatbot|assistant)\b/i,
      ],
      target: '/chat',
      name: 'Chatbot'
    },
    { 
      keywords: ['report', 'reports', 'medical file', 'medical files', 'reparts', 'repots'],
      patterns: [
        /\b(go to|open|navigate to|take me to|show|visit|display|view)\s+(report|reports|medical file|medical files)\b/i,
      ],
      target: '/report',
      name: 'Reports'
    },
  ];

  // Check navigation with pattern matching and fuzzy matching
  for (const nav of navigationCommands) {
    // First check exact patterns
    for (const pattern of nav.patterns) {
      if (pattern.test(normalized)) {
        return {
          type: 'navigation',
          message: `Navigating to ${nav.name}...`,
          navigationTarget: nav.target,
        };
      }
    }

    // Then try fuzzy matching on keywords
    const words = normalized.split(' ');
    for (const word of words) {
      for (const keyword of nav.keywords) {
        if (fuzzyMatch(word, keyword)) {
          // Check if there's a navigation intent word nearby
          const navIntentWords = ['go', 'open', 'navigate', 'show', 'visit', 'display', 'view', 'take'];
          const hasIntent = words.some(w => navIntentWords.includes(w));
          
          if (hasIntent) {
            return {
              type: 'navigation',
              message: `Navigating to ${nav.name}...`,
              navigationTarget: nav.target,
            };
          }
        }
      }
    }
  }

  // Emergency detection patterns
  const emergencyPatterns = [
    /\b(chest pain|heart attack|can't breathe|difficulty breathing|severe bleeding|unconscious|stroke|suicidal)\b/i,
    /\b(emergency|911|ambulance)\b/i,
  ];

  for (const pattern of emergencyPatterns) {
    if (pattern.test(normalized)) {
      return {
        type: 'medical',
        message: EMERGENCY_GUIDANCE,
      };
    }
  }

  // Medical knowledge lookup with improved pattern matching
  const medicalTopic = findMedicalTopic(normalized);
  
  if (medicalTopic) {
    return {
      type: 'medical',
      message: medicalTopic.content,
    };
  }

  // Check for general health queries
  const generalHealthPatterns = [
    /\b(health|wellness|healthy|stay healthy|be healthy)\b/i,
    /\b(how to be healthy|how to stay healthy|tips for health)\b/i,
    /\b(general health|overall health)\b/i,
  ];

  for (const pattern of generalHealthPatterns) {
    if (pattern.test(normalized)) {
      return {
        type: 'medical',
        message: `**General Health & Wellness Tips:**

Maintaining good health involves several key areas:

**Physical Health:**
• Exercise regularly (150 min/week moderate activity)
• Eat a balanced diet with fruits, vegetables, whole grains
• Get 7-9 hours of quality sleep
• Stay hydrated (8 glasses of water daily)
• Maintain healthy weight
• Avoid smoking and limit alcohol

**Preventive Care:**
• Regular check-ups with healthcare provider
• Stay up-to-date on vaccinations
• Get recommended health screenings
• Practice good hygiene
• Manage chronic conditions

**Mental Health:**
• Manage stress effectively
• Maintain social connections
• Practice relaxation techniques
• Seek help when needed
• Engage in enjoyable activities

**Safety:**
• Wear seatbelts and helmets
• Practice safe behaviors
• Keep emergency contacts accessible

For specific health topics, ask me about:
• Blood pressure, diabetes, cholesterol
• Nutrition, exercise, sleep
• Stress management, mental health
• Pain management, medications

*This is educational information. Always consult your healthcare provider for personalized advice.*`,
      };
    }
  }

  // Help command patterns
  const helpPatterns = [
    /\b(help|what can you do|commands|how to use|guide|instructions)\b/i,
    /^(hi|hello|hey|greetings)$/i,
  ];

  for (const pattern of helpPatterns) {
    if (pattern.test(normalized)) {
      return {
        type: 'help',
        message: `**Welcome! I'm your Medical Assistant.**

I can help you with:

**Medical Information:**
• Blood pressure and heart health
• Diabetes and blood sugar
• Cholesterol management
• Asthma and allergies
• Arthritis and pain management
• Mental health and stress
• Sleep and fatigue
• Immune system health
• Nutrition and exercise
• Medication safety
• Women's health topics
• Common illnesses and conditions

**Report Analysis:**
• Analyze your medical reports
• Explain test results
• Provide educational context

**Navigation:**
• Go to different pages (home, profile, reports, chat)
• Access health tools and features

**Examples:**
• "What is high blood pressure?"
• "Tell me about diabetes management"
• "Analyze my report"
• "Go to my profile"
• "What are the symptoms of asthma?"

*For emergencies, always call 911 immediately.*`,
      };
    }
  }

  // Default fallback
  return {
    type: 'unknown',
    message: `I'm not sure how to help with that. I can assist you with:

• **Medical information** - Ask about conditions like diabetes, blood pressure, heart health, asthma, etc.
• **Report analysis** - Say "analyze my report" to review medical documents
• **Navigation** - Say "go to [page]" to navigate (home, profile, reports, chat)
• **Women's health** - Ask about periods, pregnancy, menopause, PCOS, etc.

Try asking a specific health question or say "help" to see all my capabilities.`,
  };
}
