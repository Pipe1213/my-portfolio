# Portfolio: felipe-espinosa.vercel.app

Working notes for Claude Code. They record what has been built and decided, the rules every change must follow, and what comes next. Update this file whenever a decision changes.
Owner: Felipe Espinosa Orjuela. The fuller private record lives in the claude.ai project "Job Application Things" (`claude/PORTFOLIO_DESIGN_2026-10-11.md`, `claude/PROJECT_CONTEXT.md`).

## Current status (update this first)

*Last updated 28 Oct 2026, 22:45.*

- **28 Oct, 22:45: `content-2026-10` merged to `main` (live), approved by Felipe.** Three content commits:
  1. `6f7c375` text fixes: CFM is built for the **data referential team** (not "analysts"); "giving each task a suitable model"; context examples **kept separate from the benchmark**; CLSE **first author**; rover adds LIBS, ultrasonic sensors, Raspberry Pi and Arduino; titles **LLM Evaluation Specialist (freelance)** and **Business Owner, demolition and renovation subcontracting**; tools line; NER line removed; new `og-cfm.png`.
  2. `69de9e3` AskData finished: `/askdata` rewritten (6 steps, results table, safety, limits, light/dark architecture SVG, 4 demo videos); both screenshots with the old wrong answer deleted; new `og-askdata.png`. Adds shared styles (`.cs-sec`, `.tbl`, `.steps`, `.vid`, `.chart`) and in-view video playback in `site.js`.
  3. `70316b9` robot learning: `/robot-learning` page, home band **first** in Selected work, hero link, `.w-rob` colour world, `og-robot-learning.png`, sitemap; case-study prev/next follow the home order.
- **Next (Felipe, in a separate Claude Code session): visual pass, on a new branch from `main` (e.g. `visual-2026-10`).** The content and numbers are final; change layout, type and colour freely, but not the wording or numbers without asking Felipe. Known points to look at:
  - `.w-rob` is a **placeholder plum** (light `#F0E7F1/#7A3B8C/#5F4A64/#DCC8DF`, dark `#2B1D30/#DDA8EC/#C9B6CE/#4A3350`, contrast checked ≥ 6:1). Felipe may pick another; keep ≥ 5.3:1 and no navy.
  - The video play button sits top-left over the video; on the AskData demo it covers the app's logo.
  - The success-rate chart (inline SVG in `/robot-learning`): the ACT "55.4%" label crowds the line; on phones the chart scrolls sideways at a fixed min width.
  - Table and step styles are deliberately plain.
- After merge: LinkedIn Post Inspector on `/`, `/askdata`, `/robot-learning`; Felipe points the LinkedIn Featured cards to `/robot-learning` and `/askdata`.

## How the site works

- Plain static HTML, CSS and JS in `site/`. No framework and no build step. Vercel serves `site/` as is (`vercel.json`: framework null, cleanUrls, redirects from the old Next.js routes).
- Pages: `site/index.html` (home), `site/robot-learning/`, `site/cfm/`, `site/walloon/`, `site/askdata/` (case studies), `site/404.html`.
- `site/assets/site.css` holds all styles; `site/assets/site.js` handles the theme toggle, audio (one clip at a time), the spectrogram playhead, the Walloon voice switch, and the demo videos (play while ≥ 50% in view, click or button toggles, never autoplay under `prefers-reduced-motion`).
- Demo videos live in `site/assets/video/` (H.264 MP4 + `-poster.jpg`, each < 400 KB), converted from the project READMEs' GIFs. The robot clips are 512×256 simulator renders: left/right must be named in the caption.
- Fonts are self-hosted WOFF subsets in `site/assets/fonts/` (OFL licences included):
  - Archivo, variable width 62–125, used for UI and display;
  - Newsreader, normal and italic, used for body text.
  - Subsets were made with fontTools from the google/fonts repo. If you need new glyphs, re-subset from source; don't link to Google Fonts.
