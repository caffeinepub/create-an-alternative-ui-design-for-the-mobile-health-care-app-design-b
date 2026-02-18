// Local curated medical knowledge base for common health topics

export interface MedicalTopic {
  id: string;
  keywords: string[];
  title: string;
  content: string;
  relatedTopics?: string[];
}

export const EMERGENCY_GUIDANCE = `🚨 **EMERGENCY - CALL 911 IMMEDIATELY**

If you or someone else is experiencing:
• Chest pain or pressure
• Difficulty breathing
• Severe bleeding
• Loss of consciousness
• Signs of stroke (facial drooping, arm weakness, speech difficulty)
• Suicidal thoughts

**DO NOT WAIT - CALL 911 NOW**

This assistant is for informational purposes only and cannot provide emergency medical care.`;

export function getErrorFallbackResponse(): string {
  return `I apologize, but I encountered an error processing your request. Please try again or rephrase your question.

If you need immediate medical assistance, please call 911 or visit your nearest emergency room.

I can help you with:
• Medical information (blood pressure, diabetes, heart health, etc.)
• Women's health topics (periods, pregnancy, menopause, etc.)
• Report analysis
• Navigation

What would you like to know about?`;
}

const medicalTopics: MedicalTopic[] = [
  {
    id: 'blood-pressure',
    keywords: ['blood pressure', 'bp', 'hypertension', 'pressure reading', 'high pressure', 'low pressure', 'systolic', 'diastolic', 'hypotension'],
    title: 'Blood Pressure',
    content: `**📊 PROBLEM INFORMATION:**

**What is Blood Pressure?**
Blood pressure measures the force of blood against artery walls. It's recorded as two numbers:
• **Systolic** (top number): Pressure when heart beats
• **Diastolic** (bottom number): Pressure when heart rests

**Symptoms of High Blood Pressure:**
• Often no symptoms ("silent killer")
• Severe headaches
• Nosebleeds
• Shortness of breath
• Chest pain
• Vision problems
• Dizziness

**Symptoms of Low Blood Pressure:**
• Dizziness or lightheadedness
• Fainting
• Blurred vision
• Nausea
• Fatigue
• Lack of concentration

**Causes & Risk Factors:**
• Family history
• Age (risk increases with age)
• Obesity
• Lack of physical activity
• High sodium diet
• Excessive alcohol consumption
• Stress
• Chronic conditions (kidney disease, diabetes)
• Certain medications

**Normal Ranges:**
• Normal: Less than 120/80 mmHg
• Elevated: 120-129/<80 mmHg
• High (Stage 1): 130-139/80-89 mmHg
• High (Stage 2): 140+/90+ mmHg

---

**🛡️ PRECAUTIONS & PREVENTIVE MEASURES:**

**Dietary Precautions:**
• Reduce sodium intake (less than 2,300mg/day, ideally 1,500mg)
• Limit processed and packaged foods
• Avoid adding salt to meals
• Read nutrition labels carefully
• Limit caffeine intake
• Reduce alcohol consumption

**Lifestyle Modifications:**
• Exercise regularly (30 minutes/day, 5 days/week)
• Maintain healthy weight (BMI 18.5-24.9)
• Quit smoking immediately
• Manage stress through relaxation techniques
• Get 7-9 hours of quality sleep
• Monitor blood pressure regularly at home

**Medical Precautions:**
• Take prescribed medications exactly as directed
• Never stop medications without consulting doctor
• Keep all follow-up appointments
• Report side effects to healthcare provider
• Carry medication list with you
• Check blood pressure before taking medications

**Daily Monitoring:**
• Check blood pressure at same time daily
• Keep a log of readings
• Note any symptoms or unusual readings
• Share log with healthcare provider

---

**⚠️ WHEN TO SEEK EMERGENCY CARE:**
• Blood pressure above 180/120 (hypertensive crisis)
• Severe headache with confusion
• Chest pain or shortness of breath
• Severe anxiety or sense of doom
• Vision changes or blurred vision
• Nosebleeds with high BP reading

*This is educational information. Consult your healthcare provider for personalized advice.*`,
    relatedTopics: ['heart-health', 'cholesterol'],
  },
  {
    id: 'diabetes',
    keywords: ['diabetes', 'blood sugar', 'glucose', 'insulin', 'diabetic', 'sugar level', 'a1c', 'hemoglobin a1c', 'type 1', 'type 2', 'prediabetes'],
    title: 'Diabetes',
    content: `**📊 PROBLEM INFORMATION:**

**What is Diabetes?**
Diabetes is a chronic condition affecting how your body processes blood sugar (glucose). There are two main types:

**Type 1 Diabetes:**
• Body doesn't produce insulin
• Usually diagnosed in children/young adults
• Autoimmune condition
• Requires insulin therapy for life

**Type 2 Diabetes:**
• Body doesn't use insulin properly (insulin resistance)
• Most common type (90-95% of cases)
• Often develops in adults over 45
• Often manageable with lifestyle changes and medication

**Symptoms:**
• Increased thirst and frequent urination
• Extreme hunger
• Unexplained weight loss
• Fatigue and weakness
• Blurred vision
• Slow-healing sores or frequent infections
• Tingling or numbness in hands/feet
• Darkened skin areas (neck, armpits)

**Causes & Risk Factors:**
• Family history of diabetes
• Overweight or obesity
• Physical inactivity
• Age (45 or older)
• Prediabetes
• Gestational diabetes history
• Polycystic ovary syndrome (PCOS)
• High blood pressure
• Abnormal cholesterol levels

**Blood Sugar Levels:**
• Normal fasting: 70-100 mg/dL
• Prediabetes: 100-125 mg/dL
• Diabetes: 126+ mg/dL (fasting)
• A1C Normal: Below 5.7%
• A1C Prediabetes: 5.7-6.4%
• A1C Diabetes: 6.5% or higher

---

**🛡️ PRECAUTIONS & PREVENTIVE MEASURES:**

**Blood Sugar Monitoring:**
• Check blood sugar as prescribed (before meals, bedtime)
• Keep a detailed log of readings
• Note food, activity, and medication timing
• Recognize patterns and trends
• Report concerning readings to doctor

**Dietary Precautions:**
• Follow a consistent meal schedule
• Count carbohydrates carefully
• Choose complex carbs over simple sugars
• Include fiber-rich foods
• Limit sugary drinks and desserts
• Control portion sizes
• Avoid skipping meals
• Read food labels for hidden sugars

**Medication Management:**
• Take medications exactly as prescribed
• Never skip insulin doses
• Store insulin properly (refrigerate unopened)
• Rotate injection sites
• Check expiration dates
• Carry fast-acting glucose for emergencies
• Wear medical ID bracelet

**Lifestyle Precautions:**
• Exercise regularly (check blood sugar before/after)
• Maintain healthy weight
• Inspect feet daily for cuts or sores
• Wear proper footwear
• Practice good dental hygiene
• Get annual eye exams
• Monitor blood pressure and cholesterol
• Avoid smoking and limit alcohol

**Hypoglycemia Prevention:**
• Recognize early warning signs (shakiness, sweating, confusion)
• Always carry fast-acting carbs (glucose tablets, juice)
• Don't exercise on empty stomach
• Adjust insulin for physical activity
• Teach family/friends about emergency response

**Sick Day Management:**
• Continue taking diabetes medications
• Check blood sugar more frequently
• Stay hydrated
• Have sick-day meal plan ready
• Know when to call doctor

---

**⚠️ WHEN TO SEEK EMERGENCY CARE:**
• Blood sugar below 70 mg/dL that won't rise
• Blood sugar above 300 mg/dL
• Confusion or loss of consciousness
• Severe nausea or vomiting
• Fruity-smelling breath
• Difficulty breathing
• Chest pain

*Always consult your doctor for diagnosis and treatment plans.*`,
    relatedTopics: ['nutrition', 'exercise'],
  },
  {
    id: 'cholesterol',
    keywords: ['cholesterol', 'ldl', 'hdl', 'triglycerides', 'lipids', 'lipid panel', 'good cholesterol', 'bad cholesterol', 'high cholesterol', 'hyperlipidemia'],
    title: 'Cholesterol',
    content: `**📊 PROBLEM INFORMATION:**

**What is Cholesterol?**
Cholesterol is a waxy, fat-like substance in your blood. Your body needs it for building cells, but too much can be harmful.

**Types of Cholesterol:**
• **LDL (Bad Cholesterol)**: Can build up in arteries, causing blockages
• **HDL (Good Cholesterol)**: Helps remove LDL from bloodstream
• **Triglycerides**: Another type of fat in blood that can increase heart disease risk

**Symptoms:**
• Usually no symptoms (detected through blood test)
• High cholesterol can lead to:
  - Chest pain (angina)
  - Heart attack
  - Stroke
  - Peripheral artery disease

**Causes & Risk Factors:**
• Poor diet (saturated and trans fats)
• Obesity
• Lack of exercise
• Smoking
• Age (risk increases with age)
• Family history
• Diabetes
• Kidney disease
• Hypothyroidism
• Certain medications

**Healthy Levels (mg/dL):**
• Total Cholesterol: Less than 200
• LDL: Less than 100 (optimal)
• HDL: 60 or higher (protective)
• Triglycerides: Less than 150

**Borderline/High Levels:**
• Total: 200-239 (borderline), 240+ (high)
• LDL: 130-159 (borderline), 160+ (high)
• HDL: Below 40 (men) or 50 (women) is low
• Triglycerides: 150-199 (borderline), 200+ (high)

---

**🛡️ PRECAUTIONS & PREVENTIVE MEASURES:**

**Dietary Precautions:**
• Eliminate trans fats completely
• Reduce saturated fats (less than 6% of daily calories)
• Increase omega-3 fatty acids (fish, flaxseed)
• Eat more soluble fiber (oats, beans, apples)
• Choose lean proteins
• Limit dietary cholesterol (less than 300mg/day)
• Avoid fried and processed foods
• Read nutrition labels carefully

**Heart-Healthy Foods to Include:**
• Oats and whole grains
• Nuts (almonds, walnuts) - 1 handful daily
• Fatty fish (salmon, mackerel) - 2 servings/week
• Olive oil and avocados
• Fruits and vegetables (5+ servings daily)
• Legumes (beans, lentils)
• Soy products

**Foods to Avoid:**
• Fast food and fried foods
• Processed meats (bacon, sausage)
• Full-fat dairy products
• Baked goods with trans fats
• Sugary snacks and beverages
• Excessive red meat

**Lifestyle Modifications:**
• Exercise regularly (30 min/day, 5 days/week)
• Maintain healthy weight (lose 5-10% if overweight)
• Quit smoking immediately
• Limit alcohol (1 drink/day for women, 2 for men)
• Manage stress effectively
• Get adequate sleep (7-9 hours)

**Medication Precautions:**
• Take statins as prescribed (usually at bedtime)
• Report muscle pain or weakness immediately
• Don't stop medications without consulting doctor
• Avoid grapefruit juice with certain statins
• Get liver function tests as recommended
• Take with or without food as directed

**Monitoring:**
• Get lipid panel every 4-6 years (if normal)
• More frequent testing if high cholesterol
• Track progress with lifestyle changes
• Keep records of all test results
• Share results with all healthcare providers

---

**⚠️ WHEN TO SEEK EMERGENCY CARE:**
• Chest pain or pressure
• Shortness of breath
• Pain in arms, back, neck, or jaw
• Sudden severe headache
• Difficulty speaking or understanding
• Sudden numbness or weakness

*Consult your healthcare provider for personalized cholesterol management.*`,
    relatedTopics: ['heart-health', 'nutrition'],
  },
  {
    id: 'heart-health',
    keywords: ['heart', 'cardiac', 'cardiovascular', 'heart disease', 'heart attack', 'coronary', 'heart health', 'angina', 'arrhythmia', 'palpitations'],
    title: 'Heart Health & Cardiovascular Disease',
    content: `**📊 PROBLEM INFORMATION:**

**Understanding Heart Disease:**
Heart disease refers to several conditions affecting the heart and blood vessels, including coronary artery disease, heart failure, and arrhythmias.

**Common Heart Conditions:**
• **Coronary Artery Disease**: Narrowed or blocked arteries
• **Heart Attack**: Blood flow to heart blocked
• **Heart Failure**: Heart can't pump effectively
• **Arrhythmia**: Irregular heartbeat
• **Valve Disease**: Heart valves don't work properly

**Symptoms of Heart Problems:**
• Chest pain or discomfort (pressure, squeezing)
• Shortness of breath
• Pain in arms, back, neck, jaw, or stomach
• Lightheadedness or dizziness
• Rapid or irregular heartbeat
• Fatigue or weakness
• Swelling in legs, ankles, or feet
• Persistent cough or wheezing

**Risk Factors:**
• High blood pressure
• High cholesterol
• Diabetes
• Smoking
• Obesity
• Physical inactivity
• Family history
• Age (men 45+, women 55+)
• Stress
• Unhealthy diet
• Excessive alcohol

---

**🛡️ PRECAUTIONS & PREVENTIVE MEASURES:**

**Key Prevention Strategies:**
• **Blood Pressure**: Keep below 120/80 mmHg
• **Cholesterol**: Maintain healthy levels
• **Blood Sugar**: Control diabetes if present
• **Weight**: Maintain healthy BMI (18.5-24.9)
• **Physical Activity**: 150 min/week moderate exercise
• **Diet**: Heart-healthy eating pattern
• **No Smoking**: Quit or never start

**Dietary Precautions:**
• Follow Mediterranean or DASH diet
• Eat plenty of fruits and vegetables (5+ servings)
• Choose whole grains over refined
• Include lean proteins (fish, poultry, beans)
• Limit saturated fats (less than 6% calories)
• Reduce sodium (less than 2,300mg/day)
• Limit added sugars
• Control portion sizes
• Avoid trans fats completely

**Exercise Precautions:**
• Start slowly if inactive
• Warm up before exercise
• Cool down and stretch after
• Stop if chest pain or severe shortness of breath
• Avoid extreme temperatures
• Stay hydrated
• Don't exercise right after large meals
• Carry emergency contact information

**Lifestyle Modifications:**
• Quit smoking immediately (reduces risk by 50% in 1 year)
• Limit alcohol (1 drink/day women, 2 men)
• Manage stress (meditation, yoga, deep breathing)
• Get adequate sleep (7-9 hours)
• Maintain social connections
• Regular health screenings

**Medication Management:**
• Take all medications as prescribed
• Don't skip doses
• Know medication names and purposes
• Report side effects promptly
• Carry medication list
• Use pill organizer
• Set reminders for doses
• Refill prescriptions on time

**Daily Heart-Healthy Habits:**
• Monitor blood pressure at home
• Check weight regularly
• Track symptoms in journal
• Practice stress reduction daily
• Stay physically active
• Eat breakfast daily
• Limit screen time
• Practice good sleep hygiene

**Warning Signs to Monitor:**
• New or worsening chest discomfort
• Increased shortness of breath
• Unusual fatigue
• Swelling in legs or abdomen
• Rapid weight gain (2-3 lbs in 1 day)
• Persistent cough
• Irregular heartbeat

---

**⚠️ WHEN TO SEEK EMERGENCY CARE (CALL 911):**
• Chest pain or pressure lasting more than 5 minutes
• Shortness of breath with chest discomfort
• Pain spreading to arms, back, neck, jaw
• Sudden severe headache
• Sudden weakness or numbness
• Difficulty speaking
• Loss of consciousness
• Rapid or irregular heartbeat with dizziness

**Heart Attack Warning Signs:**
• Chest discomfort (pressure, squeezing, fullness)
• Upper body discomfort
• Shortness of breath
• Cold sweat
• Nausea or lightheadedness
• Women may have atypical symptoms (fatigue, jaw pain)

*Work with your healthcare provider to create a personalized heart health plan.*`,
    relatedTopics: ['blood-pressure', 'cholesterol', 'exercise'],
  },
  {
    id: 'asthma',
    keywords: ['asthma', 'wheezing', 'breathing problems', 'inhaler', 'bronchial', 'respiratory', 'shortness of breath', 'asthma attack'],
    title: 'Asthma',
    content: `**📊 PROBLEM INFORMATION:**

**What is Asthma?**
Asthma is a chronic respiratory condition where airways become inflamed and narrowed, making breathing difficult.

**Symptoms:**
• Shortness of breath
• Chest tightness or pain
• Wheezing (whistling sound when breathing)
• Coughing, especially at night or early morning
• Difficulty sleeping due to breathing problems
• Rapid breathing
• Fatigue during physical activity

**Common Triggers:**
• Allergens (pollen, dust mites, pet dander, mold)
• Air pollutants and smoke
• Respiratory infections (colds, flu)
• Physical activity (exercise-induced)
• Cold air or weather changes
• Strong emotions or stress
• Certain medications (aspirin, beta-blockers)
• Food preservatives (sulfites)
• Gastroesophageal reflux disease (GERD)

**Types of Asthma:**
• Allergic asthma (triggered by allergens)
• Non-allergic asthma (triggered by stress, exercise, cold air)
• Exercise-induced asthma
• Occupational asthma (workplace triggers)
• Childhood asthma

**Risk Factors:**
• Family history of asthma or allergies
• Having allergies
• Being overweight
• Smoking or exposure to secondhand smoke
• Exposure to pollution or occupational triggers

---

**🛡️ PRECAUTIONS & PREVENTIVE MEASURES:**

**Trigger Avoidance:**
• Identify and avoid personal triggers
• Keep home clean and dust-free
• Use allergen-proof bedding covers
• Wash bedding weekly in hot water
• Keep humidity below 50%
• Use air purifiers with HEPA filters
• Avoid outdoor activity during high pollen days
• Stay indoors during poor air quality
• Avoid smoke and strong odors

**Medication Management:**
• Use controller medications daily as prescribed
• Carry rescue inhaler at all times
• Know the difference between controller and rescue medications
• Use inhaler with proper technique
• Rinse mouth after using corticosteroid inhalers
• Track medication usage
• Refill prescriptions before running out
• Don't overuse rescue inhaler (more than 2x/week indicates poor control)

**Asthma Action Plan:**
• Work with doctor to create written plan
• Know your zones (green, yellow, red)
• Understand when to adjust medications
• Know when to seek emergency care
• Share plan with family, school, workplace
• Review and update plan regularly

**Lifestyle Precautions:**
• Exercise regularly (with proper precautions)
• Warm up before exercise
• Use rescue inhaler before exercise if prescribed
• Avoid exercising in cold, dry air
• Maintain healthy weight
• Get annual flu vaccine
• Manage stress effectively
• Get adequate sleep

**Environmental Control:**
• Keep windows closed during high pollen season
• Use air conditioning with clean filters
• Remove carpets if possible (use hard flooring)
• Avoid stuffed animals in bedroom
• Keep pets out of bedroom
• Fix water leaks promptly to prevent mold
• Use exhaust fans in kitchen and bathroom
• Avoid wood-burning fireplaces

**Monitoring:**
• Use peak flow meter daily if recommended
• Keep asthma diary (symptoms, triggers, medications)
• Track patterns and trends
• Note when symptoms worsen
• Monitor for early warning signs
• Regular check-ups with healthcare provider

**Cold and Flu Prevention:**
• Wash hands frequently
• Avoid sick people
• Get vaccinated (flu, pneumonia, COVID-19)
• Treat respiratory infections promptly
• Increase controller medication during illness if advised

---

**⚠️ WHEN TO SEEK EMERGENCY CARE:**
• Severe shortness of breath or wheezing
• No improvement after using rescue inhaler
• Difficulty walking or talking
• Blue lips or fingernails
• Rapid breathing with chest retractions
• Peak flow in red zone
• Feeling of panic or anxiety due to breathing difficulty

*Work with your healthcare provider to develop a personalized asthma management plan.*`,
    relatedTopics: ['allergies', 'respiratory-health'],
  },
  {
    id: 'allergies',
    keywords: ['allergies', 'allergy', 'allergic reaction', 'hay fever', 'seasonal allergies', 'food allergies', 'anaphylaxis', 'histamine', 'antihistamine'],
    title: 'Allergies',
    content: `**📊 PROBLEM INFORMATION:**

**What are Allergies?**
Allergies occur when your immune system reacts to a foreign substance (allergen) that doesn't cause a reaction in most people.

**Common Types of Allergies:**
• **Seasonal Allergies (Hay Fever)**: Pollen, grass, weeds
• **Food Allergies**: Nuts, shellfish, eggs, milk, wheat, soy
• **Indoor Allergies**: Dust mites, pet dander, mold
• **Insect Allergies**: Bee stings, wasp stings
• **Medication Allergies**: Penicillin, aspirin, others
• **Skin Allergies**: Latex, certain metals, cosmetics

**Symptoms:**
• Sneezing and runny nose
• Itchy, watery eyes
• Nasal congestion
• Coughing
• Itchy skin or rash (hives)
• Swelling of lips, tongue, or face
• Difficulty breathing or wheezing
• Stomach pain, nausea, or vomiting (food allergies)

**Anaphylaxis (Severe Allergic Reaction):**
• Difficulty breathing or swallowing
• Rapid pulse
• Dizziness or fainting
• Severe drop in blood pressure
• Loss of consciousness
• Skin rash or hives all over body

**Risk Factors:**
• Family history of allergies or asthma
• Being a child (some allergies are more common in children)
• Having asthma or another allergic condition
• Age (some allergies improve with age, others develop)

---

**🛡️ PRECAUTIONS & PREVENTIVE MEASURES:**

**Allergen Avoidance:**
• Identify specific allergens through testing
• Read food labels carefully for food allergies
• Avoid known triggers
• Keep windows closed during high pollen season
• Use air conditioning with HEPA filters
• Remove shoes at door to avoid tracking allergens
• Shower and change clothes after outdoor activities

**Indoor Allergen Control:**
• Use allergen-proof covers on mattresses and pillows
• Wash bedding weekly in hot water (130°F)
• Keep humidity below 50% to prevent mold
• Vacuum regularly with HEPA filter
• Remove carpets if possible
• Keep pets out of bedroom
• Clean mold promptly with appropriate cleaners
• Use dehumidifiers in damp areas

**Medication Management:**
• Take antihistamines as directed
• Use nasal corticosteroid sprays for seasonal allergies
• Carry epinephrine auto-injector if prescribed
• Know how to use epinephrine auto-injector
• Replace expired epinephrine
• Wear medical alert bracelet for severe allergies
• Keep medications easily accessible

**Food Allergy Precautions:**
• Always read ingredient labels
• Ask about ingredients when dining out
• Inform restaurant staff of allergies
• Avoid cross-contamination in food preparation
• Teach children about their allergies
• Have emergency action plan
• Carry safe snacks when traveling

**Seasonal Allergy Management:**
• Check daily pollen counts
• Stay indoors on high pollen days
• Keep windows closed during pollen season
• Shower after being outdoors
• Start allergy medications before season begins
• Wear sunglasses to protect eyes
• Dry clothes indoors, not outside

**Immunotherapy (Allergy Shots):**
• Consider for severe or persistent allergies
• Requires regular visits over several years
• Can reduce sensitivity to allergens
• Discuss with allergist if appropriate

---

**⚠️ WHEN TO SEEK EMERGENCY CARE:**
• Signs of anaphylaxis (difficulty breathing, swelling of throat)
• Severe allergic reaction after insect sting
• Difficulty swallowing or speaking
• Rapid pulse with dizziness
• Severe hives or swelling all over body
• Loss of consciousness
• Use epinephrine auto-injector and call 911 immediately

*Consult an allergist for proper diagnosis and treatment plan.*`,
    relatedTopics: ['asthma', 'immune-system'],
  },
  {
    id: 'arthritis',
    keywords: ['arthritis', 'joint pain', 'osteoarthritis', 'rheumatoid arthritis', 'joint inflammation', 'stiffness', 'joint swelling'],
    title: 'Arthritis',
    content: `**📊 PROBLEM INFORMATION:**

**What is Arthritis?**
Arthritis is inflammation of one or more joints, causing pain and stiffness that can worsen with age.

**Common Types:**
• **Osteoarthritis**: Wear-and-tear damage to joint cartilage
• **Rheumatoid Arthritis**: Autoimmune disorder affecting joint lining
• **Psoriatic Arthritis**: Associated with psoriasis
• **Gout**: Caused by uric acid crystal buildup
• **Ankylosing Spondylitis**: Affects spine

**Symptoms:**
• Joint pain and tenderness
• Stiffness, especially in morning or after inactivity
• Swelling around joints
• Reduced range of motion
• Redness and warmth around joints
• Fatigue
• Difficulty with daily activities

**Risk Factors:**
• Age (risk increases with age)
• Family history
• Previous joint injury
• Obesity (extra weight stresses joints)
• Gender (women more likely for rheumatoid arthritis)
• Certain occupations (repetitive joint stress)

---

**🛡️ PRECAUTIONS & PREVENTIVE MEASURES:**

**Weight Management:**
• Maintain healthy weight to reduce joint stress
• Lose weight if overweight (reduces knee stress by 4x per pound lost)
• Follow balanced, anti-inflammatory diet
• Control portion sizes
• Avoid crash diets

**Exercise and Physical Activity:**
• Stay active with low-impact exercises
• Swimming and water aerobics (excellent for joints)
• Walking, cycling, tai chi
• Strengthen muscles around joints
• Improve flexibility with stretching
• Avoid high-impact activities
• Use proper form and technique
• Don't overdo it - rest when needed

**Joint Protection:**
• Use larger, stronger joints when possible
• Avoid positions that stress joints
• Use assistive devices (cane, jar opener, etc.)
• Take breaks during repetitive activities
• Maintain good posture
• Use proper body mechanics when lifting
• Avoid staying in one position too long

**Pain Management:**
• Apply heat for stiffness (warm shower, heating pad)
• Apply cold for inflammation (ice pack, 15-20 min)
• Take medications as prescribed
• Don't ignore pain - it's a warning signal
• Pace activities throughout the day
• Use topical pain relievers
• Consider massage therapy

**Medication Precautions:**
• Take NSAIDs with food to protect stomach
• Don't exceed recommended doses
• Report side effects to doctor
• Don't stop medications abruptly
• Be aware of drug interactions
• Store medications properly
• Keep track of what works

**Diet and Nutrition:**
• Eat anti-inflammatory foods (fish, nuts, olive oil)
• Include omega-3 fatty acids
• Eat plenty of fruits and vegetables
• Limit processed foods and sugar
• Stay hydrated
• Consider Mediterranean diet
• Limit alcohol
• Avoid foods that trigger gout (if applicable)

**Daily Living Adaptations:**
• Use ergonomic tools and utensils
• Install grab bars in bathroom
• Use raised toilet seat
• Organize home to minimize reaching and bending
• Wear supportive, cushioned shoes
• Use voice-activated devices
• Plan activities during best times of day

**Stress Management:**
• Practice relaxation techniques
• Get adequate sleep (7-9 hours)
• Join support groups
• Stay socially connected
• Consider counseling if needed
• Practice mindfulness or meditation

---

**⚠️ WHEN TO SEEK EMERGENCY CARE:**
• Sudden severe joint pain
• Joint becomes hot, red, and swollen rapidly
• Inability to move joint
• Severe swelling
• Fever with joint symptoms
• Joint deformity

*Work with your healthcare provider and possibly a rheumatologist for comprehensive arthritis management.*`,
    relatedTopics: ['pain-management', 'inflammation'],
  },
  {
    id: 'mental-health',
    keywords: ['mental health', 'depression', 'anxiety', 'stress', 'mental illness', 'mood', 'emotional health', 'psychological', 'therapy', 'counseling'],
    title: 'Mental Health',
    content: `**📊 PROBLEM INFORMATION:**

**Understanding Mental Health:**
Mental health includes emotional, psychological, and social well-being. It affects how we think, feel, and act.

**Common Mental Health Conditions:**
• **Depression**: Persistent sadness, loss of interest
• **Anxiety Disorders**: Excessive worry, fear, panic
• **Bipolar Disorder**: Extreme mood swings
• **PTSD**: Trauma-related symptoms
• **OCD**: Obsessive thoughts, compulsive behaviors
• **Eating Disorders**: Unhealthy eating patterns

**Symptoms of Depression:**
• Persistent sad, anxious, or empty mood
• Loss of interest in activities
• Changes in appetite or weight
• Sleep problems (too much or too little)
• Fatigue and decreased energy
• Feelings of worthlessness or guilt
• Difficulty concentrating
• Thoughts of death or suicide

**Symptoms of Anxiety:**
• Excessive worry or fear
• Restlessness or feeling on edge
• Rapid heartbeat
• Sweating or trembling
• Difficulty concentrating
• Sleep problems
• Avoiding situations that cause anxiety
• Panic attacks

**Risk Factors:**
• Family history of mental illness
• Traumatic life experiences
• Chronic medical conditions
• Substance abuse
• Social isolation
• Major life changes or stress

---

**🛡️ PRECAUTIONS & PREVENTIVE MEASURES:**

**Self-Care Practices:**
• Maintain regular sleep schedule (7-9 hours)
• Eat balanced, nutritious meals
• Exercise regularly (30 min/day)
• Limit alcohol and avoid drugs
• Practice relaxation techniques
• Engage in enjoyable activities
• Set realistic goals
• Take breaks when needed

**Stress Management:**
• Identify stress triggers
• Practice deep breathing exercises
• Try meditation or mindfulness
• Use progressive muscle relaxation
• Keep a journal
• Listen to calming music
• Spend time in nature
• Limit news and social media exposure

**Social Connection:**
• Maintain relationships with family and friends
• Join clubs or groups with shared interests
• Volunteer in community
• Reach out when feeling isolated
• Share feelings with trusted people
• Attend social events
• Consider support groups

**Professional Help:**
• Don't hesitate to seek therapy or counseling
• Consider cognitive behavioral therapy (CBT)
• Explore medication options with psychiatrist
• Attend regular appointments
• Be honest with healthcare providers
• Follow treatment plan
• Give treatments time to work

**Lifestyle Modifications:**
• Establish daily routines
• Set achievable goals
• Break large tasks into smaller steps
• Celebrate small accomplishments
• Practice gratitude
• Limit caffeine intake
• Avoid making major decisions during crisis
• Create a crisis plan

**Warning Sign Awareness:**
• Monitor mood changes
• Notice changes in sleep or appetite
• Be aware of increased substance use
• Recognize withdrawal from activities
• Note difficulty functioning at work/school
• Watch for increased irritability
• Be alert to thoughts of self-harm

**Medication Management:**
• Take medications as prescribed
• Don't stop medications abruptly
• Report side effects to doctor
• Be patient - medications take time to work
• Avoid alcohol with medications
• Keep regular follow-up appointments
• Store medications safely

---

**⚠️ WHEN TO SEEK EMERGENCY CARE:**
• Thoughts of suicide or self-harm
• Plans to hurt yourself or others
• Hearing voices or seeing things
• Severe panic attacks
• Inability to care for yourself
• Psychotic symptoms

**Crisis Resources:**
• National Suicide Prevention Lifeline: 988
• Crisis Text Line: Text HOME to 741741
• Call 911 for immediate danger

*Mental health is as important as physical health. Seeking help is a sign of strength, not weakness.*`,
    relatedTopics: ['stress-management', 'sleep-health'],
  },
  {
    id: 'immune-system',
    keywords: ['immune system', 'immunity', 'immune health', 'white blood cells', 'antibodies', 'immune response', 'immunodeficiency'],
    title: 'Immune System Health',
    content: `**📊 PROBLEM INFORMATION:**

**What is the Immune System?**
The immune system is your body's defense against infections and diseases. It includes white blood cells, antibodies, and other components that fight harmful invaders.

**Signs of Weakened Immunity:**
• Frequent infections (colds, flu)
• Slow wound healing
• Frequent digestive problems
• Constant fatigue
• Recurring infections (ear, sinus, skin)
• Inflammation and organ problems
• Blood disorders
• Autoimmune responses

**Factors That Weaken Immunity:**
• Poor nutrition
• Lack of sleep
• Chronic stress
• Sedentary lifestyle
• Smoking and excessive alcohol
• Certain medications (immunosuppressants)
• Chronic diseases (diabetes, HIV)
• Age (very young or elderly)
• Environmental toxins

**Types of Immune Disorders:**
• **Immunodeficiency**: Weakened immune response
• **Autoimmune**: Immune system attacks own body
• **Allergic**: Overreaction to harmless substances
• **Inflammatory**: Excessive inflammation response

---

**🛡️ PRECAUTIONS & PREVENTIVE MEASURES:**

**Nutrition for Immunity:**
• Eat variety of colorful fruits and vegetables
• Include vitamin C sources (citrus, berries, peppers)
• Get vitamin D (sunlight, fortified foods, supplements)
• Consume zinc-rich foods (meat, shellfish, legumes)
• Include probiotics (yogurt, kefir, fermented foods)
• Eat protein for antibody production
• Include healthy fats (omega-3s)
• Stay hydrated (8 glasses water/day)

**Lifestyle Practices:**
• Get 7-9 hours quality sleep nightly
• Exercise regularly (moderate intensity, 30 min/day)
• Manage stress effectively
• Maintain healthy weight
• Don't smoke
• Limit alcohol consumption
• Practice good hygiene
• Spend time outdoors

**Hygiene and Prevention:**
• Wash hands frequently (20 seconds with soap)
• Avoid touching face with unwashed hands
• Cover coughs and sneezes
• Stay home when sick
• Avoid close contact with sick people
• Clean and disinfect surfaces
• Practice food safety
• Keep vaccinations up to date

**Stress Reduction:**
• Practice meditation or mindfulness
• Try yoga or tai chi
• Engage in hobbies
• Maintain social connections
• Get adequate rest
• Laugh and have fun
• Seek counseling if needed
• Practice deep breathing

**Sleep Hygiene:**
• Maintain consistent sleep schedule
• Create dark, quiet, cool bedroom
• Avoid screens before bedtime
• Limit caffeine and alcohol
• Exercise regularly (not close to bedtime)
• Manage stress and anxiety
• Avoid large meals before bed

**Supplements (Consult Doctor First):**
• Vitamin C (500-1000mg daily)
• Vitamin D (especially in winter)
• Zinc (8-11mg daily)
• Probiotics
• Elderberry
• Echinacea (short-term use)

**Vaccination:**
• Stay current with recommended vaccines
• Get annual flu shot
• Consider pneumonia vaccine if recommended
• Get COVID-19 vaccination and boosters
• Travel vaccines as needed
• Discuss with doctor about specific needs

---

**⚠️ WHEN TO SEEK EMERGENCY CARE:**
• High fever (103°F+) that won't come down
• Difficulty breathing
• Severe dehydration
• Confusion or altered mental state
• Severe or persistent vomiting
• Signs of sepsis (rapid heart rate, fever, confusion)

*A healthy immune system is your best defense. Consult healthcare provider for persistent or severe symptoms.*`,
    relatedTopics: ['nutrition', 'sleep-health', 'allergies'],
  },
  {
    id: 'headaches',
    keywords: ['headache', 'migraine', 'tension headache', 'cluster headache', 'head pain', 'headache relief'],
    title: 'Headaches & Migraines',
    content: `**📊 PROBLEM INFORMATION:**

**Types of Headaches:**

**Tension Headaches (Most Common):**
• Dull, aching head pain
• Tightness or pressure across forehead
• Tenderness on scalp, neck, shoulders
• Mild to moderate intensity
• Both sides of head

**Migraines:**
• Intense throbbing or pulsing pain
• Usually one side of head
• Nausea and vomiting
• Sensitivity to light and sound
• Visual disturbances (aura)
• Can last 4-72 hours

**Cluster Headaches:**
• Severe burning or piercing pain
• Around or behind one eye
• Occurs in clusters (multiple attacks)
• Restlessness during attack
• Eye redness, tearing, nasal congestion
• Very intense but shorter duration

**Sinus Headaches:**
• Deep, constant pain in cheekbones, forehead, or bridge of nose
• Worsens with sudden head movement
• Accompanied by sinus symptoms
• Facial pressure and congestion

**Common Triggers:**
• Stress and anxiety
• Poor posture
• Lack of sleep or oversleeping
• Skipped meals or dehydration
• Certain foods (aged cheese, processed meats, alcohol)
• Caffeine (too much or withdrawal)
• Bright lights or loud noises
• Strong smells
• Weather changes
• Hormonal changes (menstruation)
• Medications

---

**🛡️ PRECAUTIONS & PREVENTIVE MEASURES:**

**Lifestyle Modifications:**
• Maintain regular sleep schedule
• Don't skip meals
• Stay hydrated (8 glasses water/day)
• Manage stress effectively
• Exercise regularly
• Maintain good posture
• Take regular breaks from screens
• Limit caffeine intake
• Avoid known triggers

**Trigger Identification:**
• Keep headache diary
• Note time, duration, intensity
• Record food, activities, stress levels
• Track menstrual cycle (for women)
• Identify patterns
• Share diary with healthcare provider

**Dietary Precautions:**
• Eat regular, balanced meals
• Avoid trigger foods
• Limit processed foods
• Reduce alcohol consumption
• Moderate caffeine intake
• Stay hydrated throughout day
• Don't skip breakfast
• Avoid artificial sweeteners if sensitive

**Stress Management:**
• Practice relaxation techniques
• Try meditation or deep breathing
• Regular exercise
• Adequate sleep
• Time management
• Delegate tasks when possible
• Take breaks during work
• Engage in enjoyable activities

**Posture and Ergonomics:**
• Maintain proper posture
• Adjust computer screen to eye level
• Use ergonomic chair
• Take frequent breaks from desk
• Stretch neck and shoulders regularly
• Avoid clenching jaw
• Position phone properly

**Medication Management:**
• Take pain relievers early in headache
• Don't overuse pain medications (rebound headaches)
• Follow prescribed preventive medications
• Keep medication diary
• Don't exceed recommended doses
• Consult doctor about medication overuse

**Home Remedies:**
• Apply cold or warm compress
• Rest in quiet, dark room
• Gentle massage of neck and temples
• Practice progressive muscle relaxation
• Try aromatherapy (peppermint, lavender)
• Stay hydrated
• Light stretching

**Preventive Strategies:**
• Regular exercise (30 min, 5 days/week)
• Consistent sleep schedule
• Stress reduction techniques
• Biofeedback training
• Acupuncture (for some people)
• Preventive medications if prescribed
• Avoid known triggers

---

**⚠️ WHEN TO SEEK EMERGENCY CARE:**
• Sudden, severe headache ("thunderclap")
• Headache with fever, stiff neck, confusion
• Headache after head injury
• Headache with vision changes, weakness, or numbness
• Worst headache of your life
• Headache with difficulty speaking
• Headache with seizures
• Progressive worsening over days/weeks

*Consult a healthcare provider if headaches are frequent, severe, or interfering with daily life.*`,
    relatedTopics: ['stress-management', 'sleep-health'],
  },
  {
    id: 'fever',
    keywords: ['fever', 'temperature', 'high temperature', 'pyrexia', 'febrile', 'body temperature'],
    title: 'Fever',
    content: `**📊 PROBLEM INFORMATION:**

**What is Fever?**
Fever is a temporary increase in body temperature, often due to an illness. It's a sign that your body is fighting an infection.

**Temperature Ranges:**
• Normal: 97°F - 99°F (36.1°C - 37.2°C)
• Low-grade fever: 99°F - 100.4°F (37.2°C - 38°C)
• Fever: 100.4°F+ (38°C+)
• High fever: 103°F+ (39.4°C+)
• Dangerous: 105°F+ (40.6°C+)

**Common Causes:**
• Viral infections (cold, flu, COVID-19)
• Bacterial infections
• Heat exhaustion
• Inflammatory conditions
• Medications (antibiotics, antihistamines)
• Vaccinations
• Teething (in infants)
• Certain cancers
• Autoimmune disorders

**Symptoms Accompanying Fever:**
• Chills and shivering
• Sweating
• Headache
• Muscle aches
• Loss of appetite
• Dehydration
• Weakness
• Irritability

**Risk Factors for Complications:**
• Infants under 3 months
• Elderly individuals
• Weakened immune system
• Chronic medical conditions
• Pregnancy

---

**🛡️ PRECAUTIONS & PREVENTIVE MEASURES:**

**Home Care for Fever:**
• Rest and get plenty of sleep
• Stay hydrated (water, clear broths, electrolyte drinks)
• Dress in light, comfortable clothing
• Keep room temperature comfortable (not too warm)
• Take lukewarm bath (not cold)
• Use cool compress on forehead
• Monitor temperature regularly
• Don't bundle up excessively

**Medication Guidelines:**
• Take acetaminophen (Tylenol) or ibuprofen (Advil) as directed
• Follow dosing instructions carefully
• Don't exceed maximum daily dose
• Don't give aspirin to children (risk of Reye's syndrome)
• Space medications appropriately
• Take with food if stomach upset occurs
• Keep medication log

**Hydration:**
• Drink fluids frequently (every 1-2 hours)
• Water is best
• Clear broths and soups
• Electrolyte drinks (Pedialyte, sports drinks)
• Avoid caffeine and alcohol
• Popsicles or ice chips if nausea present
• Monitor urine color (should be light yellow)

**Monitoring:**
• Check temperature every 4-6 hours
• Keep fever log (time, temperature, medications)
• Watch for other symptoms
• Monitor hydration status
• Note response to medications
• Track duration of fever

**Infection Prevention:**
• Wash hands frequently
• Cover coughs and sneezes
• Avoid close contact with sick people
• Stay home when sick
• Don't share personal items
• Clean and disinfect surfaces
• Get vaccinated (flu, COVID-19)
• Practice good hygiene

**When to Stay Home:**
• Fever of 100.4°F or higher
• Until fever-free for 24 hours without medication
• If contagious illness suspected
• If feeling too ill to function
• To prevent spreading to others

**Nutrition During Fever:**
• Eat light, easy-to-digest foods
• Chicken soup or broth
• Toast, crackers, rice
• Bananas, applesauce
• Don't force eating if no appetite
• Focus on hydration
• Avoid heavy, greasy foods

---

**⚠️ WHEN TO SEEK EMERGENCY CARE:**

**For Adults:**
• Fever 103°F+ (39.4°C+)
• Fever lasting more than 3 days
• Severe headache
• Stiff neck
• Confusion or altered mental state
• Difficulty breathing
• Chest pain
• Severe abdominal pain
• Persistent vomiting
• Rash with fever
• Seizures

**For Infants and Children:**
• Any fever in infant under 3 months
• Fever 104°F+ (40°C+) in children
• Fever with rash
• Difficulty breathing
• Persistent crying
• Unusual drowsiness or difficulty waking
• Seizures
• Severe headache or stiff neck
• Dehydration signs (no tears, dry mouth, no wet diapers)

*Fever is usually not dangerous itself, but the underlying cause may require medical attention.*`,
    relatedTopics: ['immune-system', 'infections'],
  },
  {
    id: 'fatigue',
    keywords: ['fatigue', 'tiredness', 'exhaustion', 'low energy', 'chronic fatigue', 'weakness', 'lethargy'],
    title: 'Fatigue & Low Energy',
    content: `**📊 PROBLEM INFORMATION:**

**What is Fatigue?**
Fatigue is a feeling of constant tiredness or weakness that doesn't improve with rest. It can be physical, mental, or both.

**Types of Fatigue:**
• **Physical Fatigue**: Muscle weakness, difficulty performing tasks
• **Mental Fatigue**: Difficulty concentrating, reduced alertness
• **Chronic Fatigue**: Persistent exhaustion lasting 6+ months

**Common Causes:**
• Lack of sleep or poor sleep quality
• Stress and anxiety
• Depression
• Poor nutrition or dehydration
• Anemia (low iron)
• Thyroid problems
• Diabetes
• Heart disease
• Chronic fatigue syndrome
• Medications (side effect)
• Infections (viral, bacterial)
• Sleep disorders (sleep apnea)
• Vitamin deficiencies
• Overexertion

**Symptoms:**
• Persistent tiredness
• Lack of motivation
• Difficulty concentrating
• Muscle weakness
• Slowed reflexes
• Impaired decision-making
• Mood changes
• Headaches
• Dizziness

---

**🛡️ PRECAUTIONS & PREVENTIVE MEASURES:**

**Sleep Hygiene:**
• Maintain consistent sleep schedule (same bedtime/wake time)
• Aim for 7-9 hours nightly
• Create dark, quiet, cool bedroom
• Avoid screens 1 hour before bed
• Limit caffeine after 2 PM
• Avoid large meals before bedtime
• Use bed only for sleep
• Establish relaxing bedtime routine

**Nutrition for Energy:**
• Eat balanced meals with protein, complex carbs, healthy fats
• Don't skip breakfast
• Eat smaller, frequent meals
• Include iron-rich foods (lean meat, spinach, beans)
• Get adequate B vitamins
• Stay hydrated (8 glasses water/day)
• Limit sugar and processed foods
• Avoid excessive caffeine
• Consider vitamin D supplementation if deficient

**Physical Activity:**
• Exercise regularly (30 min/day, most days)
• Start slowly if currently inactive
• Include both cardio and strength training
• Take short walks during day
• Stretch regularly
• Don't overexert
• Exercise earlier in day (not close to bedtime)
• Listen to your body

**Stress Management:**
• Practice relaxation techniques
• Try meditation or deep breathing
• Engage in enjoyable activities
• Set realistic goals
• Learn to say no
• Delegate tasks when possible
• Take regular breaks
• Maintain work-life balance

**Energy Conservation:**
• Prioritize important tasks
• Break large tasks into smaller steps
• Pace yourself throughout day
• Alternate activity with rest
• Plan demanding tasks for high-energy times
• Avoid multitasking
• Simplify daily routines
• Ask for help when needed

**Lifestyle Modifications:**
• Limit alcohol consumption
• Quit smoking
• Maintain healthy weight
• Manage chronic conditions
• Review medications with doctor
• Reduce screen time
• Spend time outdoors
• Maintain social connections

**Medical Evaluation:**
• Get blood work to check for anemia, thyroid, vitamin deficiencies
• Screen for sleep disorders
• Evaluate medications
• Check for underlying conditions
• Discuss chronic fatigue syndrome if persistent
• Consider mental health evaluation

**Daily Habits:**
• Expose yourself to bright light in morning
• Take short breaks every hour
• Practice good posture
• Stay hydrated throughout day
• Avoid long naps (20-30 min max)
• Keep consistent meal times
• Limit sugar and refined carbs
• Get fresh air daily

---

**⚠️ WHEN TO SEEK EMERGENCY CARE:**
• Sudden severe fatigue with chest pain
• Fatigue with difficulty breathing
• Confusion or altered mental state
• Severe weakness or inability to move
• Fainting or loss of consciousness
• Fatigue with severe headache and stiff neck

**When to See a Doctor:**
• Fatigue lasting more than 2 weeks
• Fatigue interfering with daily life
• Unexplained weight loss
• Persistent fever
• Depression or suicidal thoughts
• Severe or worsening symptoms

*Persistent fatigue may indicate an underlying medical condition requiring professional evaluation.*`,
    relatedTopics: ['sleep-health', 'nutrition', 'mental-health'],
  },
  {
    id: 'stress-management',
    keywords: ['stress', 'stress management', 'anxiety', 'tension', 'overwhelmed', 'burnout', 'relaxation'],
    title: 'Stress Management',
    content: `**📊 PROBLEM INFORMATION:**

**What is Stress?**
Stress is the body's reaction to any change that requires an adjustment or response. While some stress is normal, chronic stress can harm health.

**Types of Stress:**
• **Acute Stress**: Short-term, immediate response
• **Chronic Stress**: Long-term, ongoing pressure
• **Episodic Acute Stress**: Frequent acute stress
• **Traumatic Stress**: Response to traumatic event

**Physical Symptoms:**
• Headaches
• Muscle tension or pain
• Chest pain or rapid heartbeat
• Fatigue
• Sleep problems
• Stomach upset
• High blood pressure
• Weakened immune system

**Emotional Symptoms:**
• Anxiety or nervousness
• Irritability or anger
• Feeling overwhelmed
• Depression or sadness
• Lack of motivation
• Difficulty concentrating
• Memory problems
• Mood swings

**Behavioral Symptoms:**
• Changes in appetite
• Procrastination
• Increased use of alcohol/drugs
• Social withdrawal
• Nervous habits (nail biting)
• Neglecting responsibilities

**Common Stressors:**
• Work pressure
• Financial problems
• Relationship issues
• Health concerns
• Major life changes
• Daily hassles
• Lack of time
• Uncertainty about future

---

**🛡️ PRECAUTIONS & PREVENTIVE MEASURES:**

**Relaxation Techniques:**
• **Deep Breathing**: Breathe slowly and deeply for 5-10 minutes
• **Progressive Muscle Relaxation**: Tense and release muscle groups
• **Meditation**: Focus mind, reduce racing thoughts
• **Mindfulness**: Stay present in the moment
• **Visualization**: Imagine peaceful scenes
• **Yoga**: Combine movement, breathing, meditation
• **Tai Chi**: Gentle, flowing movements

**Physical Activity:**
• Exercise regularly (30 min/day)
• Take walks, especially in nature
• Dance or move to music
• Try swimming or cycling
• Practice yoga or stretching
• Engage in sports or active hobbies
• Take stairs instead of elevator
• Park farther away and walk

**Time Management:**
• Prioritize tasks (urgent vs. important)
• Break large projects into smaller steps
• Set realistic goals and deadlines
• Learn to say no
• Delegate when possible
• Avoid overcommitting
• Use calendar or planner
• Schedule breaks and downtime

**Healthy Lifestyle:**
• Get 7-9 hours sleep nightly
• Eat balanced, nutritious meals
• Limit caffeine and sugar
• Avoid excessive alcohol
• Don't smoke
• Stay hydrated
• Maintain regular routines
• Take care of physical health

**Social Support:**
• Talk to friends and family
• Join support groups
• Maintain social connections
• Ask for help when needed
• Spend time with positive people
• Volunteer or help others
• Consider professional counseling
• Don't isolate yourself

**Cognitive Strategies:**
• Challenge negative thoughts
• Practice positive self-talk
• Keep perspective (will this matter in 5 years?)
• Focus on what you can control
• Accept what you cannot change
• Practice gratitude
• Reframe problems as challenges
• Avoid catastrophizing

**Lifestyle Modifications:**
• Set boundaries (work, personal life)
• Take regular breaks
• Engage in hobbies
• Listen to music
• Spend time in nature
• Laugh and have fun
• Practice self-compassion
• Limit news and social media

**Work-Related Stress:**
• Take lunch breaks away from desk
• Organize workspace
• Communicate clearly with colleagues
• Set realistic expectations
• Separate work and personal life
• Use vacation time
• Address conflicts promptly
• Consider flexible work arrangements

**Daily Stress-Reduction Habits:**
• Start day with calm morning routine
• Practice gratitude (list 3 things daily)
• Take short breaks every hour
• Do one thing at a time
• Spend time outdoors
• Connect with loved ones
• End day with relaxing activity
• Prepare for next day before bed

**Professional Help:**
• Consider therapy or counseling
• Try cognitive behavioral therapy (CBT)
• Explore stress management programs
• Consult doctor if stress affects health
• Don't hesitate to seek help
• Medication may be appropriate in some cases

---

**⚠️ WHEN TO SEEK EMERGENCY CARE:**
• Thoughts of self-harm or suicide
• Severe panic attacks
• Chest pain (rule out heart attack)
• Inability to function in daily life
• Severe depression
• Substance abuse problems

**When to See a Doctor:**
• Stress interfering with daily activities
• Physical symptoms persist
• Using alcohol/drugs to cope
• Feeling overwhelmed constantly
• Sleep problems lasting weeks
• Relationship or work problems due to stress

*Stress management is essential for overall health. Don't hesitate to seek professional help.*`,
    relatedTopics: ['mental-health', 'sleep-health', 'anxiety'],
  },
  {
    id: 'sleep-health',
    keywords: ['sleep', 'insomnia', 'sleep problems', 'sleep quality', 'sleep hygiene', 'sleep disorders', 'rest'],
    title: 'Sleep Health & Insomnia',
    content: `**📊 PROBLEM INFORMATION:**

**Importance of Sleep:**
Sleep is essential for physical health, mental well-being, and quality of life. Adults need 7-9 hours per night.

**Common Sleep Disorders:**
• **Insomnia**: Difficulty falling or staying asleep
• **Sleep Apnea**: Breathing interruptions during sleep
• **Restless Leg Syndrome**: Uncomfortable leg sensations
• **Narcolepsy**: Excessive daytime sleepiness
• **Circadian Rhythm Disorders**: Misaligned sleep-wake cycle

**Symptoms of Poor Sleep:**
• Difficulty falling asleep
• Waking frequently during night
• Waking too early
• Daytime fatigue
• Irritability or mood changes
• Difficulty concentrating
• Increased errors or accidents
• Ongoing sleep concerns

**Causes of Sleep Problems:**
• Stress and anxiety
• Depression
• Poor sleep habits
• Irregular schedule
• Caffeine or alcohol
• Medications
• Medical conditions
• Pain or discomfort
• Environmental factors (noise, light, temperature)
• Screen time before bed

**Health Effects of Poor Sleep:**
• Weakened immune system
• Weight gain
• Increased risk of diabetes
• Heart disease risk
• High blood pressure
• Mood disorders
• Memory problems
• Reduced productivity

---

**🛡️ PRECAUTIONS & PREVENTIVE MEASURES:**

**Sleep Hygiene Basics:**
• Maintain consistent sleep schedule (same bedtime/wake time daily)
• Create dark, quiet, cool bedroom (60-67°F)
• Use comfortable mattress and pillows
• Reserve bed for sleep only (not work or TV)
• Establish relaxing bedtime routine
• Avoid clock-watching
• Get up if can't sleep after 20 minutes

**Daytime Habits:**
• Get regular exercise (but not close to bedtime)
• Expose yourself to bright light in morning
• Avoid long naps (20-30 min max, before 3 PM)
• Manage stress throughout day
• Stay active and engaged
• Spend time outdoors
• Maintain social connections

**Evening Routine:**
• Dim lights 1-2 hours before bed
• Avoid screens (TV, phone, computer) 1 hour before bed
• Take warm bath or shower
• Read a book (not on screen)
• Practice relaxation techniques
• Listen to calming music
• Do gentle stretching
• Write in journal

**Dietary Precautions:**
• Avoid caffeine after 2 PM
• Limit alcohol (disrupts sleep quality)
• Don't eat large meals close to bedtime
• Avoid spicy or acidic foods at night
• Stay hydrated but limit fluids before bed
• Consider light snack if hungry (complex carbs)
• Avoid nicotine

**Bedroom Environment:**
• Keep room dark (blackout curtains, eye mask)
• Minimize noise (earplugs, white noise machine)
• Maintain cool temperature
• Ensure comfortable bedding
• Remove electronic devices
• Keep bedroom clutter-free
• Use calming colors
• Ensure good air quality

**Relaxation Techniques:**
• Deep breathing exercises
• Progressive muscle relaxation
• Meditation or mindfulness
• Visualization of peaceful scenes
• Gentle yoga or stretching
• Listen to sleep sounds or music
• Practice gratitude
• Body scan meditation

**Managing Racing Thoughts:**
• Keep notepad by bed for worries
• Schedule "worry time" earlier in day
• Practice mindfulness
• Focus on breathing
• Use guided sleep meditations
• Try counting backwards from 100
• Visualize peaceful scenes
• Accept thoughts without engaging

**When to Consider Sleep Aids:**
• Short-term use only
• Consult doctor first
• Understand side effects
• Don't rely on long-term
• Try natural options first (melatonin, valerian)
• Avoid alcohol with sleep aids
• Don't drive after taking

**Cognitive Behavioral Therapy for Insomnia (CBT-I):**
• Evidence-based treatment
• Addresses thoughts and behaviors
• More effective than medication long-term
• No side effects
• Lasting results
• Consider with sleep specialist

---

**⚠️ WHEN TO SEEK EMERGENCY CARE:**
• Severe breathing problems during sleep
• Chest pain or heart palpitations
• Sudden inability to move upon waking (sleep paralysis with distress)

**When to See a Doctor:**
• Insomnia lasting more than 3 weeks
• Daytime sleepiness affecting daily life
• Loud snoring with breathing pauses
• Gasping or choking during sleep
• Unusual movements or behaviors during sleep
• Persistent nightmares
• Sleep problems despite good sleep hygiene

*Quality sleep is essential for health. Consult a sleep specialist for persistent problems.*`,
    relatedTopics: ['stress-management', 'mental-health', 'fatigue'],
  },
  {
    id: 'pain-management',
    keywords: ['pain', 'chronic pain', 'pain relief', 'pain management', 'aches', 'discomfort', 'analgesic'],
    title: 'Pain Management',
    content: `**📊 PROBLEM INFORMATION:**

**Understanding Pain:**
Pain is an unpleasant sensory and emotional experience. It can be acute (short-term) or chronic (lasting 3+ months).

**Types of Pain:**
• **Acute Pain**: Sudden onset, specific cause, usually resolves
• **Chronic Pain**: Persists beyond normal healing time
• **Neuropathic Pain**: Nerve damage (burning, shooting)
• **Nociceptive Pain**: Tissue damage (aching, throbbing)
• **Referred Pain**: Felt in different location than source

**Common Pain Conditions:**
• Arthritis
• Back pain
• Headaches/migraines
• Fibromyalgia
• Nerve pain (neuropathy)
• Post-surgical pain
• Cancer pain
• Injury-related pain

**Pain Assessment:**
• Location and radiation
• Intensity (0-10 scale)
• Quality (sharp, dull, burning, aching)
• Duration and frequency
• Triggers and relieving factors
• Impact on daily activities
• Associated symptoms

**Effects of Chronic Pain:**
• Reduced mobility
• Sleep problems
• Fatigue
• Depression and anxiety
• Social isolation
• Reduced quality of life
• Difficulty working

---

**🛡️ PRECAUTIONS & PREVENTIVE MEASURES:**

**Medication Management:**
• Take medications as prescribed
• Start with lowest effective dose
• Use short-acting for breakthrough pain
• Don't exceed maximum daily dose
• Take with food if stomach upset
• Track what works and what doesn't
• Be aware of side effects
• Don't stop suddenly (especially opioids)

**Non-Medication Approaches:**
• **Heat Therapy**: Warm compress, heating pad (15-20 min)
• **Cold Therapy**: Ice pack for inflammation (15-20 min)
• **Massage**: Gentle massage of affected area
• **Acupuncture**: May help certain pain types
• **TENS Unit**: Electrical nerve stimulation
• **Physical Therapy**: Strengthening and flexibility
• **Chiropractic Care**: For certain musculoskeletal pain

**Physical Activity:**
• Stay active within pain limits
• Low-impact exercises (swimming, walking, cycling)
• Gentle stretching daily
• Strengthen muscles around painful areas
• Improve flexibility
• Start slowly and gradually increase
• Listen to your body
• Rest when needed

**Lifestyle Modifications:**
• Maintain healthy weight (reduces joint stress)
• Practice good posture
• Use ergonomic furniture and tools
• Take frequent breaks from repetitive activities
• Pace activities throughout day
• Get adequate sleep (7-9 hours)
• Manage stress effectively
• Avoid smoking (impairs healing)

**Mind-Body Techniques:**
• **Meditation**: Reduces pain perception
• **Deep Breathing**: Promotes relaxation
• **Progressive Muscle Relaxation**: Reduces tension
• **Guided Imagery**: Visualize pain relief
• **Biofeedback**: Learn to control body responses
• **Mindfulness**: Stay present, accept sensations
• **Cognitive Behavioral Therapy**: Change pain thoughts

**Diet and Nutrition:**
• Anti-inflammatory foods (fish, nuts, olive oil)
• Fruits and vegetables (antioxidants)
• Whole grains
• Adequate protein
• Stay hydrated
• Limit processed foods and sugar
• Reduce alcohol
• Consider omega-3 supplements

**Sleep Hygiene:**
• Maintain consistent sleep schedule
• Create comfortable sleep environment
• Use supportive mattress and pillows
• Try different sleeping positions
• Practice relaxation before bed
• Avoid caffeine and alcohol
• Manage pain before bedtime

**Activity Pacing:**
• Break tasks into smaller parts
• Alternate activity with rest
• Don't overdo on good days
• Plan ahead for demanding activities
• Use assistive devices when helpful
• Prioritize important tasks
• Ask for help when needed

**Stress Management:**
• Identify stress triggers
• Practice relaxation techniques
• Engage in enjoyable activities
• Maintain social connections
• Join support groups
• Consider counseling
• Set realistic expectations
• Practice self-compassion

**Pain Diary:**
• Track pain levels daily
• Note triggers and patterns
• Record medication effectiveness
• Document activities and their impact
• Share with healthcare provider
• Identify what helps and what doesn't

**Complementary Therapies:**
• Yoga (gentle, adapted)
• Tai chi
• Aromatherapy
• Music therapy
• Art therapy
• Pet therapy
• Nature therapy

---

**⚠️ WHEN TO SEEK EMERGENCY CARE:**
• Sudden severe pain
• Pain with chest pressure or difficulty breathing
• Pain with fever and confusion
• Loss of bowel or bladder control
• Severe weakness or numbness
• Pain after serious injury
• Signs of infection (redness, warmth, swelling)

**When to See a Doctor:**
• Pain lasting more than a few weeks
• Pain interfering with daily activities
• Pain not responding to treatment
• New or worsening pain
• Pain with unexplained weight loss
• Medication side effects
• Need for pain management plan

*Effective pain management often requires a multidisciplinary approach. Work with healthcare providers to find the best strategy.*`,
    relatedTopics: ['arthritis', 'stress-management', 'sleep-health'],
  },
  {
    id: 'menstrual-periods',
    keywords: ['period', 'periods', 'menstruation', 'menstrual', 'menstrual bleeding', 'heavy bleeding', 'cramps', 'menstrual cramps', 'pms symptoms'],
    title: 'Menstrual Periods',
    content: `**📊 PROBLEM INFORMATION:**

**What are Menstrual Periods?**
Menstruation is the monthly shedding of the uterine lining, resulting in bleeding from the vagina. It's a normal part of the reproductive cycle.

**Normal Menstrual Cycle:**
• **Cycle Length**: 21-35 days (average 28 days)
• **Period Duration**: 3-7 days
• **Blood Loss**: 30-40 mL (2-3 tablespoons) per cycle
• **First Period (Menarche)**: Usually ages 10-15
• **Last Period (Menopause)**: Usually ages 45-55

**Common Menstrual Symptoms:**
• Abdominal cramping (dysmenorrhea)
• Lower back pain
• Bloating and water retention
• Breast tenderness
• Mood changes and irritability
• Fatigue
• Headaches
• Food cravings
• Acne breakouts

**Heavy Bleeding (Menorrhagia) Signs:**
• Soaking through pad/tampon every 1-2 hours
• Needing to change protection during night
• Passing blood clots larger than quarter
• Bleeding lasting more than 7 days
• Symptoms of anemia (fatigue, weakness, pale skin)

**Irregular Periods:**
• Cycles shorter than 21 days or longer than 35 days
• Unpredictable timing
• Varying flow amounts
• Missed periods (not due to pregnancy)
• Bleeding between periods

**Causes of Period Problems:**
• Hormonal imbalances
• Stress
• Significant weight changes
• Excessive exercise
• Polycystic ovary syndrome (PCOS)
• Thyroid disorders
• Uterine fibroids or polyps
• Endometriosis
• Certain medications
• Intrauterine devices (IUDs)

---

**🛡️ PRECAUTIONS & PREVENTIVE MEASURES:**

**Menstrual Hygiene:**
• Change pads/tampons every 4-6 hours
• Use appropriate absorbency for flow
• Wash hands before and after changing products
• Consider menstrual cups or period underwear
• Shower or bathe regularly
• Wear breathable cotton underwear
• Avoid scented products (can cause irritation)
• Never leave tampon in longer than 8 hours

**Cramp Relief:**
• Apply heating pad to lower abdomen (15-20 min)
• Take warm bath or shower
• Gentle massage of lower abdomen
• Over-the-counter pain relievers (ibuprofen, naproxen)
• Light exercise (walking, yoga, stretching)
• Stay hydrated
• Try relaxation techniques
• Consider magnesium supplements (consult doctor)

**Dietary Recommendations:**
• Eat iron-rich foods (lean meat, spinach, beans)
• Include calcium and vitamin D
• Reduce salt intake (minimizes bloating)
• Limit caffeine and alcohol
• Eat complex carbohydrates
• Stay hydrated (8 glasses water/day)
• Reduce sugar intake
• Include omega-3 fatty acids

**Lifestyle Modifications:**
• Exercise regularly (reduces cramps and mood symptoms)
• Maintain healthy weight
• Get adequate sleep (7-9 hours)
• Manage stress effectively
• Avoid smoking
• Limit alcohol consumption
• Practice good posture

**Tracking Your Cycle:**
• Use period tracking app or calendar
• Note start and end dates
• Track flow intensity (light, moderate, heavy)
• Record symptoms and their severity
• Note any irregularities
• Share information with healthcare provider
• Helps predict next period
• Identifies patterns and problems

**Managing Mood Changes:**
• Practice stress-reduction techniques
• Exercise regularly
• Get adequate sleep
• Eat balanced meals
• Limit caffeine and sugar
• Stay socially connected
• Consider vitamin B6 supplement
• Talk to doctor if severe mood changes

**Bloating and Water Retention:**
• Reduce sodium intake
• Stay hydrated
• Avoid processed foods
• Eat potassium-rich foods (bananas, avocados)
• Limit caffeine and alcohol
• Exercise regularly
• Wear comfortable, loose clothing

**Pain Management:**
• Start pain relievers at first sign of cramps
• Use NSAIDs (ibuprofen, naproxen) as directed
• Apply heat therapy
• Try gentle exercise
• Practice relaxation techniques
• Consider hormonal birth control (reduces cramps)
• Discuss with doctor if severe pain

**When Using Tampons:**
• Use lowest absorbency needed
• Change every 4-6 hours
• Never leave in overnight (use pad instead)
• Alternate with pads
• Be aware of toxic shock syndrome symptoms
• Wash hands before insertion

**Birth Control Options:**
• Can regulate irregular periods
• May reduce heavy bleeding
• Often decreases cramps
• Can help with PMS symptoms
• Discuss options with healthcare provider
• Consider pills, patch, ring, IUD, or implant

---

**⚠️ WHEN TO SEEK EMERGENCY CARE:**
• Soaking through pad/tampon every hour for several hours
• Passing very large blood clots
• Severe pain not relieved by medication
• Signs of toxic shock syndrome (high fever, vomiting, diarrhea, rash, dizziness)
• Severe dizziness or fainting
• Signs of severe anemia (extreme fatigue, shortness of breath, chest pain)

**When to See a Doctor:**
• Periods lasting longer than 7 days
• Cycles shorter than 21 days or longer than 35 days
• Bleeding between periods
• Severe cramps interfering with daily activities
• Missed periods (not pregnant)
• Sudden changes in cycle pattern
• Heavy bleeding requiring frequent changes
• Symptoms of anemia

*Menstrual health is an important part of overall wellness. Don't hesitate to discuss concerns with your healthcare provider.*`,
    relatedTopics: ['menstrual-cycle', 'pms', 'womens-health'],
  },
  {
    id: 'menstrual-cycle',
    keywords: ['menstrual cycle', 'cycle phases', 'ovulation', 'follicular phase', 'luteal phase', 'hormones', 'fertility', 'fertile window'],
    title: 'Menstrual Cycle',
    content: `**📊 PROBLEM INFORMATION:**

**Understanding the Menstrual Cycle:**
The menstrual cycle is the monthly hormonal cycle that prepares the body for pregnancy. It involves four distinct phases regulated by hormones.

**The Four Phases:**

**1. Menstruation (Days 1-5):**
• Shedding of uterine lining
• Bleeding occurs
• Hormone levels (estrogen, progesterone) are low
• May experience cramps, fatigue
• Energy levels typically lower

**2. Follicular Phase (Days 1-13):**
• Begins on first day of period
• FSH (follicle-stimulating hormone) rises
• Ovarian follicles develop
• Estrogen levels gradually increase
• Uterine lining begins to thicken
• Energy and mood often improve
• Skin may look clearer

**3. Ovulation (Around Day 14):**
• LH (luteinizing hormone) surges
• Mature egg released from ovary
• Most fertile time of cycle
• Lasts 12-24 hours
• May notice increased cervical mucus (clear, stretchy)
• Slight temperature increase
• Some women feel mild pelvic pain (mittelschmerz)
• Increased libido

**4. Luteal Phase (Days 15-28):**
• After ovulation until next period
• Progesterone rises (prepares uterus for pregnancy)
• Estrogen also elevated
• If no pregnancy, hormone levels drop
• PMS symptoms may occur
• Breast tenderness, bloating
• Mood changes possible
• Energy may decrease

**Hormones Involved:**
• **FSH**: Stimulates follicle growth
• **LH**: Triggers ovulation
• **Estrogen**: Builds uterine lining, affects mood and energy
• **Progesterone**: Maintains uterine lining, prepares for pregnancy

**Fertile Window:**
• Approximately 6 days per cycle
• 5 days before ovulation + day of ovulation
• Sperm can survive 5 days in reproductive tract
• Egg survives 12-24 hours after release
• Highest fertility 2-3 days before ovulation

**Signs of Ovulation:**
• Increased cervical mucus (egg-white consistency)
• Slight rise in basal body temperature
• Mild pelvic or abdominal pain
• Breast tenderness
• Increased libido
• Heightened sense of smell
• Light spotting

**Cycle Variations:**
• Normal cycle length: 21-35 days
• Cycle length can vary month to month
• Stress, illness, travel can affect timing
• First few years after menarche often irregular
• Perimenopause causes irregularity

---

**🛡️ PRECAUTIONS & PREVENTIVE MEASURES:**

**Cycle Tracking:**
• Track period start and end dates
• Note cycle length
• Record symptoms throughout cycle
• Track ovulation signs
• Use fertility awareness apps
• Monitor basal body temperature (if trying to conceive)
• Note cervical mucus changes
• Identify personal patterns

**Hormonal Balance:**
• Eat balanced, nutritious diet
• Include healthy fats (support hormone production)
• Get adequate protein
• Reduce processed foods and sugar
• Manage stress effectively
• Get regular exercise (not excessive)
• Maintain healthy weight
• Get adequate sleep (7-9 hours)

**Phase-Specific Self-Care:**

**During Menstruation:**
• Rest when needed
• Use heat for cramps
• Stay hydrated
• Eat iron-rich foods
• Gentle exercise (walking, yoga)
• Practice self-compassion

**During Follicular Phase:**
• Take advantage of higher energy
• Try new activities or challenges
• Engage in social activities
• Intense workouts often feel easier
• Good time for important tasks

**During Ovulation:**
• Peak energy and mood
• Good time for important meetings or events
• Increased social confidence
• If trying to conceive, this is the time
• If avoiding pregnancy, use protection

**During Luteal Phase:**
• Be gentle with yourself
• Reduce commitments if possible
• Practice stress management
• Eat regular, balanced meals
• Limit caffeine and alcohol
• Get extra rest
• Prepare for upcoming period

**Fertility Awareness:**
• Learn to identify fertile signs
• Use multiple methods (temperature, mucus, calendar)
• Understand that no method is 100% accurate
• Combine with barrier methods if avoiding pregnancy
• Consult healthcare provider for guidance
• Consider fertility awareness classes

**Supporting Hormonal Health:**
• Avoid endocrine disruptors (certain plastics, chemicals)
• Eat organic when possible
• Reduce exposure to toxins
• Manage stress (affects hormones)
• Limit alcohol and caffeine
• Don't smoke
• Consider supplements (consult doctor first)

**Exercise Throughout Cycle:**
• Adjust intensity based on phase
• Higher intensity during follicular phase
• Moderate during ovulation
• Gentler during luteal phase and menstruation
• Listen to your body
• Rest when needed
• Stay active but don't overdo it

**Nutrition Throughout Cycle:**
• **Menstruation**: Iron-rich foods, vitamin C
• **Follicular**: Lean proteins, whole grains, fresh vegetables
• **Ovulation**: Fiber, antioxidants, healthy fats
• **Luteal**: Complex carbs, magnesium, B vitamins, calcium

---

**⚠️ WHEN TO SEEK EMERGENCY CARE:**
• Sudden severe pelvic pain
• Heavy bleeding with dizziness or fainting
• Signs of ectopic pregnancy (severe one-sided pain, shoulder pain, bleeding)

**When to See a Doctor:**
• Cycles consistently shorter than 21 days or longer than 35 days
• Absent periods for 3+ months (not pregnant)
• Severe pain during ovulation
• Difficulty conceiving after 12 months of trying
• Sudden changes in cycle pattern
• Symptoms of hormonal imbalance
• Concerns about fertility

*Understanding your menstrual cycle empowers you to better manage your health and fertility.*`,
    relatedTopics: ['menstrual-periods', 'pms', 'pregnancy', 'pcos'],
  },
  {
    id: 'pregnancy',
    keywords: ['pregnancy', 'pregnant', 'expecting', 'prenatal', 'trimester', 'baby', 'fetus', 'morning sickness', 'prenatal care'],
    title: 'Pregnancy',
    content: `**📊 PROBLEM INFORMATION:**

**Understanding Pregnancy:**
Pregnancy is the period when a fertilized egg develops into a baby, typically lasting about 40 weeks (9 months) divided into three trimesters.

**Early Signs of Pregnancy:**
• Missed period
• Nausea and vomiting (morning sickness)
• Breast tenderness and swelling
• Fatigue and exhaustion
• Frequent urination
• Food aversions or cravings
• Mood swings
• Light spotting (implantation bleeding)
• Mild cramping
• Heightened sense of smell

**The Three Trimesters:**

**First Trimester (Weeks 1-12):**
• Embryo develops major organs and systems
• Heart begins beating around week 6
• Morning sickness often peaks weeks 8-10
• Extreme fatigue common
• Mood swings due to hormonal changes
• Breast tenderness
• Frequent urination
• Food aversions
• Risk of miscarriage highest in first trimester

**Second Trimester (Weeks 13-26):**
• Often called the "honeymoon period"
• Energy levels improve
• Morning sickness usually subsides
• Baby bump becomes visible
• Feel baby's movements (quickening) around weeks 16-20
• Back pain may develop
• Skin changes (darkening, stretch marks)
• Increased appetite
• Braxton Hicks contractions may begin

**Third Trimester (Weeks 27-40):**
• Baby grows rapidly
• Increased discomfort (back pain, pelvic pressure)
• Shortness of breath (baby pressing on diaphragm)
• Frequent urination returns
• Braxton Hicks contractions more frequent
• Swelling of feet and ankles
• Difficulty sleeping
• Nesting instinct
• Preparing for labor and delivery

**Fetal Development Milestones:**
• Week 8: All major organs forming
• Week 12: Sex organs developing
• Week 20: Halfway point, baby very active
• Week 28: Eyes can open, brain developing rapidly
• Week 36: Baby considered "early term"
• Week 40: Full term, ready for birth

---

**🛡️ PRECAUTIONS & PREVENTIVE MEASURES:**

**Prenatal Care (ESSENTIAL):**
• Schedule first prenatal visit as soon as pregnancy confirmed
• Attend all scheduled appointments
• Regular check-ups (monthly until week 28, then more frequent)
• Ultrasounds to monitor baby's development
• Blood tests and screenings
• Monitor blood pressure and weight
• Discuss any concerns with healthcare provider
• Consider prenatal classes

**Nutrition During Pregnancy:**
• Eat balanced, nutritious meals
• Take prenatal vitamins daily (especially folic acid)
• Increase calorie intake (300-500 extra calories/day)
• Eat protein-rich foods
• Include calcium and iron
• Stay hydrated (8-10 glasses water/day)
• Eat frequent small meals (helps with nausea)
• Include folate-rich foods (leafy greens, citrus)

**Foods to Avoid:**
• Raw or undercooked meat, fish, eggs
• Unpasteurized dairy products
• High-mercury fish (shark, swordfish, king mackerel)
• Raw sprouts
• Deli meats (unless heated until steaming)
• Unwashed fruits and vegetables
• Excessive caffeine (limit to 200mg/day)
• Alcohol (no safe amount during pregnancy)

**Substances to Avoid:**
• Alcohol (can cause fetal alcohol syndrome)
• Tobacco (increases risk of complications)
• Recreational drugs
• Certain medications (consult doctor about all medications)
• Excessive vitamin A
• Herbal supplements (many not safe during pregnancy)

**Physical Activity:**
• Exercise regularly with doctor's approval
• Low-impact activities (walking, swimming, prenatal yoga)
• Avoid contact sports and activities with fall risk
• Don't overheat
• Stay hydrated during exercise
• Listen to your body
• Modify exercises as pregnancy progresses
• Pelvic floor exercises (Kegels)

**Managing Common Symptoms:**

**Morning Sickness:**
• Eat small, frequent meals
• Keep crackers by bedside
• Avoid strong smells
• Try ginger (tea, candies)
• Stay hydrated
• Get plenty of rest
• Consider vitamin B6 (consult doctor)

**Fatigue:**
• Rest when possible
• Take short naps
• Go to bed early
• Ask for help with tasks
• Prioritize activities
• Eat iron-rich foods

**Heartburn:**
• Eat small, frequent meals
• Avoid spicy and fatty foods
• Don't lie down right after eating
• Sleep with head elevated
• Wear loose clothing

**Back Pain:**
• Practice good posture
• Wear supportive shoes
• Use pregnancy pillow for sleep
• Apply heat or cold
• Prenatal massage
• Gentle stretching

**Lifestyle Precautions:**
• Avoid hot tubs and saunas (overheating)
• Limit caffeine intake
• Get adequate sleep (7-9 hours)
• Manage stress
• Avoid cat litter (toxoplasmosis risk)
• Wear seatbelt properly (below belly)
• Avoid heavy lifting
• Stay away from harmful chemicals

**Emotional Well-being:**
• Mood swings are normal
• Talk about feelings with partner, friends, family
• Join pregnancy support groups
• Practice stress-reduction techniques
• Get adequate rest
• Prepare for baby's arrival
• Discuss concerns with healthcare provider
• Watch for signs of prenatal depression

**Preparing for Baby:**
• Attend prenatal classes
• Create birth plan
• Choose pediatrician
• Prepare nursery
• Pack hospital bag (around week 36)
• Learn about breastfeeding
• Discuss pain management options for labor
• Understand signs of labor

---

**⚠️ WHEN TO SEEK EMERGENCY CARE:**
• Severe bleeding or passing clots
• Severe abdominal or pelvic pain
• Severe headache with vision changes
• High fever (100.4°F+)
• Sudden severe swelling of face, hands, or feet
• Vision changes (blurred, spots, flashing lights)
• Reduced or absent fetal movement after 20 weeks
• Fluid leakage (possible water breaking)
• Severe persistent vomiting (can't keep anything down)
• Signs of preterm labor (regular contractions before 37 weeks)
• Chest pain or difficulty breathing
• Severe dizziness or fainting

**When to Call Healthcare Provider:**
• Any vaginal bleeding
• Persistent nausea and vomiting
• Painful urination or decreased urination
• Severe headaches
• Swelling of hands, face, or feet
• Decreased fetal movement
• Contractions before 37 weeks
• Any concerns or unusual symptoms

**Signs of Labor (Around 40 Weeks):**
• Regular contractions (increasing in frequency and intensity)
• Water breaking (gush or trickle of fluid)
• Bloody show (mucus plug discharge)
• Lower back pain
• Pelvic pressure

*Pregnancy is a special time requiring careful attention to health. Regular prenatal care is essential for a healthy pregnancy and baby.*`,
    relatedTopics: ['menstrual-cycle', 'prenatal-health', 'womens-health'],
  },
  {
    id: 'pcos',
    keywords: ['pcos', 'polycystic ovary syndrome', 'polycystic ovaries', 'irregular periods', 'hirsutism', 'ovarian cysts'],
    title: 'PCOS (Polycystic Ovary Syndrome)',
    content: `**📊 PROBLEM INFORMATION:**

**What is PCOS?**
Polycystic Ovary Syndrome (PCOS) is a hormonal disorder affecting women of reproductive age. It's one of the most common endocrine disorders, affecting 5-10% of women.

**Main Features of PCOS:**
• Irregular or absent menstrual periods
• Excess androgen (male hormone) levels
• Polycystic ovaries (multiple small cysts on ovaries)
• Insulin resistance

**Common Symptoms:**
• Irregular periods (fewer than 8 per year or absent)
• Heavy bleeding when periods occur
• Excess facial and body hair (hirsutism)
• Acne and oily skin
• Male-pattern baldness or thinning hair
• Weight gain or difficulty losing weight
• Darkened skin patches (neck, armpits, groin)
• Skin tags
• Difficulty getting pregnant (infertility)

**Associated Health Risks:**
• Type 2 diabetes or prediabetes
• High blood pressure
• High cholesterol
• Heart disease
• Sleep apnea
• Endometrial cancer (due to irregular periods)
• Depression and anxiety
• Non-alcoholic fatty liver disease

**Causes and Risk Factors:**
• Exact cause unknown
• Hormonal imbalance (excess androgens)
• Insulin resistance (affects 70% of women with PCOS)
• Low-grade inflammation
• Genetics (runs in families)
• Obesity (worsens symptoms but not a cause)

**Diagnosis:**
Typically requires 2 of 3 criteria:
• Irregular or absent ovulation
• Signs of excess androgens (physical or blood test)
• Polycystic ovaries on ultrasound

---

**🛡️ PRECAUTIONS & PREVENTIVE MEASURES:**

**Weight Management:**
• Even 5-10% weight loss can improve symptoms
• Reduces insulin resistance
• May restore regular periods
• Improves fertility
• Reduces risk of diabetes and heart disease
• Focus on sustainable lifestyle changes
• Don't aim for perfection, progress matters

**Dietary Modifications:**
• Follow low-glycemic index diet
• Choose complex carbohydrates over simple sugars
• Include lean proteins with each meal
• Eat plenty of vegetables and fruits
• Include healthy fats (olive oil, nuts, avocados)
• Limit processed foods and added sugars
• Reduce refined carbohydrates
• Consider anti-inflammatory foods
• Stay hydrated
• Eat regular meals (don't skip)

**Exercise and Physical Activity:**
• Aim for 150 minutes moderate exercise per week
• Combine cardio and strength training
• Exercise helps insulin sensitivity
• Reduces stress and improves mood
• Helps with weight management
• Start slowly and build up
• Find activities you enjoy
• Make it a regular habit

**Managing Insulin Resistance:**
• Eat balanced meals with protein, fat, and fiber
• Avoid eating carbs alone
• Don't skip meals
• Consider smaller, frequent meals
• Limit sugary drinks and foods
• Exercise regularly
• Maintain healthy weight
• Medication (metformin) may be prescribed

**Hormonal Management:**
• Birth control pills can regulate periods
• Helps reduce androgen levels
• Improves acne and excess hair growth
• Protects uterine lining
• Anti-androgen medications may be prescribed
• Discuss options with healthcare provider

**Managing Excess Hair Growth:**
• Hair removal methods (shaving, waxing, laser)
• Prescription creams (eflornithine)
• Anti-androgen medications
• Birth control pills
• Electrolysis for permanent removal
• Be patient - treatments take time

**Skin Care:**
• Use gentle, non-comedogenic products
• Treat acne with appropriate medications
• Consider prescription treatments if needed
• Protect skin from sun
• Manage oily skin with appropriate products
• Consult dermatologist for persistent issues

**Fertility Management:**
• PCOS is leading cause of female infertility
• Weight loss can improve ovulation
• Medications can induce ovulation (clomiphene, letrozole)
• Metformin may help
• Assisted reproductive technologies available
• Consult fertility specialist if trying to conceive
• Track ovulation signs
• Be patient - may take time

**Mental Health:**
• PCOS increases risk of depression and anxiety
• Seek support from friends, family, support groups
• Consider counseling or therapy
• Practice stress-reduction techniques
• Don't isolate yourself
• Address body image concerns
• Medication may be helpful
• Remember PCOS doesn't define you

**Regular Monitoring:**
• Regular check-ups with healthcare provider
• Monitor blood sugar and insulin levels
• Check cholesterol and blood pressure
• Screen for diabetes (especially if overweight)
• Pelvic ultrasounds as recommended
• Endometrial biopsy if prolonged absent periods
• Track menstrual cycles

**Lifestyle Modifications:**
• Quit smoking (worsens insulin resistance)
• Limit alcohol
• Get adequate sleep (7-9 hours)
• Manage stress effectively
• Stay informed about PCOS
• Join support groups
• Advocate for your health

**Medication Options:**
• **Birth control pills**: Regulate periods, reduce androgens
• **Metformin**: Improves insulin sensitivity
• **Anti-androgens**: Reduce excess hair and acne
• **Clomiphene/Letrozole**: Induce ovulation for fertility
• Discuss benefits and risks with doctor

---

**⚠️ WHEN TO SEEK EMERGENCY CARE:**
• Severe abdominal pain
• Heavy vaginal bleeding
• Severe headache with vision changes
• Chest pain or difficulty breathing
• Signs of severe depression or suicidal thoughts

**When to See a Doctor:**
• Irregular or absent periods
• Difficulty getting pregnant after 12 months of trying
• Excess hair growth or severe acne
• Unexplained weight gain
• Symptoms of diabetes (excessive thirst, frequent urination)
• Symptoms of depression or anxiety
• Any concerns about PCOS symptoms

*PCOS is a manageable condition. With proper treatment and lifestyle modifications, most women with PCOS can lead healthy lives and have children if desired.*`,
    relatedTopics: ['menstrual-cycle', 'menstrual-periods', 'diabetes', 'womens-health'],
  },
  {
    id: 'endometriosis',
    keywords: ['endometriosis', 'endo', 'pelvic pain', 'painful periods', 'painful intercourse', 'dysmenorrhea', 'dyspareunia'],
    title: 'Endometriosis',
    content: `**📊 PROBLEM INFORMATION:**

**What is Endometriosis?**
Endometriosis is a condition where tissue similar to the uterine lining grows outside the uterus, causing pain and potentially affecting fertility. It affects approximately 10% of women of reproductive age.

**Common Locations:**
• Ovaries
• Fallopian tubes
• Outer surface of uterus
• Pelvic cavity lining
• Bladder
• Bowel
• Rarely, other areas of body

**Symptoms:**
• Severe pelvic pain, especially during menstruation
• Painful periods (dysmenorrhea) - often worsening over time
• Pain during or after intercourse (dyspareunia)
• Pain with bowel movements or urination (especially during period)
• Heavy menstrual bleeding or bleeding between periods
• Infertility or difficulty getting pregnant
• Fatigue
• Diarrhea, constipation, bloating, or nausea (especially during period)
• Lower back pain

**Stages of Endometriosis:**
• **Stage I (Minimal)**: Small lesions or wounds
• **Stage II (Mild)**: More lesions, slightly deeper
• **Stage III (Moderate)**: Many deep lesions, small cysts on ovaries
• **Stage IV (Severe)**: Many deep lesions, large cysts, extensive scarring

**Causes and Risk Factors:**
• Exact cause unknown
• **Retrograde menstruation theory**: Menstrual blood flows backward
• Immune system factors
• Genetics (runs in families)
• Never having given birth
• Starting periods at early age
• Short menstrual cycles
• Heavy periods lasting more than 7 days
• Low body mass index

**Complications:**
• Infertility (30-50% of women with endometriosis)
• Ovarian cysts (endometriomas or "chocolate cysts")
• Adhesions and scar tissue
• Bowel or bladder problems
• Chronic pain
• Impact on quality of life and mental health

---

**🛡️ PRECAUTIONS & PREVENTIVE MEASURES:**

**Pain Management:**
• Over-the-counter pain relievers (NSAIDs like ibuprofen)
• Start pain medication before pain becomes severe
• Apply heating pad to lower abdomen or back
• Take warm baths
• Try TENS unit (transcutaneous electrical nerve stimulation)
• Gentle massage
• Acupuncture may help some women
• Pelvic floor physical therapy

**Hormonal Therapies:**
• **Birth control pills**: Continuous or cyclic use
• **Progestin therapy**: Pills, injections, or IUD
• **GnRH agonists**: Temporarily stop periods (short-term use)
• **Aromatase inhibitors**: Reduce estrogen production
• Discuss options, benefits, and side effects with doctor
• May take time to find right treatment

**Surgical Options:**
• **Laparoscopy**: Remove or destroy endometrial tissue
• **Hysterectomy**: Last resort for severe cases
• Surgery can improve pain and fertility
• Endometriosis may recur after surgery
• Discuss with specialist (gynecologist or reproductive endocrinologist)

**Dietary Modifications:**
• Anti-inflammatory diet may help
• Increase omega-3 fatty acids (fish, flaxseed)
• Eat plenty of fruits and vegetables
• Choose whole grains
• Limit red meat and processed foods
• Reduce caffeine and alcohol
• Stay hydrated
• Some women find gluten or dairy reduction helpful
• Keep food diary to identify triggers

**Lifestyle Modifications:**
• Regular exercise (reduces estrogen levels, releases endorphins)
• Low-impact activities (walking, swimming, yoga)
• Maintain healthy weight
• Get adequate sleep (7-9 hours)
• Manage stress effectively
• Avoid smoking (worsens symptoms)
• Limit alcohol

**Stress Management:**
• Practice relaxation techniques
• Try meditation or mindfulness
• Deep breathing exercises
• Yoga or gentle stretching
• Counseling or therapy
• Join support groups
• Maintain social connections
• Set realistic expectations

**Fertility Considerations:**
• Endometriosis can affect fertility
• Don't delay trying to conceive if planning pregnancy
• Consult fertility specialist if difficulty conceiving
• Surgery may improve fertility chances
• Assisted reproductive technologies available (IVF)
• Freezing eggs may be option
• Discuss fertility preservation with doctor

**Managing Daily Life:**
• Plan activities around cycle if possible
• Use heating pads or hot water bottles
• Wear comfortable, loose clothing
• Take breaks when needed
• Communicate with employer about condition
• Prepare for flare-ups
• Have pain management plan ready
• Don't push through severe pain

**Complementary Therapies:**
• Acupuncture
• Pelvic floor physical therapy
• Massage therapy
• Chiropractic care
• Herbal supplements (consult doctor first)
• Mind-body techniques
• Always discuss with healthcare provider

**Mental Health Support:**
• Endometriosis can cause depression and anxiety
• Chronic pain affects quality of life
• Seek counseling or therapy
• Join support groups (online or in-person)
• Talk openly with partner, family, friends
• Don't minimize your pain
• Advocate for yourself with healthcare providers
• Remember you're not alone

**Regular Monitoring:**
• Regular check-ups with gynecologist
• Pelvic exams as recommended
• Ultrasounds or MRI if needed
• Track symptoms and pain levels
• Monitor effectiveness of treatments
• Discuss any changes in symptoms
• Keep records of treatments tried

**Working with Healthcare Providers:**
• Find doctor experienced with endometriosis
• Be honest about pain levels
• Keep symptom diary
• Ask questions about treatment options
• Get second opinion if needed
• Consider seeing specialist
• Advocate for yourself
• Don't accept "it's just bad periods"

---

**⚠️ WHEN TO SEEK EMERGENCY CARE:**
• Sudden severe abdominal pain
• Heavy vaginal bleeding (soaking through pad every hour)
• Severe pain with fever
• Difficulty breathing
• Severe nausea and vomiting
• Signs of ruptured cyst (sudden sharp pain, dizziness, fainting)

**When to See a Doctor:**
• Pelvic pain interfering with daily life
• Painful periods that don't respond to over-the-counter medication
• Pain during intercourse
• Difficulty getting pregnant after 6-12 months of trying
• Painful bowel movements or urination during period
• Heavy or irregular bleeding
• Any concerns about symptoms

*Endometriosis is a chronic condition, but with proper treatment and management, symptoms can be controlled and quality of life improved.*`,
    relatedTopics: ['menstrual-periods', 'pelvic-pain', 'infertility', 'womens-health'],
  },
  {
    id: 'pms',
    keywords: ['pms', 'premenstrual syndrome', 'pmdd', 'premenstrual', 'mood swings', 'period symptoms', 'before period'],
    title: 'PMS (Premenstrual Syndrome)',
    content: `**📊 PROBLEM INFORMATION:**

**What is PMS?**
Premenstrual Syndrome (PMS) is a group of physical and emotional symptoms that occur 1-2 weeks before menstruation and typically resolve once the period starts.

**Common Symptoms:**

**Emotional/Behavioral:**
• Mood swings and irritability
• Anxiety or tension
• Depression or sadness
• Crying spells
• Anger or increased conflicts
• Difficulty concentrating
• Confusion or forgetfulness
• Social withdrawal
• Changes in sleep patterns
• Changes in libido

**Physical:**
• Bloating and water retention
• Breast tenderness and swelling
• Headaches or migraines
• Fatigue and low energy
• Food cravings (especially sweets or salt)
• Acne breakouts
• Joint or muscle pain
• Digestive issues (constipation or diarrhea)
• Weight gain (temporary, due to water retention)

**Severity:**
• **Mild PMS**: Noticeable but doesn't interfere with daily life
• **Moderate PMS**: Affects daily activities
• **Severe PMS/PMDD**: Significantly impacts quality of life

**PMDD (Premenstrual Dysphoric Disorder):**
• Severe form of PMS affecting 3-8% of women
• Severe mood symptoms (depression, anxiety, irritability)
• Significantly interferes with work, relationships, daily activities
• Requires medical treatment
• May need antidepressants

**Causes:**
• Hormonal fluctuations (estrogen and progesterone)
• Changes in serotonin levels (brain chemical affecting mood)
• Exact cause not fully understood
• Not caused by hormone imbalance but sensitivity to normal changes

**Risk Factors:**
• History of depression or mood disorders
• Family history of PMS
• High stress levels
• Poor diet
• Lack of exercise
• Insufficient sleep

---

**🛡️ PRECAUTIONS & PREVENTIVE MEASURES:**

**Dietary Modifications:**
• Eat small, frequent meals (stabilizes blood sugar)
• Increase complex carbohydrates (whole grains, vegetables)
• Reduce salt intake (minimizes bloating)
• Limit caffeine (reduces breast tenderness, anxiety)
• Reduce sugar intake (prevents mood swings)
• Limit alcohol (affects mood)
• Increase calcium-rich foods (dairy, leafy greens)
• Include magnesium-rich foods (nuts, seeds, whole grains)
• Eat foods rich in vitamin B6 (chicken, fish, bananas)
• Stay hydrated (8 glasses water/day)

**Supplements (Consult Doctor First):**
• Calcium (1,200 mg/day) - reduces physical and emotional symptoms
• Magnesium (200-400 mg/day) - helps with bloating and mood
• Vitamin B6 (50-100 mg/day) - may improve mood symptoms
• Vitamin E - may reduce breast tenderness
• Evening primrose oil - some women find helpful
• Omega-3 fatty acids - anti-inflammatory

**Exercise:**
• Regular aerobic exercise (30 min/day, most days)
• Reduces stress and improves mood
• Helps with bloating and fatigue
• Releases endorphins (natural mood boosters)
• Try walking, swimming, cycling, dancing
• Yoga or stretching
• Exercise throughout month, not just during PMS

**Stress Management:**
• Practice relaxation techniques daily
• Deep breathing exercises
• Meditation or mindfulness
• Progressive muscle relaxation
• Yoga or tai chi
• Adequate sleep (7-9 hours)
• Time management
• Set boundaries and say no when needed

**Lifestyle Modifications:**
• Maintain regular sleep schedule
• Avoid smoking (worsens symptoms)
• Limit alcohol and caffeine
• Practice good sleep hygiene
• Stay socially connected
• Engage in enjoyable activities
• Plan demanding tasks for non-PMS times if possible

**Symptom Tracking:**
• Keep symptom diary for 2-3 months
• Note physical and emotional symptoms
• Track timing and severity
• Identify patterns
• Helps confirm PMS diagnosis
• Share with healthcare provider
• Use period tracking apps

**Managing Specific Symptoms:**

**Bloating:**
• Reduce sodium intake
• Stay hydrated
• Avoid carbonated drinks
• Eat potassium-rich foods
• Wear comfortable clothing
• Gentle exercise

**Breast Tenderness:**
• Wear supportive bra
• Reduce caffeine
• Apply warm or cold compress
• Consider evening primrose oil
• Avoid tight clothing

**Mood Swings:**
• Practice stress reduction
• Get adequate sleep
• Exercise regularly
• Talk to supportive friends/family
• Consider counseling
• Avoid major decisions during PMS

**Food Cravings:**
• Eat regular, balanced meals
• Choose healthy snacks
• Don't restrict too much (can backfire)
• Allow small portions of craved foods
• Stay hydrated (sometimes thirst feels like hunger)

**Medical Treatments:**
• **Birth control pills**: Can reduce or eliminate PMS
• **Antidepressants (SSRIs)**: For severe PMS or PMDD
• **Diuretics**: For severe bloating (short-term use)
• **NSAIDs**: For pain and cramping
• Discuss options with healthcare provider
• May take trial and error to find what works

**Cognitive Behavioral Therapy (CBT):**
• Helps change negative thought patterns
• Teaches coping strategies
• Effective for emotional symptoms
• Can be combined with medication
• Consider if PMS significantly affects life

**Communication:**
• Inform partner, family about PMS
• Explain symptoms and needs
• Ask for support and understanding
• Don't use PMS as excuse but acknowledge its impact
• Be patient with yourself

**Self-Care:**
• Be gentle with yourself during PMS
• Rest when needed
• Do activities you enjoy
• Practice self-compassion
• Don't schedule too much during this time
• Prepare ahead (have comfort items ready)

---

**⚠️ WHEN TO SEEK EMERGENCY CARE:**
• Thoughts of self-harm or suicide
• Severe depression or anxiety
• Inability to function
• Violent behavior

**When to See a Doctor:**
• Symptoms significantly interfere with daily life
• Symptoms don't improve with self-care
• Severe mood symptoms (possible PMDD)
• Symptoms occur throughout month (may not be PMS)
• Depression or anxiety persists after period starts
• Need help managing symptoms

*PMS is very common and treatable. Don't suffer in silence - many effective treatments are available.*`,
    relatedTopics: ['menstrual-periods', 'menstrual-cycle', 'mental-health', 'womens-health'],
  },
  {
    id: 'menopause',
    keywords: ['menopause', 'perimenopause', 'hot flashes', 'night sweats', 'menopause symptoms', 'change of life', 'postmenopause'],
    title: 'Menopause',
    content: `**📊 PROBLEM INFORMATION:**

**What is Menopause?**
Menopause is the natural end of menstruation and fertility, marking the end of reproductive years. It's diagnosed after 12 consecutive months without a period.

**Typical Age:**
• Average age: 51 years
• Normal range: 45-55 years
• Early menopause: Before age 45
• Premature menopause: Before age 40

**Stages:**

**Perimenopause (Transition):**
• Begins several years before menopause
• Hormone levels fluctuate
• Irregular periods
• Symptoms begin
• Can last 4-8 years
• Still possible to get pregnant

**Menopause:**
• Defined as 12 months without period
• Ovaries stop releasing eggs
• Estrogen and progesterone levels drop significantly
• Marks end of fertility

**Postmenopause:**
• Years after menopause
• Symptoms may continue or ease
• Increased health risks (osteoporosis, heart disease)
• Lasts rest of life

**Common Symptoms:**
• Hot flashes (sudden feeling of heat)
• Night sweats
• Irregular periods (before they stop)
• Vaginal dryness and discomfort
• Sleep disturbances
• Mood changes (irritability, depression, anxiety)
• Difficulty concentrating or memory problems
• Weight gain and slowed metabolism
• Thinning hair and dry skin
• Loss of breast fullness
• Joint and muscle aches
• Decreased libido
• Urinary problems (urgency, frequency, incontinence)

**Causes:**
• Natural decline in reproductive hormones
• Ovaries gradually produce less estrogen and progesterone
• Surgical menopause (removal of ovaries)
• Chemotherapy or radiation therapy
• Primary ovarian insufficiency

**Health Risks After Menopause:**
• Osteoporosis (bone loss)
• Cardiovascular disease
• Weight gain
• Urinary incontinence
• Sexual dysfunction
• Cognitive changes

---

**🛡️ PRECAUTIONS & PREVENTIVE MEASURES:**

**Managing Hot Flashes:**
• Dress in layers
• Keep bedroom cool at night
• Use fan or air conditioning
• Avoid triggers (spicy foods, caffeine, alcohol, stress, heat)
• Drink cold water
• Practice deep breathing when hot flash starts
• Consider moisture-wicking sleepwear
• Keep cold pack handy

**Hormone Replacement Therapy (HRT):**
• Most effective treatment for menopausal symptoms
• Replaces estrogen (and progesterone if you have uterus)
• Benefits: Reduces hot flashes, prevents bone loss, improves vaginal symptoms
• Risks: Increased risk of blood clots, stroke, breast cancer (with long-term use)
• Lowest effective dose for shortest time
• Not suitable for everyone
• Discuss thoroughly with healthcare provider
• Regular monitoring required

**Non-Hormonal Treatments:**
• **Antidepressants (SSRIs, SNRIs)**: Can reduce hot flashes
• **Gabapentin**: May help with hot flashes and sleep
• **Clonidine**: Blood pressure medication that may reduce hot flashes
• **Vaginal estrogen**: Low-dose for vaginal symptoms
• **Ospemifene**: For vaginal dryness
• Discuss options with doctor

**Bone Health:**
• Get adequate calcium (1,200 mg/day after 50)
• Ensure sufficient vitamin D (600-800 IU/day)
• Weight-bearing exercise (walking, dancing, strength training)
• Avoid smoking and excessive alcohol
• Get bone density test (DEXA scan) as recommended
• Consider bisphosphonates if high osteoporosis risk
• Prevent falls (remove tripping hazards, use handrails)

**Heart Health:**
• Eat heart-healthy diet
• Exercise regularly (150 min/week)
• Maintain healthy weight
• Don't smoke
• Limit alcohol
• Manage blood pressure and cholesterol
• Control diabetes if present
• Regular check-ups

**Weight Management:**
• Metabolism slows during menopause
• Eat balanced, nutritious diet
• Control portion sizes
• Increase physical activity
• Strength training (builds muscle, boosts metabolism)
• Reduce processed foods and added sugars
• Stay hydrated
• Get adequate sleep

**Vaginal and Sexual Health:**
• Use water-based lubricants for dryness
• Regular sexual activity (improves blood flow)
• Vaginal moisturizers (used regularly, not just during sex)
• Low-dose vaginal estrogen (very effective, minimal absorption)
• Pelvic floor exercises (Kegels)
• Communicate with partner
• Consider sex therapy if needed

**Sleep Improvement:**
• Maintain consistent sleep schedule
• Keep bedroom cool and dark
• Avoid caffeine and alcohol before bed
• Exercise regularly (but not close to bedtime)
• Practice relaxation techniques
• Limit screen time before bed
• Manage night sweats (cooling sheets, fan)
• Consider cognitive behavioral therapy for insomnia

**Mood and Mental Health:**
• Stay socially connected
• Exercise regularly (improves mood)
• Practice stress-reduction techniques
• Get adequate sleep
• Eat balanced diet
• Consider counseling or therapy
• Join menopause support groups
• Antidepressants if needed
• Don't dismiss mood changes as "just menopause"

**Lifestyle Modifications:**
• Quit smoking (worsens symptoms, increases health risks)
• Limit alcohol (triggers hot flashes, affects sleep)
• Manage stress effectively
• Stay physically active
• Maintain healthy weight
• Eat nutritious diet
• Stay hydrated
• Engage in enjoyable activities

**Dietary Recommendations:**
• Eat plenty of fruits and vegetables
• Choose whole grains
• Include lean proteins
• Calcium-rich foods (dairy, leafy greens, fortified foods)
• Omega-3 fatty acids (fish, flaxseed, walnuts)
• Soy products (may help some women with hot flashes)
• Limit processed foods, sugar, saturated fats
• Reduce sodium

**Complementary Therapies:**
• **Acupuncture**: May help with hot flashes
• **Yoga**: Reduces stress, improves flexibility
• **Meditation and mindfulness**: Helps with mood and stress
• **Black cohosh**: Some evidence for hot flashes (consult doctor)
• **Evening primrose oil**: Limited evidence
• **Phytoestrogens**: Plant-based estrogens (soy, flaxseed)
• Always discuss supplements with healthcare provider

**Regular Health Screenings:**
• Annual physical exams
• Blood pressure checks
• Cholesterol screening
• Bone density test (baseline at menopause, then as recommended)
• Mammograms (annually or as recommended)
• Pelvic exams and Pap smears
• Colorectal cancer screening (starting at 45-50)
• Skin checks

**Skin and Hair Care:**
• Use moisturizer daily
• Protect skin from sun (SPF 30+)
• Stay hydrated
• Eat foods rich in antioxidants
• Consider collagen supplements (limited evidence)
• Use gentle hair products
• Avoid excessive heat styling

---

**⚠️ WHEN TO SEEK EMERGENCY CARE:**
• Chest pain or pressure
• Sudden severe headache
• Vision changes or loss
• Difficulty speaking or weakness
• Severe bleeding after menopause
• Signs of blood clot (leg pain, swelling, warmth)

**When to See a Doctor:**
• Symptoms significantly affecting quality of life
• Bleeding after 12 months without period
• Severe mood changes or depression
• Vaginal symptoms not improving with over-the-counter treatments
• Concerns about HRT or other treatments
• Questions about menopause management
• Any unusual or concerning symptoms

*Menopause is a natural transition, not a disease. With proper management, most women navigate this phase successfully and maintain excellent quality of life.*`,
    relatedTopics: ['menstrual-periods', 'bone-health', 'heart-health', 'womens-health'],
  },
];

export const medicalKnowledgeBase: Record<string, MedicalTopic> = medicalTopics.reduce(
  (acc, topic) => {
    acc[topic.id] = topic;
    return acc;
  },
  {} as Record<string, MedicalTopic>
);

export function findMedicalTopic(query: string): MedicalTopic | null {
  const lowerQuery = query.toLowerCase();
  
  // First try exact or close keyword match
  for (const topic of medicalTopics) {
    if (topic.keywords.some(keyword => lowerQuery.includes(keyword))) {
      return topic;
    }
  }
  
  // Then try partial matches in title
  for (const topic of medicalTopics) {
    if (lowerQuery.includes(topic.title.toLowerCase()) || 
        topic.title.toLowerCase().includes(lowerQuery)) {
      return topic;
    }
  }
  
  return null;
}

export function getAllTopicTitles(): string[] {
  return medicalTopics.map(topic => topic.title);
}
