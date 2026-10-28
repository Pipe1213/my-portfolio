# Portfolio: felipe-espinosa.vercel.app

Working notes for Claude Code. They record what has been built and decided, the rules every change must follow, and what comes next. Update this file whenever a decision changes.
Owner: Felipe Espinosa Orjuela. The fuller private record lives in the claude.ai project "Job Application Things" (`claude/PORTFOLIO_DESIGN_2026-10-11.md`, `claude/PROJECT_CONTEXT.md`).

## Current status (update this first)

*Last updated 29 Oct 2026.*

- **29 Oct: branch `visual-2026-10` merged to `main` (live), approved by Felipe.** Full visual redesign with the Hallmark skill, copy verbatim. The locked system is `design.md` at the repo root; read it before any visual change. Summary in "Visual identity" below. Felipe chose the palette (warm graphite with project colours as marks) and the reverse-chronological work order. One wording change, approved as part of the redesign: the colophon now names the new faces.
  - Link previews (`og*.png`) regenerated on 29 Oct in the new design (dark theme, project-colour rule, Hanken Grotesk, Newsreader, Plex Mono), same wording as before. The favicon is unchanged.
  - Hallmark's working files (`.hallmark/`, `site/**/.hallmark/`) and `.claude/launch.json` are excluded in `.git/info/exclude`; never commit them.

- **28 Oct, 22:45: `content-2026-10` merged to `main` (live), approved by Felipe.** Three content commits:
  1. `6f7c375` text fixes: CFM is built for the **data referential team** (not "analysts"); "giving each task a suitable model"; context examples **kept separate from the benchmark**; CLSE **first author**; rover adds LIBS, ultrasonic sensors, Raspberry Pi and Arduino; titles **LLM Evaluation Specialist (freelance)** and **Business Owner, demolition and renovation subcontracting**; tools line; NER line removed; new `og-cfm.png`.
  2. `69de9e3` AskData finished: `/askdata` rewritten (6 steps, results table, safety, limits, light/dark architecture SVG, 4 demo videos); both screenshots with the old wrong answer deleted; new `og-askdata.png`. Adds shared styles (`.cs-sec`, `.tbl`, `.steps`, `.vid`, `.chart`) and in-view video playback in `site.js`.
  3. `70316b9` robot learning: `/robot-learning` page, home band **first** in Selected work, hero link, `.w-rob` colour world, `og-robot-learning.png`, sitemap; case-study prev/next follow the home order.
- **28 Oct: visual pass requested; done on 29 Oct (see above). The known points below were all fixed in it:** The content and numbers are final; change layout, type and colour freely, but not the wording or numbers without asking Felipe. Known points to look at:
  - `.w-rob` is a **placeholder plum** (light `#F0E7F1/#7A3B8C/#5F4A64/#DCC8DF`, dark `#2B1D30/#DDA8EC/#C9B6CE/#4A3350`, contrast checked ≥ 6:1). Felipe may pick another; keep ≥ 5.3:1 and no navy.
  - The video play button sits top-left over the video; on the AskData demo it covers the app's logo.
  - The success-rate chart (inline SVG in `/robot-learning`): the ACT "55.4%" label crowds the line; on phones the chart scrolls sideways at a fixed min width.
  - Table and step styles are deliberately plain.
- After merge: LinkedIn Post Inspector on `/`, `/askdata`, `/robot-learning`; Felipe points the LinkedIn Featured cards to `/robot-learning` and `/askdata`.

## How the site works

- Plain static HTML, CSS and JS in `site/`. No framework and no build step. Vercel serves `site/` as is (`vercel.json`: framework null, cleanUrls, redirects from the old Next.js routes).
- Pages: `site/index.html` (home), `site/robot-learning/`, `site/cfm/`, `site/walloon/`, `site/askdata/` (case studies), `site/404.html`.
- `site/assets/site.css` holds all styles (its first lines are the Hallmark stamp and waivers; it imports `tokens.css` and `base.css`, the Hallmark scaffold); `site/assets/site.js` handles the theme toggle, audio (one clip at a time), the spectrogram playhead, the Walloon voice switch, and the demo videos (play while ≥ 50% in view, click or button toggles, never autoplay under `prefers-reduced-motion`).
- Demo videos live in `site/assets/video/` (H.264 MP4 + `-poster.jpg`, each < 400 KB), converted from the project READMEs' GIFs. The robot clips are 512×256 simulator renders: left/right must be named in the caption.
- Fonts are self-hosted in `site/assets/fonts/` (OFL licences included); don't link to Google Fonts:
  - Hanken Grotesk, variable, latin and latin-ext WOFF2 (from Fontsource 5.1.0), for heads, labels and controls;
  - Newsreader, normal and italic WOFF subsets (fontTools, from google/fonts), for body text;
  - IBM Plex Mono 400 and 500 WOFF2 (Fontsource 5.1.0), for figures only: scores, dates, costs, table numbers.
