# felipe-espinosa.vercel.app

Personal site of Felipe Espinosa Orjuela: AI/ML engineer (LLM agents, generative models, evaluation).

Plain static HTML and CSS in `site/`, no build step. Vercel serves `site/` as is (see `vercel.json`).

- `site/index.html`: home page
- `site/walloon/`, `site/cfm/`, `site/askdata/`: case studies
- `site/assets/`: stylesheet, script, Archivo and Newsreader fonts (SIL Open Font License), images, audio, spectrograms
- `tools/make_spectrograms.py`: regenerates the spectrogram images from the audio
- `CLAUDE.md`: decisions, content rules and next steps

To preview locally: `python3 -m http.server -d site 8000`.
