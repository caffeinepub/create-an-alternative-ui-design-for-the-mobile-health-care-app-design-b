import { getGeneralKnowledgeResponse } from './generalKnowledgeBase';
import { specialtyKnowledgeBase, SpecialtyEntry } from './specialtyKnowledgeBase';
import { medicalKnowledgeBase } from './medicalKnowledgeBase';
import type { CommandResult, SpecialtyFilter } from './assistantTypes';

// ── Emergency detection ──────────────────────────────────────────────────────
const EMERGENCY_KEYWORDS = [
  'chest pain', 'heart attack', 'stroke', "can't breathe", 'cannot breathe',
  'difficulty breathing', 'unconscious', 'unresponsive', 'severe bleeding',
  'overdose', 'suicide', 'kill myself', 'anaphylaxis', 'allergic reaction severe',
  'seizure now', 'convulsion', 'choking', 'drowning', 'poisoning',
  'call 911', 'call ambulance', 'dying', 'severe chest',
  'thunderclap headache', 'sudden severe headache',
  'face drooping', 'arm weakness sudden', 'slurred speech sudden',
];

function detectEmergency(input: string): boolean {
  const lower = input.toLowerCase();
  return EMERGENCY_KEYWORDS.some((kw) => lower.includes(kw));
}

// ── Greeting detection ───────────────────────────────────────────────────────
const GREETING_PATTERNS = [
  /^(hi|hello|hey|good morning|good afternoon|good evening|howdy|greetings)\b/i,
  /^(what can you do|what do you do|how can you help|help me)\b/i,
];

function detectGreeting(input: string): boolean {
  return GREETING_PATTERNS.some((p) => p.test(input.trim()));
}

// ── Thanks detection ─────────────────────────────────────────────────────────
const THANKS_PATTERNS = [
  /\b(thank you|thanks|thank u|thx|ty|appreciate it|great help|helpful)\b/i,
];

function detectThanks(input: string): boolean {
  return THANKS_PATTERNS.some((p) => p.test(input));
}

// ── Help detection ───────────────────────────────────────────────────────────
const HELP_PATTERNS = [
  /\b(help|what can you do|capabilities|features|commands|how do you work)\b/i,
];

function detectHelp(input: string): boolean {
  return HELP_PATTERNS.some((p) => p.test(input));
}

// ── Navigation detection ─────────────────────────────────────────────────────
const NAV_MAP: Record<string, string> = {
  home: '/home',
  dashboard: '/home',
  profile: '/profile',
  reports: '/report',
  report: '/report',
  doctors: '/doctors',
  doctor: '/doctors',
  appointments: '/appointments',
  appointment: '/appointments',
  medications: '/medications',
  medication: '/medications',
  chat: '/chat',
  locate: '/locate',
  location: '/locate',
};

function detectNavigation(input: string): string | null {
  const lower = input.toLowerCase();
  const match = lower.match(
    /(go to|navigate to|open|show me|take me to)\s+(\w+)/
  );
  if (match) {
    const page = match[2];
    return NAV_MAP[page] || null;
  }
  return null;
}

// ── Specialty keyword scoring ────────────────────────────────────────────────
function scoreSpecialty(input: string, entry: SpecialtyEntry): number {
  const lower = input.toLowerCase();
  let score = 0;
  for (const kw of entry.keywords) {
    if (lower.includes(kw.toLowerCase())) {
      score += kw.split(' ').length;
    }
  }
  return score;
}

function detectSpecialty(input: string): SpecialtyEntry | null {
  let bestEntry: SpecialtyEntry | null = null;
  let bestScore = 0;

  for (const entry of Object.values(specialtyKnowledgeBase)) {
    const score = scoreSpecialty(input, entry);
    if (score > bestScore) {
      bestScore = score;
      bestEntry = entry;
    }
  }

  return bestScore > 0 ? bestEntry : null;
}

// ── Medical knowledge base matching ─────────────────────────────────────────
interface MedicalTopicMatch {
  keywords: string[];
  response: string;
}

function findMedicalTopic(input: string): MedicalTopicMatch | null {
  const lower = input.toLowerCase();
  let bestMatch: MedicalTopicMatch | null = null;
  let bestScore = 0;

  for (const topic of medicalKnowledgeBase) {
    let score = 0;
    for (const kw of topic.keywords) {
      if (lower.includes(kw.toLowerCase())) {
        score += kw.split(' ').length;
      }
    }
    if (score > bestScore) {
      bestScore = score;
      bestMatch = topic;
    }
  }

  return bestScore > 0 ? bestMatch : null;
}

