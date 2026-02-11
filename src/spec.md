# Specification

## Summary
**Goal:** Fix chat transcript scrolling on the /chat page so it’s smooth, reliably scrollable within the viewport, and auto-scroll-to-bottom works consistently when new messages arrive.

**Planned changes:**
- Update the /chat layout so the transcript area correctly takes the remaining available height and becomes a reliably scrollable region (avoiding common flex/min-height/overflow issues that can make it feel “stuck”).
- Adjust scroll handling so auto-scroll-to-bottom targets the actual scrollable transcript viewport (not a non-scrollable wrapper), and behaves sensibly when the user has scrolled up.
- Implement the above without modifying any files under frontend/src/components/ui, composing around existing UI components instead.

**User-visible outcome:** On /chat, long conversations scroll naturally without getting stuck; the header and input stay usable while the transcript scrolls independently; and new messages reliably appear at the bottom without janky jumps.
