# Specification

## Summary
**Goal:** Expand the Health Assistant Pro with comprehensive multi-specialty medical knowledge across 10 specialties, structured summarized responses, specialty routing logic, specialty badges on responses, and a specialty selector UI.

**Planned changes:**
- Expand `specialtyKnowledgeBase.ts` with detailed entries for all 10 specialties (cardiologist, dermatologist, pediatrician, surgeon, neurologist, general practitioner, anesthesiologist, oncologist, gynecologist, radiologist), each including keywords, conditions, symptoms, diagnostic tools, treatments, red flags, and formatted content
- Expand `medicalKnowledgeBase.ts` with conditions and topics across all 10 specialties (e.g., heart disease, arrhythmia, acne, eczema, migraines, epilepsy, cancer types, pregnancy, imaging modalities, etc.)
- Update `assistantBrain.ts` routing logic to correctly route queries to all 10 specialty handlers, with fallback to general practitioner when no specialty is matched
- Update `messageSummarizer.ts` and `responseFormatter.ts` to produce concise, structured responses using bullet points with sections: Diagnosis, Treatment, Prevention, and When to See a Doctor
- Update `Chat.tsx` and `AssistantPanel.tsx` to display a specialty badge (e.g., 🫀 Cardiology, 🧠 Neurology) on assistant messages generated from specialty knowledge
- Add a specialty selector UI (dropdown or chips) on the Chat page listing all 10 specialties plus an "Auto-detect" default option, which directs the assistant to use the selected specialty's knowledge base

**User-visible outcome:** Users can ask health questions and receive concise, structured answers tagged with the relevant medical specialty badge. They can also manually select a specialty to direct their question, or leave it on Auto-detect for automatic routing.