// ── Main processor ───────────────────────────────────────────────────────────
export function processUserInput(
  input: string,
  specialtyFilter?: SpecialtyFilter
): CommandResult {
  const trimmed = input.trim();

  if (!trimmed) {
    return {
      type: 'fallback',
      message:
        "I didn't catch that. Please type your question and I'll do my best to help!",
      specialty: 'General Practice',
    };
  }

  // 1. Emergency check — always first
  if (detectEmergency(trimmed)) {
    return {
      type: 'emergency',
      message: [
        '## 🚨 Emergency Alert',
        '',
        '**If this is a life-threatening emergency, call 911 (or your local emergency number) immediately.**',
        '',
        '### Immediate Steps:',
        '- **Call emergency services** right away',
        '- **Stay calm** and follow dispatcher instructions',
        '- **Do not leave** the person alone if possible',
        '- **Clear the area** of hazards',
        '',
        '### Common Emergency Signs:',
        '- Chest pain or pressure',
        '- Difficulty breathing',
        '- Loss of consciousness',
        '- Severe bleeding',
        '- Signs of stroke (face drooping, arm weakness, speech difficulty)',
        '',
        '> ⚠️ This assistant cannot replace emergency medical services. Please call for help immediately.',
      ].join('\n'),
      specialty: 'Emergency',
    };
  }

  // 2. Greeting
  if (detectGreeting(trimmed)) {
    return {
      type: 'greeting',
      message: [
        '## Hello! 👋',
        '',
        "I'm your **Health Assistant** with knowledge across 10 medical specialties. I can help you with:",
        '',
        '- 🫀 **Cardiology** — Heart conditions, arrhythmia, hypertension',
        '- 🩹 **Dermatology** — Skin conditions, rashes, acne, eczema',
        '- 👶 **Pediatrics** — Child health, vaccinations, developmental milestones',
        '- 🔬 **Surgery** — Surgical conditions, wound care, pre/post-op guidance',
        '- 🧠 **Neurology** — Brain & nerve conditions, migraine, seizure, stroke',
        '- 🩺 **General Practice** — Primary care, preventive health, common ailments',
        '- 💉 **Anesthesiology** — Pain management, surgery preparation',
        '- 🎗️ **Oncology** — Cancer symptoms, treatment, screening',
        "- 🌸 **Gynecology** — Women's health, menstrual concerns, pregnancy",
        '- 🔭 **Radiology** — MRI, CT scan, X-ray guidance',
        '',
        '**What would you like to know today?**',
      ].join('\n'),
      specialty: 'General Practice',
    };
  }

  // 3. Thanks
  if (detectThanks(trimmed)) {
    return {
      type: 'thanks',
      message:
        "You're welcome! 😊 Feel free to ask me anything else — whether it's a cardiology question, dermatology concern, pediatric advice, or any other health topic. I'm here to help!",
      specialty: 'General Practice',
    };
  }

  // 4. Help
  if (detectHelp(trimmed)) {
    return {
      type: 'help',
      message: [
        '## What I Can Help With',
        '',
        '### 🏥 Medical Specialties',
        'I have knowledge across 10 medical specialties:',
        '',
        '| Specialty | Example Questions |',
        '|-----------|------------------|',
        '| 🫀 Cardiology | "What are signs of heart problems?" |',
        "| 🩹 Dermatology | \"How do I treat a persistent rash?\" |",
        "| 👶 Pediatrics | \"When should I worry about my child's fever?\" |",
        '| 🔬 Surgery | "What are signs I need surgery?" |',
        '| 🧠 Neurology | "What causes frequent migraines?" |',
        '| 🩺 General Practice | "I need general health checkup advice" |',
        '| 💉 Anesthesiology | "How do I prepare for anesthesia?" |',
        '| 🎗️ Oncology | "What are early cancer warning signs?" |',
        '| 🌸 Gynecology | "Questions about menstrual health" |',
        '| 🔭 Radiology | "When do I need an MRI or CT scan?" |',
        '',
        '### 📋 Report Analysis',
        'Upload a medical report and ask me to analyze it.',
        '',
        '### 🗺️ Navigation',
        'Say things like "go to reports" or "open profile" to navigate the app.',
        '',
        '---',
        "*Just type your question naturally — I'll understand!*",
      ].join('\n'),
      specialty: 'General Practice',
    };
  }

  // 5. Navigation
  const navTarget = detectNavigation(trimmed);
  if (navTarget) {
    const pageName = navTarget.replace('/', '') || 'home';
    return {
      type: 'navigation',
      navigationTarget: navTarget,
      message: 'Navigating you to **' + pageName + '**...',
      specialty: 'General Practice',
    };
  }

  // 6. Specialty filter override — bypass auto-detection
  if (specialtyFilter && specialtyFilter !== 'autoDetect') {
    const entry = specialtyKnowledgeBase[specialtyFilter];
    if (entry) {
      const medTopic = findMedicalTopic(trimmed);
      if (medTopic) {
        return {
          type: 'medical',
          message: medTopic.response,
          specialty: entry.displayName,
        };
      }
      return {
        type: 'medical',
        message: entry.content,
        specialty: entry.displayName,
      };
    }
  }

  // 7. Medical knowledge base (specific topic)
  const medTopic = findMedicalTopic(trimmed);
  if (medTopic) {
    const specialtyEntry = detectSpecialty(trimmed);
    return {
      type: 'medical',
      message: medTopic.response,
      specialty: specialtyEntry ? specialtyEntry.displayName : 'General Practice',
    };
  }

  // 8. Specialty knowledge base (general specialty query)
  const specialtyEntry = detectSpecialty(trimmed);
  if (specialtyEntry) {
    return {
      type: 'medical',
      message: specialtyEntry.content,
      specialty: specialtyEntry.displayName,
    };
  }

  // 9. General knowledge base
  const generalResponse = getGeneralKnowledgeResponse(trimmed);
  if (generalResponse) {
    return {
      type: 'general_knowledge',
      message: generalResponse,
      specialty: 'General Practice',
    };
  }

  // 10. Fallback
  return {
    type: 'fallback',
    message: generateFallbackResponse(trimmed),
    specialty: 'General Practice',
  };
}

