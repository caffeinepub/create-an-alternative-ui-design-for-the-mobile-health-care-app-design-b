import { CommandResult } from './assistantTypes';

// Local deterministic command interpreter
export function interpretCommand(userInput: string): CommandResult {
  const normalized = userInput.toLowerCase().trim();

  // Navigation patterns
  const navigationPatterns = [
    { pattern: /\b(go to|open|navigate to|take me to|show|visit)\s+(home|dashboard)\b/i, target: '/home', name: 'Home' },
    { pattern: /\b(go to|open|navigate to|take me to|show|visit)\s+(profile|account|settings)\b/i, target: '/profile', name: 'Profile' },
    { pattern: /\b(go to|open|navigate to|take me to|show|visit)\s+(sign in|login|signin)\b/i, target: '/signin', name: 'Sign In' },
    { pattern: /\b(go to|open|navigate to|take me to|show|visit)\s+(welcome|start|beginning|main)\b/i, target: '/', name: 'Welcome' },
    { pattern: /\b(back to|return to)\s+(home|dashboard)\b/i, target: '/home', name: 'Home' },
    { pattern: /\b(back to|return to)\s+(welcome|start)\b/i, target: '/', name: 'Welcome' },
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

  // Help patterns
  const helpPatterns = [
    /\b(help|what can you do|commands|how do i|assist)\b/i,
    /\b(what|how)\b.*\b(work|use)\b/i,
  ];

  for (const pattern of helpPatterns) {
    if (pattern.test(normalized)) {
      return {
        type: 'help',
        message: `I can help you navigate the app! Try saying:\n\n• "Go to home" or "Open home"\n• "Go to profile" or "Show profile"\n• "Go to sign in"\n• "Back to welcome"\n\nYou can also type these commands or ask me for help anytime.`,
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
        message: `Hello! I'm your HealthCare assistant. I can help you navigate the app. Try saying "go to home" or "open profile". Say "help" to see all available commands.`,
      };
    }
  }

  // Default fallback
  return {
    type: 'unknown',
    message: `I'm not sure how to help with that. I can navigate you to different pages in the app. Try:\n\n• "Go to home"\n• "Open profile"\n• "Go to sign in"\n• "Back to welcome"\n\nSay "help" to see all available commands.`,
  };
}