- Spectrograms: `site/assets/spec/spec-<clip>.webp` are white alpha masks, regenerated with `python tools/make_spectrograms.py site/assets/audio/*.mp3`. CSS colours them (`.spec` uses `mask: var(--m)`) and the playhead is the CSS variable `--p`, set by `site.js` on `timeupdate`.
- Link previews: `site/og.png` (home), plus `og-walloon.png`, `og-cfm.png`, `og-askdata.png` and `og-robot-learning.png` (1200×630, in the site's dark theme: a sheet with the project's colour rule, Hanken Grotesk title, Newsreader result line; rendered with headless Chrome from a temporary page served from `site/`, then deleted).
- Local preview: `python3 -m http.server -d site 8765`. That server has no clean URLs, so `/cfm` becomes `/cfm/`.
- Test with Playwright before every push:
  - viewports 390, 768 and 1440 px, in both dark and light;
  - no horizontal overflow and no console errors;
  - fonts loaded and audio plays with the playhead advancing;
  - the voice switch updates scores and clips;
  - the theme persists after a reload.
- Workflow: work on a branch, push it, check the Vercel preview, and merge to `main` (which is live) **only after Felipe says OK**.

## Visual identity (decided 29 Oct 2026; the full system is `design.md`)

- A dated research record: warm graphite paper, near-black ink, ruled lines in two weights (1px rows, 2px heads), square corners, no shadows. Dark mode is required (Felipe uses dark everywhere); the site follows the system and has a toggle stored in localStorage. **No navy, anywhere.**
- Each project keeps its colour, but only as a mark, set by a class that scopes `--color-accent`:

  | Project | Class | Colour |
  |---|---|---|
  | Robot learning | `.w-rob` | plum |
  | AskData | `.w-ask` | rust |
  | CFM | `.w-cfm` | teal |
  | Walloon | `.w-wal` | Walloon yellow (ochre on light paper) |
  | Rover | `.w-rov` | field green |

  The colour shows only as the year in the home index, the 2px rule on top of a sheet, one chart series or bar, a playing control, list markers and step numerals. Never a band or a fill behind text. Every pair is 6:1 or better in both modes.
- Home: the hero is a ruled index of the five projects (year, name, place) on a pale sheet; projects below are splits of text and evidence on sheets; Walloon is the one dark ink band. Case studies: a spec list on a sheet, then sections under 2px rules; tables, charts and videos on sheets.
- Type: Hanken Grotesk heads, Newsreader body at 19px, IBM Plex Mono for figures. Labels are the body face, a step smaller, never capitals.
- The signature element is real spectrograms of Felipe's own Walloon model audio, drawn pale and filled with the yellow playhead as they play. They appear only where they can be played: the two clips on the home page, and the large screen above the scores on `/walloon`. Never use one as decoration.
- Video controls sit beside the caption, never over the frame.
- Motion: cross-document View Transitions only (each home project and title has `view-transition-name: rob-band` / `rob-title`, and the same for `ask`, `cfm` and `wal`, morphing into the case-study header and h1); demo videos loop only while in view. No scroll reveals. Everything is off under `prefers-reduced-motion`. **Don't add more animation.**
- Footer colophon: "Set in Hanken Grotesk, Newsreader and IBM Plex Mono. The spectrograms are computed from my models' own audio. Built by hand, no framework." The tab icon is spectrogram bars in yellow-to-coral.
- Hallmark checks: `node ~/.agents/skills/hallmark/scripts/sloplint.mjs site/assets/site.css --genre editorial --render --url http://localhost:8765/ …` (needs `puppeteer-core`, pointed to by `HALLMARK_PUPPETEER`; check through the local server, since the pages use root-relative paths). Keep it at 0 FAIL; waivers live in the stamp at the top of `site.css`.

## Content decisions (decided)

- Hero: name, "AI/ML Engineer", "LLM agents, generative models and evaluation" (matches the LinkedIn headline), location, work authorisation and availability ("available now"), links to the five projects (Robot learning first), and the portrait on the side. **No summary-style sentence. No CV download.** CVs go out only on request.
- The page balances two kinds of reader:
  - ML research / robotics (Lane A): robot learning, Walloon TTS, publications, the rover;
  - applied AI engineering (Lane B): CFM agent, AskData.
- Selected work order (29 Oct): **newest first, Robot learning, AskData, CFM, Walloon**, the same in the hero index (which ends with the 2014 rover). Case-study previous/next links follow this order. The NER line was removed (28 Oct).
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

- **29 Oct 2026, branch `visual-2026-10`:** redesign with the Hallmark skill (Almanac theme repainted warm graphite, project colours as marks, Hanken Grotesk and IBM Plex Mono, reverse-chronological work); `legacy.css` and Archivo removed; system locked in `design.md`.

## Next

1. **After the og merge:** LinkedIn Post Inspector on `/`, `/askdata`, `/robot-learning` so the previews refresh.
2. **CLSE paper:** when it's accepted, link it and update "Under review".
3. Possibly a short "Writing" or "Notes" section later, but only if there are real posts.
4. After each content change, check link previews with LinkedIn Post Inspector.
