# mercenomics-site

The website for **Mercenomics**, which researches the outsourcing of military and security work to private firms: private military and security companies, military contracting, mercenaries and protection markets.

Live at [mercenomics.org](https://mercenomics.org).

## What this repository is

Plain static HTML and one stylesheet, served by GitHub Pages. No build step, no framework, no JavaScript, no database, no forms, no external requests, no cookies, no tracking.

Each page sits in its own folder so the addresses stay clean.

| Address | File |
| --- | --- |
| `/` | `index.html` |
| `/data/` | `data/index.html` |
| `/research/` | `research/index.html` |
| `/sources/` | `sources/index.html` |
| `/glossary/` | `glossary/index.html` |
| `/corrections/` | `corrections/index.html` |
| `/about/` | `about/index.html` |
| `/about/founder/` | `about/founder/index.html` |
| `/about/projects/` | `about/projects/index.html` |
| any unknown address | `404.html` |

`style.css` holds the whole look. `favicon.png` is the mark. `CNAME` carries the custom domain once DNS is pointed.

## Editing

Open any `index.html` and change the text. There is nothing to compile. A commit to `main` publishes within a minute or two.

Links between pages are written relative to the page they sit in, so the site works both on the custom domain and on the github.io preview address. A page one folder deep uses `../`, a page two folders deep uses `../../`.

## Licence

Site code and text: copyright 2026 Kazi Affnann Azom, all rights reserved. See `LICENSE`.

Datasets published by Mercenomics: CC BY 4.0. Government records referenced here keep their own terms.

## Contact

mercenomics@gmail.com
