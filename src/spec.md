# Specification

## Summary
**Goal:** Add local phone number + password sign-in and a new sign-up flow (full name, phone number, password) while keeping existing sign-in options.

**Planned changes:**
- Add a self-contained frontend demo credential store (e.g., localStorage) to create and verify accounts using fullName, phoneNumber (unique), and password (or password-derived value).
- Create a new Sign Up page/route (e.g., `/signup`) with validation, account creation, auto sign-in, and redirect to `/home`.
- Update the existing Sign In page to support phone number + password sign-in and add navigation to the Sign Up page, while retaining Internet Identity and Continue as Guest options.
- Extend local session handling and route guarding to treat password-based sessions as authenticated, ensure sign-out clears them, and hide the app shell navigation on `/signup` similarly to `/signin`.

**User-visible outcome:** Users can create an account with full name, phone number, and password, then sign in with phone + password (or continue using existing sign-in methods) and reach `/home` when authenticated.
