# Specification

## Summary
**Goal:** Update the Home Dashboard Quick Actions to replace “Book Appointment” with a “Log Avoid” action without introducing new navigation.

**Planned changes:**
- Remove the “Book Appointment” tile from the /home Quick Actions grid and replace it with a tile labeled exactly “Log Avoid”, keeping the same grid position.
- Wire the “Log Avoid” tile click to a safe placeholder action (e.g., console logging) that does not navigate to any route and does not throw errors.

**User-visible outcome:** On /home, users see “Log Avoid” instead of “Book Appointment” in Quick Actions, and clicking it safely performs a placeholder action while staying on the same page.
