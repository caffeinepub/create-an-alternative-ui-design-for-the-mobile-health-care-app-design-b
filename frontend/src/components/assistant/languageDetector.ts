// Language detection utility using character analysis and pattern matching
// No external APIs - fully deterministic client-side detection

export type SupportedLanguage =
  | 'en' | 'fr' | 'es' | 'ar' | 'zh' | 'de' | 'it' | 'pt' | 'ru' | 'ja' | 'ko'
  | 'hi' | 'tr' | 'nl' | 'pl' | 'sv' | 'da' | 'fi' | 'no' | 'id' | 'ms' | 'th' | 'vi';

export interface DetectedLanguage {
  code: SupportedLanguage;
  locale: string; // BCP-47 locale for speech APIs
  name: string;
  confidence: 'high' | 'medium' | 'low';
}

// Character range checks
function hasArabicChars(text: string): boolean {
  return /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF]/.test(text);
}

function hasCJKChars(text: string): boolean {
  return /[\u4E00-\u9FFF\u3400-\u4DBF]/.test(text);
}

function hasJapaneseChars(text: string): boolean {
  return /[\u3040-\u309F\u30A0-\u30FF]/.test(text);
}

function hasKoreanChars(text: string): boolean {
  return /[\uAC00-\uD7AF\u1100-\u11FF]/.test(text);
}

function hasCyrillicChars(text: string): boolean {
  return /[\u0400-\u04FF]/.test(text);
}

function hasDevanagariChars(text: string): boolean {
  return /[\u0900-\u097F]/.test(text);
}

function hasThaiChars(text: string): boolean {
  return /[\u0E00-\u0E7F]/.test(text);
}

