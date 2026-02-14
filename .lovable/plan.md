

## Plan: Solid Blue Background for Entire Page

### What will change

1. **`src/index.css`** - Change the `--background` CSS variable from white (`0 0% 100%`) to a solid blue color (e.g., `210 55% 55%` - a medium blue matching the ocean theme). This will make the entire page body blue.

2. **`src/pages/Index.tsx`** - Remove the hero section gradient (`bg-gradient-to-br from-ocean via-ocean-light to-secondary`) so it blends with the solid blue background instead of having its own gradient.

3. **`src/pages/Index.tsx`** - Update text and card colors as needed to ensure readability on the blue background (e.g., white text for sections, semi-transparent white cards).

4. **Other pages** (About, Contact, Gallery, Offer, Spot) - Quick check and adjust any section backgrounds that clash with the new solid blue body.

5. **`src/components/Footer.tsx`** - Potentially simplify the footer background since the page is already blue.

### Technical details

- The `--background` variable controls `bg-background` used globally via Tailwind
- Cards, popovers, dialogs etc. use `bg-card` / `bg-background` - these may need to stay lighter for contrast, so we may set `--card` to white while `--background` is blue
- The `--foreground` text color will need to become white/light to be readable on blue
