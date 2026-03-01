# Specification

## Summary
**Goal:** Remove any Firebase or external cloud database integration and ensure all data persistence relies solely on the ICP backend (Motoko actor) or localStorage.

**Planned changes:**
- Remove all Firebase SDK dependencies and configuration
- Replace any Firebase Firestore or Realtime Database calls with ICP backend (Motoko actor) or localStorage equivalents

**User-visible outcome:** The application functions as before, but without any Firebase or external cloud database dependency — all data is stored via the ICP backend or localStorage.
