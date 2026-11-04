# woletheanalyst.github.io

Portfolio of Kolawole Odewusi, Business Analyst | AI Evaluation Specialist. Built with [Astro](https://astro.build) and deployed to GitHub Pages.

## Develop

```bash
npm ci
npm run dev      # http://localhost:4321
npm run build    # static output in dist/
npm run preview
```

Requires Node 22.12 or later.

## Structure

- `src/data/` holds project metadata and every figure used in charts, each annotated with its source (report page or CSV).
- `src/pages/work/<slug>/` holds one case study per project.
- `src/components/` holds charts (server-rendered SVG/HTML, no chart library), screenshot figures, provenance labels and verification notes.
- `src/assets/` holds the original project screenshots. They are optimised at build time and never edited.

## Content rules

- Visuals are labelled **Original screenshot**, **Recreated from report figures, page X**, or **Calculated from the project CSV**.
- Figures that don't reconcile between sources are flagged on the page, not silently corrected.
- No metrics, employers or credentials are published without confirmed evidence.

## Deploy

`.github/workflows/deploy.yml` builds and deploys on pushes to `main`. Repository Settings → Pages → Source must be set to **GitHub Actions**.
