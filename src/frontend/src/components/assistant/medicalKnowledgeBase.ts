// Local curated medical knowledge base for deterministic responses
// This provides general health information only - not medical diagnosis

export interface MedicalTopic {
  keywords: string[];
  clarifyingQuestions?: string[];
  response: string;
  redFlags?: string[];
}

export const MEDICAL_DISCLAIMER = `
⚠️ IMPORTANT MEDICAL DISCLAIMER:
This information is for educational purposes only and does not constitute medical advice, diagnosis, or treatment. Always consult with a qualified healthcare professional for medical concerns.`;

export const EMERGENCY_GUIDANCE = `
🚨 SEEK IMMEDIATE MEDICAL ATTENTION IF:
• Chest pain or pressure
• Difficulty breathing or shortness of breath
• Sudden severe headache
• Loss of consciousness
• Severe bleeding
• Signs of stroke (facial drooping, arm weakness, speech difficulty)
• Severe allergic reaction
• Suicidal thoughts

Call emergency services (911 in US) or go to the nearest emergency room immediately.`;

export const medicalKnowledgeBase: MedicalTopic[] = [
  {
    keywords: ['headache', 'head pain', 'migraine'],
    clarifyingQuestions: [
      'How long have you had this headache?',
      'On a scale of 1-10, how severe is the pain?',
      'Is it a throbbing, sharp, or dull pain?',
      'Do you have any other symptoms like nausea, vision changes, or sensitivity to light?'
    ],
    response: `Headaches can have many causes:

COMMON TYPES:
• Tension headaches: Dull, aching pain, often from stress or poor posture
• Migraines: Throbbing pain, often with nausea and light sensitivity
• Cluster headaches: Severe pain around one eye
• Sinus headaches: Pressure in forehead/cheeks with congestion

GENERAL MANAGEMENT:
• Rest in a quiet, dark room
• Stay hydrated
• Apply cold or warm compress
• Over-the-counter pain relievers (follow package directions)
• Manage stress and maintain regular sleep schedule

${MEDICAL_DISCLAIMER}`,
    redFlags: [
      'Sudden severe headache ("worst headache of your life")',
      'Headache with fever, stiff neck, confusion, or vision changes',
      'Headache after head injury',
      'New headache pattern in people over 50'
    ]
  },
  {
    keywords: ['fever', 'temperature', 'hot', 'chills'],
    clarifyingQuestions: [
      'What is your temperature reading?',
      'How long have you had the fever?',
      'Do you have any other symptoms (cough, sore throat, body aches)?',
      'Have you been exposed to anyone who is sick?'
    ],
    response: `Fever is your body's natural response to infection or illness.

FEVER RANGES:
• Normal: 97-99°F (36.1-37.2°C)
• Low-grade: 99-100.4°F (37.2-38°C)
• Fever: Above 100.4°F (38°C)
• High fever: Above 103°F (39.4°C)

GENERAL CARE:
• Rest and stay hydrated
• Dress in light clothing
• Take fever-reducing medication if needed (acetaminophen or ibuprofen)
• Monitor temperature regularly
• Cool compress on forehead

WHEN TO SEEK CARE:
• Fever above 103°F (39.4°C)
• Fever lasting more than 3 days
• Fever with severe symptoms
• Infants under 3 months with any fever

${MEDICAL_DISCLAIMER}`,
    redFlags: [
      'Fever with severe headache and stiff neck',
      'Fever with difficulty breathing',
      'Fever with rash',
      'Fever in infants under 3 months'
    ]
  },
  {
    keywords: ['cough', 'coughing', 'throat'],
    clarifyingQuestions: [
      'How long have you had the cough?',
      'Is it a dry cough or are you coughing up mucus?',
      'Do you have other symptoms like fever, shortness of breath, or chest pain?',
      'Does anything make it better or worse?'
    ],
    response: `Coughs can be caused by various conditions:

COMMON CAUSES:
• Viral infections (cold, flu)
• Allergies
• Asthma
• Acid reflux
• Post-nasal drip

GENERAL CARE:
• Stay hydrated (warm liquids can be soothing)
• Use a humidifier
• Honey (for adults and children over 1 year)
• Avoid irritants (smoke, strong odors)
• Rest your voice
• Over-the-counter cough suppressants or expectorants

SEEK MEDICAL CARE IF:
• Cough lasting more than 3 weeks
• Coughing up blood
• High fever
• Difficulty breathing
• Chest pain

${MEDICAL_DISCLAIMER}`,
    redFlags: [
      'Coughing up blood',
      'Severe difficulty breathing',
      'Chest pain with cough',
      'Cough with high fever and confusion'
    ]
  },
  {
    keywords: ['diabetes', 'blood sugar', 'insulin', 'glucose'],
    clarifyingQuestions: [
      'Have you been diagnosed with diabetes?',
      'What are your typical blood sugar levels?',
      'Are you currently taking any diabetes medications?',
      'What specific information about diabetes are you looking for?'
    ],
    response: `Diabetes is a condition affecting blood sugar regulation:

TYPES:
• Type 1: Body doesn't produce insulin
• Type 2: Body doesn't use insulin properly
• Gestational: Develops during pregnancy

KEY MANAGEMENT:
• Regular blood sugar monitoring
• Healthy diet (balanced carbohydrates, fiber-rich foods)
• Regular physical activity
• Medication as prescribed
• Regular check-ups with healthcare provider

HEALTHY HABITS:
• Eat regular meals
• Choose whole grains, vegetables, lean proteins
• Limit sugary foods and drinks
• Stay physically active (aim for 150 min/week)
• Maintain healthy weight
• Monitor feet and eyes regularly

WORK WITH YOUR HEALTHCARE TEAM:
Diabetes management requires personalized care from doctors, dietitians, and diabetes educators.

${MEDICAL_DISCLAIMER}`,
    redFlags: [
      'Very high blood sugar (over 300 mg/dL)',
      'Very low blood sugar (under 70 mg/dL) with confusion',
      'Frequent urination with extreme thirst',
      'Unexplained weight loss'
    ]
  },
  {
    keywords: ['blood pressure', 'hypertension', 'high blood pressure'],
    clarifyingQuestions: [
      'What are your typical blood pressure readings?',
      'Have you been diagnosed with high blood pressure?',
      'Are you currently taking blood pressure medication?',
      'Do you have any symptoms like headaches or dizziness?'
    ],
    response: `Blood pressure measures the force of blood against artery walls:

BLOOD PRESSURE RANGES:
• Normal: Less than 120/80 mmHg
• Elevated: 120-129/<80 mmHg
• High (Stage 1): 130-139/80-89 mmHg
• High (Stage 2): 140+/90+ mmHg
• Hypertensive Crisis: 180+/120+ (seek immediate care)

LIFESTYLE MANAGEMENT:
• Reduce sodium intake (less than 2,300 mg/day)
• Eat potassium-rich foods (bananas, spinach, beans)
• Regular exercise (30 min most days)
• Maintain healthy weight
• Limit alcohol
• Manage stress
• Quit smoking
• Get adequate sleep

MONITORING:
• Check blood pressure regularly
• Keep a log of readings
• Take medications as prescribed
• Regular check-ups with healthcare provider

${MEDICAL_DISCLAIMER}`,
    redFlags: [
      'Blood pressure 180/120 or higher',
      'Severe headache with high blood pressure',
      'Chest pain with high blood pressure',
      'Vision changes with high blood pressure'
    ]
  },
  {
    keywords: ['medication', 'medicine', 'drug', 'pill', 'prescription'],
    clarifyingQuestions: [
      'What medication are you asking about?',
      'Are you currently taking this medication?',
      'Do you have questions about side effects, dosage, or interactions?',
      'Have you discussed this with your pharmacist or doctor?'
    ],
    response: `Medication safety is crucial for effective treatment:

GENERAL MEDICATION SAFETY:
• Take exactly as prescribed
• Don't skip doses or stop without consulting your doctor
• Take at the same time each day if possible
• Store properly (temperature, light, moisture)
• Check expiration dates
• Keep a list of all medications you take

IMPORTANT QUESTIONS TO ASK:
• What is this medication for?
• How and when should I take it?
• What are common side effects?
• What should I avoid (foods, activities, other medications)?
• What if I miss a dose?
• How long will I need to take it?

MEDICATION INTERACTIONS:
• Tell all healthcare providers about ALL medications (including over-the-counter, supplements, herbs)
• Use the same pharmacy when possible
• Ask your pharmacist about interactions

NEVER:
• Share prescription medications
• Take someone else's medication
• Mix medications without consulting a healthcare provider

${MEDICAL_DISCLAIMER}

For specific medication information, always consult your pharmacist or healthcare provider.`,
    redFlags: [
      'Severe allergic reaction (difficulty breathing, swelling)',
      'Severe side effects',
      'Accidental overdose',
      'Medication error'
    ]
  },
  {
    keywords: ['chest pain', 'heart pain', 'cardiac'],
    clarifyingQuestions: [
      'Where exactly is the pain located?',
      'How would you describe the pain (sharp, dull, pressure)?',
      'How long have you had this pain?',
      'Does anything make it better or worse?'
    ],
    response: `⚠️ CHEST PAIN CAN BE SERIOUS - SEEK IMMEDIATE MEDICAL ATTENTION IF:
• Pain or pressure in the chest
• Pain radiating to arm, jaw, or back
• Shortness of breath
• Sweating, nausea, or lightheadedness
• Feeling of impending doom

CALL 911 IMMEDIATELY if you suspect a heart attack.

Chest pain can have many causes, some serious and some not:
• Heart-related (heart attack, angina)
• Lung-related (pneumonia, pulmonary embolism)
• Digestive (acid reflux, heartburn)
• Musculoskeletal (muscle strain, costochondritis)
• Anxiety/panic attacks

DO NOT WAIT - If you're experiencing chest pain, especially with other symptoms, seek immediate medical evaluation.

${MEDICAL_DISCLAIMER}`,
    redFlags: [
      'Any chest pain or pressure',
      'Chest pain with shortness of breath',
      'Chest pain radiating to arm or jaw',
      'Chest pain with sweating or nausea'
    ]
  },
  {
    keywords: ['allergy', 'allergies', 'allergic', 'reaction'],
    clarifyingQuestions: [
      'What are you allergic to?',
      'What symptoms do you experience?',
      'How severe are your reactions?',
      'Do you carry an EpiPen or emergency medication?'
    ],
    response: `Allergies occur when your immune system reacts to a substance:

COMMON ALLERGENS:
• Foods (peanuts, tree nuts, shellfish, eggs, milk)
• Environmental (pollen, dust mites, pet dander, mold)
• Medications (penicillin, aspirin)
• Insect stings

MILD SYMPTOMS:
• Sneezing, runny nose
• Itchy eyes or skin
• Mild rash or hives

MANAGEMENT:
• Avoid known allergens
• Antihistamines for mild symptoms
• Keep environment clean
• Use air filters
• Wash hands frequently

SEVERE ALLERGIC REACTION (ANAPHYLAXIS):
🚨 MEDICAL EMERGENCY - Call 911 if:
• Difficulty breathing or swallowing
• Swelling of face, lips, or throat
• Rapid pulse
• Dizziness or loss of consciousness
• Severe hives or rash

If you have severe allergies:
• Carry an epinephrine auto-injector (EpiPen)
• Wear medical alert bracelet
• Have an allergy action plan
• Inform others of your allergies

${MEDICAL_DISCLAIMER}`,
    redFlags: [
      'Difficulty breathing',
      'Swelling of face, lips, or throat',
      'Rapid pulse with allergic reaction',
      'Dizziness or confusion with allergic reaction'
    ]
  }
];

