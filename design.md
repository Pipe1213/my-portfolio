# Design: felipe-espinosa.vercel.app

The locked system. Every Hallmark run reads this first and pages share it. Change it on purpose; the file is the rule.

## System
- Genre: editorial
- Shape: Index-First on the home page (the project index is the hero); case studies are long documents
- Theme: Almanac, repainted warm graphite at the owner's request, with five project colours used as marks
- Axes: light/grotesk-sans/full-palette · posture: full-palette (each project colour is a mark, never a field)
- Modes: light and dark, following the system, with a toggle stored in localStorage (`data-theme` on `<html>`)

## Tokens
`site/assets/tokens.css` holds the scaffold's scales; the page tokens at the top of `site/assets/site.css` override its colours and are the source of truth.
```css
:root {
  --color-paper: oklch(97% 0.004 100);  --color-sheet: oklch(99% 0.002 100);  --color-ink: oklch(21% 0.005 100);
  --color-muted: oklch(47% 0.010 90);  --color-rule: oklch(88.5% 0.006 100);  --color-rule-2: oklch(36% 0.006 100);
  --c-rob: oklch(44% 0.120 320);  --c-ask: oklch(45% 0.130 40);  --c-cfm: oklch(44% 0.075 175);
  --c-wal: oklch(46% 0.095 85);   --c-rov: oklch(46% 0.100 130);
  --font-display: "Hanken Grotesk";  --font-body: "Newsreader";  --font-outlier: "IBM Plex Mono" (figures only);
  --radius-card: 0;  --radius-pill: 2px;  --rule-hair: 1px;  --rule-bar: 2px;  --shadow-card: none;
}
```
Dark: paper oklch(19% 0.004 100), ink oklch(94% 0.006 100), project colours lifted to L 77 to 87. No navy, anywhere. Every text pair is 6:1 or better.

## Project colours
`.w-rob` plum, `.w-ask` rust, `.w-cfm` teal, `.w-wal` Walloon yellow (ochre on light paper), `.w-rov` field green. A class sets `--color-accent` for its scope. Colour appears only as: the year in the home index, the 2px rule on top of a sheet, one chart series or bar, a playing control, list markers and step numerals. Never a band or a fill behind text.

## Surfaces
- Two rule weights: 1px hairlines part rows; a 2px rule heads every section, table and sheet.
- The sheet (`--color-sheet`, a 2px accent rule at its head) carries evidence: videos, charts, tables, the spec list. Prose never sits on it.
- One ink band per page at most: the Walloon voices on the home page, the listening screen on /walloon.
- Square corners; no shadows; photographs carry a 1px inset outline.

## Type
- Heads: Hanken Grotesk 600, tracking -0.02 to -0.035em, sentence case. h1 at `--text-display`, h2 at `--text-section`.
- Body: Newsreader at 19px (`--text-body`), 350 weight in dark mode. Labels and captions: the body face a step smaller, muted, never capitals.
- Figures that compare (scores, dates, costs, table numbers): IBM Plex Mono, tabular, right-aligned in columns.

## Controls
- Play buttons and the theme switch: 44px square, 1px ink outline, filled with the project colour while playing.
- Links: ink, underlined; the accent colours the underline. Focus: a 2px ring in ink (or the band's yellow on the ink band), never animated.
- Video controls sit beside the caption, never over the frame.

## Motion
Cross-document View Transitions (each project band and title morph into its case-study header and h1). State changes are colour only. Nothing reveals on scroll. All of it is off under reduced motion.

## Copy
Verbatim. The owner's words and numbers are final; layout never rewrites them.