function generateFallbackResponse(input: string): string {
  const lower = input.toLowerCase();

  if (lower.includes('pain') || lower.includes('hurt') || lower.includes('ache')) {
    return [
      '## About Pain & Discomfort',
      '',
      "I noticed you mentioned pain. While I don't have specific information about your exact situation, here are some general guidelines:",
      '',
      '### General Advice:',
      "- **Mild pain** — Rest, over-the-counter pain relievers (follow package instructions), and ice/heat therapy may help",
      "- **Persistent pain** — Pain lasting more than a few days warrants a doctor's visit",
      '- **Severe pain** — Seek immediate medical attention',
      '',
      '### Specialty Guidance Available:',
      '- **Chest pain** → Ask about cardiology',
      '- **Headache/migraine** → Ask about neurology',
      '- **Abdominal pain** → Ask about surgery or general practice',
      '- **Back pain** → Ask about neurology or surgery',
      '- **Skin pain/rash** → Ask about dermatology',
      '',
      '### When to See a Doctor:',
      '- Pain that is severe or worsening',
      '- Pain accompanied by fever, swelling, or other symptoms',
      '- Pain that interferes with daily activities',
      '',
      '*Always consult a healthcare professional for personalized medical advice.*',
    ].join('\n');
  }

  if (lower.includes('feel') || lower.includes('sick') || lower.includes('unwell')) {
    return [
      "## Feeling Unwell",
      '',
      "I'm sorry to hear you're not feeling well. Here are some general steps:",
      '',
      '### Immediate Self-Care:',
      '- **Rest** — Your body needs energy to heal',
      '- **Stay hydrated** — Drink plenty of water',
      '- **Monitor symptoms** — Note when they started and any changes',
      '- **Avoid spreading illness** — Wash hands frequently',
      '',
      '### I Can Help With These Specialties:',
      '- 🫀 Heart/chest symptoms → Cardiology',
      '- 🩹 Skin symptoms → Dermatology',
      '- 👶 Child health concerns → Pediatrics',
      '- 🧠 Neurological symptoms → Neurology',
      "- 🌸 Women's health → Gynecology",
      '- 🩺 General symptoms → General Practice',
      '',
      '### When to Seek Medical Care:',
      '- High fever (above 103°F / 39.4°C)',
      '- Difficulty breathing',
      '- Symptoms lasting more than a week',
      '',
      '*Please consult a doctor for proper diagnosis and treatment.*',
    ].join('\n');
  }

  const shortInput = input.length > 50 ? input.substring(0, 50) + '...' : input;

  return [
    "## I'm Here to Help! 🤔",
    '',
    'I didn\'t find specific information about **"' + shortInput + '"**, but I can help with many topics!',
    '',
    '### Browse by Medical Specialty:',
    '',
    '| Specialty | Ask About |',
    '|-----------|-----------|',
    '| 🫀 Cardiology | Heart, chest pain, arrhythmia, blood pressure |',
    '| 🩹 Dermatology | Skin, rash, acne, eczema, moles |',
    '| 👶 Pediatrics | Child health, vaccines, growth, development |',
    '| 🔬 Surgery | Appendicitis, hernia, wound care |',
    '| 🧠 Neurology | Brain, migraine, seizure, numbness, stroke |',
    '| 🩺 General Practice | Fever, cold, flu, checkup, prevention |',
    '| 💉 Anesthesiology | Pain management, surgery preparation |',
    '| 🎗️ Oncology | Cancer symptoms, chemotherapy, screening |',
    "| 🌸 Gynecology | Menstrual health, pregnancy, women's health |",
    '| 🔭 Radiology | MRI, CT scan, X-ray, imaging guidance |',
    '',
    '---',
    "*I'm a knowledge-based assistant. For personalized medical advice, please consult a healthcare professional.*",
  ].join('\n');
}

// Keep legacy export for backward compatibility
export { processUserInput as interpretCommand };