- Spectrograms: `site/assets/spec/spec-<clip>.webp` are white alpha masks, regenerated with `python tools/make_spectrograms.py site/assets/audio/*.mp3`. CSS colours them (`.spec` uses `mask: var(--m)`) and the playhead is the CSS variable `--p`, set by `site.js` on `timeupdate`.
- Link previews: `site/og.png` (home), plus `og-walloon.png`, `og-cfm.png`, `og-askdata.png` and `og-robot-learning.png` (1200×630, Archivo on the project's dark surface colour; rendered with Playwright from a temporary HTML page).
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
  | Robot learning | `.w-rob` | plum (placeholder, 28 Oct) |

  The tokens are `--sf`, `--ac`, `--mu` and `--prl`. All colour pairs were checked at 5.3:1 or better (WCAG AA).
- Projects are full-bleed colour bands, not cards. Numbers are set in prose (`.num`), with no stat tiles. Links are plain underlined text, never pills.
- The signature element is real spectrograms of Felipe's own Walloon model audio. They appear only where they can be played: the two clips on the home page, and the large screen above the scores on `/walloon`. Never use one as decoration.
- Motion:
  - cross-document View Transitions: on the home page each band and title has `view-transition-name: cfm-band` / `cfm-title` (and the same for `wal`, `ask` and `rob`), which morph into the case-study header and h1;
  - demo videos loop only while in view (content, not decoration); nothing else moves;
  - one scroll effect: bands rise in using `animation-timeline: view()`.
  - Everything is off under `prefers-reduced-motion`. **Don't add more animation**: animating everything on scroll is what makes a site look like a template.
- Footer colophon: "Set in Archivo and Newsreader. The spectrograms are computed from my models' own audio. Built by hand, no framework." The tab icon is spectrogram bars in yellow-to-coral.

## Content decisions (decided)

- Hero: name, "AI/ML Engineer", "LLM agents, generative models and evaluation" (matches the LinkedIn headline), location, work authorisation and availability ("available now"), links to the five projects (Robot learning first), and the portrait on the side. **No summary-style sentence. No CV download.** CVs go out only on request.
- The page balances two kinds of reader:
  - ML research / robotics (Lane A): robot learning, Walloon TTS, publications, the rover;
  - applied AI engineering (Lane B): CFM agent, AskData.
- Selected work order (28 Oct): **Robot learning, CFM, Walloon, AskData**. The NER line was removed (28 Oct). Each band should fit on one laptop screen.
- Research: the publication list comes first, newest first. The 2014 rover is the last item, as a green band holding its two 2014 papers, so the date is honest and the path reads robotics → speech → LLM agents.
- Writing style: every sentence names a thing, place or number. Never claim anything Felipe can't defend in an interview.

## Fact rules (never break these)

- Walloon MOS is **4.10/5**; natural speech scored 4.48–4.55, with 23 listeners. "4.22" was a confidence-interval bound and must not appear as a result.
- Walloon: first author, oral at SSW 2025, poster at LT4All 2025. Felipe did **not** write the G2P converter; it was the group's rule-based converter.
- CFM:
  - built for **the data referential team** (decided 28 Oct; never "analysts"); questions in English, French or Spanish;
  - 83% → 87.5% came from validated question–SQL examples **kept separate from the 48 benchmark questions**; say so when the story is told in detail;
  - cost: "giving each task a suitable model", about 20× cheaper than o3; euro figures (~€5 vs ~€0.24) only with "Approximate figures";
  - never "prototype", never "deployed", no production users or scale;
  - don't mention the CI or deployment tooling;
  - the code belongs to CFM, and only the approved internship report is linked.
- Rover photos credit **Tati Zanichelli**. The drone in the photo was a hand-flown demonstrator, not Felipe's work. Felipe's role: propulsion and steering, motors, controllers and sensors, motion and collision-avoidance routines, and field trials. Co-author, never "first author", for the USP work.
- Only the 2014 rover publications that are listed may appear; don't add any other 2014 paper.
- CLSE: Felipe is **first author** (never "lead author").
- Titles: **LLM Evaluation Specialist (freelance)**; **Business Owner, demolition and renovation subcontracting** (Sydney).
- Robot learning: **simulation only** (LIBERO-Object, 3 tasks, Franka arm); never imply real hardware. ACT is "trained without robot pretraining" / "from scratch" (its ResNet-18 encoder starts from ImageNet). SmolVLA is fine-tuned from `lerobot/smolvla_base` (pretrained on SO-100 community data). Numbers only from the vla-vs-scratch README / `results/summary.json`. Keep the note "Code written with AI assistance (Claude); experiment design, runs and analysis by me."
- AskData: complete. Only PostgreSQL runs in Docker Compose (never "containerised" or "deployed with Docker"). Describe the behaviour as "a triage step routes each question to answer, clarify or decline", not with the README's tagline sentences. Headline result: 1 wrong answer in 32 held-out questions.
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
- **28 Oct 2026, branch `content-2026-10`:** content update from the claude.ai project (CVs and LinkedIn of 28 Oct): CFM wording, AskData finished, robot-learning page, NER removed. Felipe approved it and it was merged to `main` (live) on 28 Oct 2026, 22:45.

## Next

1. **Visual pass** on a new branch from `main` (Felipe, see Current status), then merge after Felipe's OK.
2. **CLSE paper:** when it's accepted, link it and update "Under review".
3. Possibly a short "Writing" or "Notes" section later, but only if there are real posts.
4. After each content change, check link previews with LinkedIn Post Inspector.
