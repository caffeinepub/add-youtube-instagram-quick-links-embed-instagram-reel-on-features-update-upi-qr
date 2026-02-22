# Specification

## Summary
**Goal:** Fix mobile layout alignment issue on Android devices where content is shifted to the right.

**Planned changes:**
- Review and fix responsive CSS styles in index.css and component-level styles to eliminate right-alignment and horizontal overflow on mobile viewports
- Ensure proper viewport meta tag configuration for mobile devices
- Implement mobile-first responsive breakpoints and proper width constraints on all containers
- Verify all interactive elements are accessible without horizontal scrolling on narrow screens

**User-visible outcome:** The website will be properly centered on Android mobile devices with no horizontal overflow or right-side shift, while the desktop layout remains unchanged.
