# MSPD · Project page

Static project page for **"Directing Open-Ended Evolution in Artificial Life via Multi-Scale Path Divergence"** — Akhtyrchenko, Katsnelson, Ustyuzhanin.

- **Paper (Zenodo):** https://zenodo.org/records/20705579
- **Live page:** https://omniscale-ai.github.io/mspd-alife/

## Local preview

```bash
# any static server works
python3 -m http.server 8000
# then open http://localhost:8000/
```

## Layout

- `index.html` — single-page site (Bulma + KaTeX for formulas)
- `static/videos/` — substrate clips, branch divergence, frustration, MSPD-optimized rollouts
- `static/images/` — pipeline panels, evolution-of-evolution diagram, frustration landscape, real-data figures
- `static/css/` and `static/js/` — Bulma scaffolding from the Nerfies template

## Credits

Page design adapted from the [Nerfies project page](https://github.com/nerfies/nerfies.github.io).
Licensed under [CC BY-SA 4.0](http://creativecommons.org/licenses/by-sa/4.0/).
