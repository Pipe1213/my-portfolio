# Portfolio: felipe-espinosa.vercel.app

Working notes for Claude Code. They record what has been built and decided, the rules every change must follow, and what comes next. Update this file whenever a decision changes.
Owner: Felipe Espinosa Orjuela. The fuller private record lives in the claude.ai project "Job Application Things" (`claude/PORTFOLIO_DESIGN_2026-10-11.md`, `claude/PROJECT_CONTEXT.md`).

## Current status (update this first)

*Last updated 17 Oct 2026, 16:45.*

- **17 Oct:** hero line now reads "Paris, France. Authorised to work in France, available now." (approved by Felipe, pushed straight to `main`; checked at 390/768/1440 px, dark and light). Matches the CV header and LinkedIn About. The og description was left unchanged on purpose. Bolívar has no location on the site; if one is ever added, it is "Remote", never "Colombia".

- **Live:** `main` at visual v2 (approved by Felipe, merged 12 Oct 01:10). No branch is in progress. `redesign` and `visual-v2` are old and can be deleted.
- **Next portfolio task: AskData content fixes** (agreed in principle, not started; discuss the wording with Felipe before editing):
  1. The home-page screenshot (`site/assets/img/askdata-chart.jpg`) shows the app's **known wrong answer**: "Marion, 64.87" for the top-10 customers. The true leader is Karl Seal, $221.55; the app missed a partitioned table. Replace it once the partition fix is in AskData, or crop it so no answer is shown. Even better, use the before/after as the AskData story.
  2. `/askdata` says "a benchmark script with three sets of 10 questions". That is outdated. The real state is a **52-question eval set** (20 dev + 32 held-out, including ambiguous and unanswerable questions) with a scorer, and **no results yet**. `askdata-details.jpg` (on `/askdata`) shows the **same wrong table**, plus the faulty SQL that unions single `payment_p2022_*` partitions, under a caption that calls it "validated". It needs the same fix.
  3. The angle to use: "asks instead of guessing". Never quote numbers until a real eval run exists.
- **After that, nothing is scheduled on the site until the robotics project has results** (page `/robot-learning`, target public Mon 16 Nov 2026).

## How the site works

- Plain static HTML, CSS and JS in `site/`. No framework and no build step. Vercel serves `site/` as is (`vercel.json`: framework null, cleanUrls, redirects from the old Next.js routes).
- Pages: `site/index.html` (home), `site/walloon/`, `site/cfm/`, `site/askdata/` (case studies), `site/404.html`.
- `site/assets/site.css` holds all styles; `site/assets/site.js` handles the theme toggle, audio (one clip at a time), the spectrogram playhead and the Walloon voice switch.
- Fonts are self-hosted WOFF subsets in `site/assets/fonts/` (OFL licences included):
  - Archivo, variable width 62–125, used for UI and display;
  - Newsreader, normal and italic, used for body text.
  - Subsets were made with fontTools from the google/fonts repo. If you need new glyphs, re-subset from source; don't link to Google Fonts.
- Spectrograms: `site/assets/spec/spec-<clip>.webp` are white alpha masks, regenerated with `python tools/make_spectrograms.py site/assets/audio/*.mp3`. CSS colours them (`.spec` uses `mask: var(--m)`) and the playhead is the CSS variable `--p`, set by `site.js` on `timeupdate`.
- Link previews: `site/og.png` (home), plus `og-walloon.png`, `og-cfm.png` and `og-askdata.png`.
- Local preview: `python3 -m http.server -d site 8765`. That server has no clean URLs, so `/cfm` becomes `/cfm/`.
- Test with Playwright before every push:
  - viewports 390, 768 and 1440 px, in both dark and light;
  - no horizontal overflow and no console errors;
  - fonts loaded and audio plays with the playhead advancing;
  - the voice switch updates scores and clips;
  - the theme persists after a reload.
- Workflow: work on a branch, push it, check the Vercel preview, and merge to `main` (which is live) **only after Felipe says OK**.

## Visual identity (decided)

- Warm graphite base: dark `#161615`, light `#F7F7F5`. Dark mode is required (Felipe uses dark everywhere); the site follows the system and has a toggle stored in localStorage. **No navy, anywhere.**
- Each project has its own colour world, set by a class:

  | Project | Class | Colour |
  |---|---|---|
  | CFM | `.w-cfm` | teal |
  | Walloon | `.w-wal` | Walloon-flag yellow |
  | AskData | `.w-ask` | rust |
  | Rover | `.w-rov` | field green |

  The tokens are `--sf`, `--ac`, `--mu` and `--prl`. All colour pairs were checked at 5.3:1 or better (WCAG AA).