export function findMedicalTopic(userInput: string): MedicalTopic | null {
  const normalized = userInput.toLowerCase();
  
  for (const topic of medicalKnowledgeBase) {
    for (const keyword of topic.keywords) {
      if (normalized.includes(keyword.toLowerCase())) {
        return topic;
      }
    }
  }
  
  return null;
}

export function needsClarification(userInput: string, conversationHistory: any[]): boolean {
  // Check if this is a very short or vague medical query
  const normalized = userInput.toLowerCase().trim();
  const words = normalized.split(/\s+/);
  
  // If query is very short (1-3 words) and matches a medical topic, ask for clarification
  if (words.length <= 3) {
    const topic = findMedicalTopic(userInput);
    if (topic && topic.clarifyingQuestions) {
      // Check if we've already asked clarifying questions in this conversation
      const recentMessages = conversationHistory.slice(-4);
      const hasAskedQuestions = recentMessages.some(msg => 
        msg.role === 'assistant' && msg.content.includes('?')
      );
      
      // Only ask clarifying questions if we haven't recently
      return !hasAskedQuestions;
    }
  }
  
  return false;
}

export function generateClarifyingResponse(topic: MedicalTopic): string {
  if (!topic.clarifyingQuestions || topic.clarifyingQuestions.length === 0) {
    return topic.response;
  }
  
  const questions = topic.clarifyingQuestions.slice(0, 3).join('\n• ');
  
  return `I'd like to help you better. Could you provide more details?\n\n• ${questions}\n\nThis will help me give you more specific information.`;
}

export function generateMedicalResponse(topic: MedicalTopic): string {
  let response = topic.response;
  
  // Add red flag warnings if present
  if (topic.redFlags && topic.redFlags.length > 0) {
    const redFlagText = topic.redFlags.map(flag => `• ${flag}`).join('\n');
    response = `${EMERGENCY_GUIDANCE}\n\nRED FLAGS - Seek immediate care if:\n${redFlagText}\n\n${response}`;
  }
  
  return response;
}

export function getGeneralHealthResponse(): string {
  return `I can provide general health information on topics like:

• Common symptoms (headaches, fever, cough)
• Chronic conditions (diabetes, high blood pressure)
• Medication safety
• Allergies
• General wellness tips

What would you like to know about?

${MEDICAL_DISCLAIMER}`;
}
