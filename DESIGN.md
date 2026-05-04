# Deskorelax Design Context

Color strategy: committed warm-light brand surface with lake-blue structure and sun/wind accent colors.

Theme scene: a visitor checks the site on a bright afternoon before booking a summer course, with lake photos carrying the mood and interface elements staying clear in sunlight.

Core tokens:
- Background: warm tinted daylight, never pure white.
- Foreground: deep blue-black, never pure black.
- Primary: lake blue.
- Accent: sun coral and sail yellow used sparingly.
- Surfaces: semi-warm cards with subtle depth, and deep lake-blue panels for emphasis.

Typography:
- Existing `Bricolage Grotesque` and `Manrope` stay to preserve continuity.
- Headlines should be large and confident, with normal letter spacing.
- Body copy should stay readable and calm, especially on mobile.

Motion:
- Framer Motion powers page, hero, modal, and drawer transitions.
- CSS handles hover states and small atmospheric effects.
- Use transform, opacity, and bounded blur. Avoid layout-property animation.
- Respect `prefers-reduced-motion`.

Components:
- Buttons are rounded and tactile, with icons where appropriate.
- Cards should feel editorial and image-led, not repeated icon templates.
- Page heroes should share a stronger system while allowing each page to keep its own media or content.
