---
name: culfest-design-system
description: Design or review CulFest interfaces within the existing visual identity. Use for public pages, admin screens, responsive layouts, accessibility, component states, or branding changes.
---

# CulFest design system

1. Compare the requested screen with the [public homepage](../../../app/home/page.tsx), [root layout](../../../app/layout.tsx), [global styles](../../../app/globals.css), and [admin sign-in](../../../app/Admin/AdminLoginForm.tsx). Use the [page inventory](../../../docs/architecture.md#page-inventory) to find related screens.
2. Reuse the festival red and warm accents, bundled EFCO Brookshire and Merriweather, and existing cultural artwork in `public/images/` where appropriate. Match the surrounding route before adding styles or assets. Avoid generic hero layouts, gradients, badges, and decorative copy that do not fit the site.
3. Make admin screens practical. Use clear labels, visible actions, and predictable lists and forms. Show real records where available and use approved fixtures for demos. Give loading, empty, and error states meaningful next actions where applicable.
4. Verify keyboard flow, visible focus, labels, contrast, and readable layouts at mobile and desktop widths. Preserve route behavior and the public site's cultural identity.
