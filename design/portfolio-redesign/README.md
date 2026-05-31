# Ashmeet Portfolio Redesign - Browser Prototype

This is the no-Figma browser implementation of the design-first goal.

## What It Covers

- Responsive route-like screens for Home, About, Projects, Project Detail, Resume, Certifications, and Contact.
- Legacy portfolio content preserved from `legacy/index.html` and `legacy/script.js`.
- Reusable design primitives in `styles.css`: tokens, buttons, chips, cards, fields, modal, panels, filters, and nav.
- Data-driven rendering in `script.js` for projects, certifications, skills, and project detail views.
- Browser-testable interactions: project filters/search/sort, certificate preview modal, contact success state, responsive nav.

## Run

From the repository root:

```powershell
python -m http.server 4173 --bind 127.0.0.1
```

Then open:

```text
http://127.0.0.1:4173/design/portfolio-redesign/index.html
```

## Next.js Handoff Notes

- Move route renderers into App Router pages.
- Move arrays into `data/*.json` and add typed loaders.
- Replace prototype contact toast with the planned SendGrid API route.
- Replace resume placeholder with `public/resume/ashmeet-singh-resume.pdf`.
