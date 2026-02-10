# Specification

## Summary
**Goal:** Persist non-Internet-Identity authentication so users remain signed in after a page refresh, with basic validation and sensible redirects.

**Planned changes:**
- Persist OTP, password, and guest sign-in state in localStorage using the existing `healthcare_local_session` key so protected routes treat a valid stored session as authenticated after reload.
- Add local session validation (expected type/shape and an expiration window based on stored timestamp) so malformed or expired sessions are treated as signed out.
- Ensure signing out clears the saved local session so refresh no longer authenticates the user.
- When already authenticated (Internet Identity present or valid local session), redirect visits to `/` and `/signin` to `/home`.

**User-visible outcome:** After signing in via OTP, password, or guest, reloading the page keeps the user signed in and able to access protected routes; expired/invalid saved sessions require signing in again; authenticated users are automatically sent to `/home` when visiting `/` or `/signin`.