// Word-based pattern detection for Latin-script languages
const LANGUAGE_PATTERNS: Record<string, { words: string[]; patterns: RegExp[] }> = {
  fr: {
    words: ['je', 'tu', 'il', 'elle', 'nous', 'vous', 'ils', 'elles', 'le', 'la', 'les', 'un', 'une', 'des', 'du', 'de', 'et', 'est', 'sont', 'avoir', 'être', 'faire', 'aller', 'bonjour', 'merci', 'oui', 'non', 'comment', 'pourquoi', 'quand', 'où', 'qui', 'que', 'quoi', 'avec', 'pour', 'dans', 'sur', 'par', 'mais', 'ou', 'donc', 'car', 'ni', 'or', 'santé', 'médecin', 'maladie', 'douleur', 'symptôme', 'traitement', 'médicament'],
    patterns: [/\b(je|tu|il|elle|nous|vous|ils|elles)\b/i, /\b(le|la|les|un|une|des)\b/i, /[àâäéèêëîïôùûüç]/i],
  },
  es: {
    words: ['yo', 'tú', 'él', 'ella', 'nosotros', 'vosotros', 'ellos', 'ellas', 'el', 'la', 'los', 'las', 'un', 'una', 'unos', 'unas', 'de', 'del', 'al', 'y', 'es', 'son', 'hola', 'gracias', 'sí', 'no', 'cómo', 'por', 'qué', 'cuándo', 'dónde', 'quién', 'con', 'para', 'en', 'que', 'pero', 'salud', 'médico', 'enfermedad', 'dolor', 'síntoma', 'tratamiento', 'medicamento', 'tengo', 'tiene', 'estoy', 'está'],
    patterns: [/\b(yo|tú|él|ella|nosotros|ellos)\b/i, /\b(el|la|los|las|un|una)\b/i, /[áéíóúüñ¿¡]/i],
  },
  de: {
    words: ['ich', 'du', 'er', 'sie', 'es', 'wir', 'ihr', 'der', 'die', 'das', 'ein', 'eine', 'und', 'ist', 'sind', 'haben', 'sein', 'hallo', 'danke', 'ja', 'nein', 'wie', 'warum', 'wann', 'wo', 'wer', 'was', 'mit', 'für', 'in', 'auf', 'aber', 'gesundheit', 'arzt', 'krankheit', 'schmerz', 'symptom', 'behandlung', 'medikament', 'bitte', 'nicht', 'auch', 'noch', 'schon'],
    patterns: [/\b(ich|du|er|sie|wir|ihr)\b/i, /\b(der|die|das|ein|eine)\b/i, /[äöüß]/i],
  },
  it: {
    words: ['io', 'tu', 'lui', 'lei', 'noi', 'voi', 'loro', 'il', 'lo', 'la', 'i', 'gli', 'le', 'un', 'una', 'di', 'del', 'e', 'è', 'sono', 'avere', 'essere', 'ciao', 'grazie', 'sì', 'no', 'come', 'perché', 'quando', 'dove', 'chi', 'che', 'con', 'per', 'in', 'ma', 'salute', 'medico', 'malattia', 'dolore', 'sintomo', 'trattamento', 'farmaco', 'ho', 'ha', 'sto', 'sta'],
    patterns: [/\b(io|tu|lui|lei|noi|voi|loro)\b/i, /\b(il|lo|la|i|gli|le)\b/i, /[àèéìíîòóùú]/i],
  },
  pt: {
    words: ['eu', 'tu', 'ele', 'ela', 'nós', 'vós', 'eles', 'elas', 'o', 'a', 'os', 'as', 'um', 'uma', 'de', 'do', 'da', 'e', 'é', 'são', 'ter', 'ser', 'olá', 'obrigado', 'sim', 'não', 'como', 'por', 'que', 'quando', 'onde', 'quem', 'com', 'para', 'em', 'mas', 'saúde', 'médico', 'doença', 'dor', 'sintoma', 'tratamento', 'medicamento', 'tenho', 'tem', 'estou', 'está'],
    patterns: [/\b(eu|tu|ele|ela|nós|eles)\b/i, /\b(o|a|os|as|um|uma)\b/i, /[ãõáéíóúâêôàç]/i],
  },
  nl: {
    words: ['ik', 'jij', 'hij', 'zij', 'wij', 'jullie', 'de', 'het', 'een', 'en', 'is', 'zijn', 'hebben', 'hallo', 'dank', 'ja', 'nee', 'hoe', 'waarom', 'wanneer', 'waar', 'wie', 'wat', 'met', 'voor', 'in', 'op', 'maar', 'gezondheid', 'dokter', 'ziekte', 'pijn', 'symptoom', 'behandeling', 'medicijn'],
    patterns: [/\b(ik|jij|hij|zij|wij|jullie)\b/i, /\b(de|het|een)\b/i, /[äöüé]/i],
  },
  tr: {
    words: ['ben', 'sen', 'o', 'biz', 'siz', 'onlar', 'bir', 've', 'bu', 'şu', 'o', 'merhaba', 'teşekkür', 'evet', 'hayır', 'nasıl', 'neden', 'ne', 'nerede', 'kim', 'sağlık', 'doktor', 'hastalık', 'ağrı', 'belirti', 'tedavi', 'ilaç', 'var', 'yok', 'için', 'ile'],
    patterns: [/\b(ben|sen|biz|siz|onlar)\b/i, /[ğışöüçİĞŞÖÜÇ]/i],
  },
  id: {
    words: ['saya', 'aku', 'kamu', 'dia', 'kami', 'kita', 'mereka', 'yang', 'dan', 'di', 'ke', 'dari', 'ini', 'itu', 'ada', 'tidak', 'ya', 'halo', 'terima', 'kasih', 'bagaimana', 'mengapa', 'kapan', 'di', 'mana', 'siapa', 'apa', 'dengan', 'untuk', 'kesehatan', 'dokter', 'sakit', 'nyeri', 'gejala', 'pengobatan', 'obat'],
    patterns: [/\b(saya|aku|kamu|kami|kita|mereka)\b/i, /\b(yang|dan|tidak|ada)\b/i],
  },
  vi: {
    words: ['tôi', 'bạn', 'anh', 'chị', 'chúng', 'tôi', 'và', 'là', 'có', 'không', 'xin', 'chào', 'cảm', 'ơn', 'vâng', 'không', 'sức', 'khỏe', 'bác', 'sĩ', 'bệnh', 'đau', 'triệu', 'chứng', 'điều', 'trị', 'thuốc'],
    patterns: [/[àáâãèéêìíòóôõùúýăđơưạảấầẩẫậắằẳẵặẹẻẽếềểễệỉịọỏốồổỗộớờởỡợụủứừửữựỳỵỷỹ]/i],
  },
};

