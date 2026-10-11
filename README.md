# felipe-espinosa.vercel.app

Personal site of Felipe Espinosa Orjuela: AI/ML engineer (LLM agents, generative models, evaluation).

Plain static HTML and CSS in `site/`, no build step. Vercel serves `site/` as is (see `vercel.json`).

- `site/index.html`: home page
- `site/walloon/`, `site/cfm/`, `site/askdata/`: case studies
- `site/assets/`: stylesheet, script, Archivo font (SIL Open Font License), images, audio

To preview locally: `python3 -m http.server -d site 8000`.