- Projects are full-bleed colour bands, not cards. Numbers are set in prose (`.num`), with no stat tiles. Links are plain underlined text, never pills.
- The signature element is real spectrograms of Felipe's own Walloon model audio. They appear only where they can be played: the two clips on the home page, and the large screen above the scores on `/walloon`. Never use one as decoration.
- Motion:
  - cross-document View Transitions: on the home page each band and title has `view-transition-name: cfm-band` / `cfm-title` (and the same for `wal` and `ask`), which morph into the case-study header and h1;
  - one scroll effect: bands rise in using `animation-timeline: view()`.
  - Everything is off under `prefers-reduced-motion`. **Don't add more animation**: animating everything on scroll is what makes a site look like a template.
- Footer colophon: "Set in Archivo and Newsreader. The spectrograms are computed from my models' own audio. Built by hand, no framework." The tab icon is spectrogram bars in yellow-to-coral.

## Content decisions (decided)

- Hero: name, "AI/ML Engineer", "LLM agents, generative models and evaluation", location, work authorisation and availability ("available now"), links to the four projects, and the portrait on the side. **No summary-style sentence. No CV download.** CVs go out only on request.
- The page balances two kinds of reader:
  - ML research / robotics (Lane A): Walloon TTS, publications, the rover;
  - applied AI engineering (Lane B): CFM agent, AskData.
- Selected work order: CFM, Walloon, AskData, then a one-line mention of the NER dataset. Each band should fit on one laptop screen.
- Research: the publication list comes first, newest first. The 2014 rover is the last item, as a green band holding its two 2014 papers, so the date is honest and the path reads robotics → speech → LLM agents.
- Writing style: every sentence names a thing, place or number. Never claim anything Felipe can't defend in an interview.

## Fact rules (never break these)

- Walloon MOS is **4.10/5**; natural speech scored 4.48–4.55, with 23 listeners. "4.22" was a confidence-interval bound and must not appear as a result.
- Walloon: first author, oral at SSW 2025, poster at LT4All 2025. Felipe did **not** write the G2P converter; it was the group's rule-based converter.
- CFM:
  - describe it as "built for analysts";
  - never "prototype", never "deployed", no production users or scale;
  - don't mention the CI or deployment tooling;
  - the code belongs to CFM, and only the approved internship report is linked.
- Rover photos credit **Tati Zanichelli**. The drone in the photo was a hand-flown demonstrator, not Felipe's work. Felipe's role: propulsion and steering, motors, controllers and sensors, motion and collision-avoidance routines, and field trials. Co-author, never "first author", for the USP work.
- Only the 2014 rover publications that are listed may appear; don't add any other 2014 paper.
- The phone number never appears on the site or in the repo.
- Private take-home repos stay private; don't link them.

## History

- **11 Oct 2026:** the old Next.js template site was replaced by this static rebuild. History was rewritten to remove old CVs containing the phone number; old Vercel deployments sit behind Vercel login.
- **12 Oct 2026, branch `visual-v2`:**
  - added the Newsreader serif body, full-bleed bands, numbers in prose and plain links;
  - added spectrograms with a playhead and the Walloon spectrogram screen;
  - added the colophon and the new favicon;
  - removed the hero spectrogram, at Felipe's request: it broke the flow from intro to work;
  - made the bands more compact, moved the rover after the publications, and added View Transitions plus one scroll effect.
  - Felipe approved it and it was merged to `main` (live) on 12 Oct 2026, 01:10.

## Next

1. **AskData content fixes** (see Current status).
2. **AskData results** (AskData phase 4, after its eval runs; scheduled around 21 and 28 Oct): update `/askdata` with baseline vs final, dev vs held-out and the limits found; update the home band text and screenshot; GIF; consider a hosted demo.
3. **Robotics page `/robot-learning`** (deliverable D3 of the robotics plan, in the project doc `ROBOTICS_PROJECT_PLAN_2026-10-12.md`):
   - LeRobot + LIBERO, ACT from scratch vs SmolVLA fine-tuned, 5/10/20/all demos, success rate with Wilson 95% CIs.
   - Build it only from real results, in the same format as `/walloon`: headline plot, results table, success and failure GIFs, links to the repo, Hub checkpoints and write-up.
   - Add a home-page band above the 2014 rover, which stays as the origin. Give it its own colour world (not navy).
   - Also add an og image, a sitemap entry and a nav/index link.
   - Target public Mon 16 Nov 2026 (stretch 9 Nov). Until then the site doesn't mention the project.
4. **CLSE paper:** when it's accepted, link it and update "Under review".
5. Possibly a short "Writing" or "Notes" section later, but only if there are real posts.
6. After each content change, check link previews with LinkedIn Post Inspector.