function scoreLanguage(text: string, lang: string): number {
  const config = LANGUAGE_PATTERNS[lang];
  if (!config) return 0;

  const lowerText = text.toLowerCase();
  const words = lowerText.split(/\s+/);
  let score = 0;

  // Word matching
  for (const word of words) {
    if (config.words.includes(word)) {
      score += 2;
    }
  }

  // Pattern matching
  for (const pattern of config.patterns) {
    if (pattern.test(text)) {
      score += 3;
    }
  }

  return score;
}

const LANGUAGE_INFO: Record<SupportedLanguage, { locale: string; name: string }> = {
  en: { locale: 'en-US', name: 'English' },
  fr: { locale: 'fr-FR', name: 'French' },
  es: { locale: 'es-ES', name: 'Spanish' },
  ar: { locale: 'ar-SA', name: 'Arabic' },
  zh: { locale: 'zh-CN', name: 'Chinese' },
  ja: { locale: 'ja-JP', name: 'Japanese' },
  ko: { locale: 'ko-KR', name: 'Korean' },
  de: { locale: 'de-DE', name: 'German' },
  it: { locale: 'it-IT', name: 'Italian' },
  pt: { locale: 'pt-BR', name: 'Portuguese' },
  ru: { locale: 'ru-RU', name: 'Russian' },
  hi: { locale: 'hi-IN', name: 'Hindi' },
  tr: { locale: 'tr-TR', name: 'Turkish' },
  nl: { locale: 'nl-NL', name: 'Dutch' },
  pl: { locale: 'pl-PL', name: 'Polish' },
  sv: { locale: 'sv-SE', name: 'Swedish' },
  da: { locale: 'da-DK', name: 'Danish' },
  fi: { locale: 'fi-FI', name: 'Finnish' },
  no: { locale: 'nb-NO', name: 'Norwegian' },
  id: { locale: 'id-ID', name: 'Indonesian' },
  ms: { locale: 'ms-MY', name: 'Malay' },
  th: { locale: 'th-TH', name: 'Thai' },
  vi: { locale: 'vi-VN', name: 'Vietnamese' },
};

/**
 * Detects the language of the given text.
 * Returns English as fallback if detection is uncertain.
 */
export function detectLanguage(text: string): DetectedLanguage {
  if (!text || text.trim().length < 3) {
    return { code: 'en', locale: 'en-US', name: 'English', confidence: 'low' };
  }

  // Script-based detection (high confidence)
  if (hasArabicChars(text)) {
    return { code: 'ar', locale: 'ar-SA', name: 'Arabic', confidence: 'high' };
  }
  if (hasJapaneseChars(text)) {
    return { code: 'ja', locale: 'ja-JP', name: 'Japanese', confidence: 'high' };
  }
  if (hasKoreanChars(text)) {
    return { code: 'ko', locale: 'ko-KR', name: 'Korean', confidence: 'high' };
  }
  if (hasCJKChars(text)) {
    return { code: 'zh', locale: 'zh-CN', name: 'Chinese', confidence: 'high' };
  }
  if (hasCyrillicChars(text)) {
    return { code: 'ru', locale: 'ru-RU', name: 'Russian', confidence: 'high' };
  }
  if (hasDevanagariChars(text)) {
    return { code: 'hi', locale: 'hi-IN', name: 'Hindi', confidence: 'high' };
  }
  if (hasThaiChars(text)) {
    return { code: 'th', locale: 'th-TH', name: 'Thai', confidence: 'high' };
  }

  // Word/pattern-based detection for Latin-script languages
  const scores: Record<string, number> = {};
  for (const lang of Object.keys(LANGUAGE_PATTERNS)) {
    scores[lang] = scoreLanguage(text, lang);
  }

  const bestLang = Object.entries(scores).sort((a, b) => b[1] - a[1])[0];

  if (bestLang && bestLang[1] >= 3) {
    const code = bestLang[0] as SupportedLanguage;
    const info = LANGUAGE_INFO[code];
    return {
      code,
      locale: info.locale,
      name: info.name,
      confidence: bestLang[1] >= 6 ? 'high' : 'medium',
    };
  }

  // Default to English
  return { code: 'en', locale: 'en-US', name: 'English', confidence: 'low' };
}
