# Specification

## Summary
**Goal:** Remove all empty, unused, and deprecated frontend files to keep the codebase clean.

**Planned changes:**
- Delete empty page files: `AppointmentDetails.tsx`, `Chatbot.tsx`, `DoctorList.tsx`, `HomeDashboard.tsx`, `Locate.tsx`
- Delete empty assistant component files: `CustomQAManager.tsx`, `customQAStorage.ts`, `customQATypes.ts`, `fuzzyQAMatcher.ts`, `useCustomQA.ts`
- Delete deprecated `reportMetadataStore.ts` if no active file imports it
- Delete empty `feature_evidence.json` from the project root
- Remove any remaining import references to the deleted files

**User-visible outcome:** The application continues to work exactly as before, with all active routes and features intact, but the codebase no longer contains empty or unused files.
