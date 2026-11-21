# Clinicly brand book

Clinicly is a fictional brand made as a demonstration: a clinic app: appointments and booking, time zones, permissions, forms with errors, Arabic right-to-left usage examples. It is not a real company. Read the book at https://sztheory.github.io/clinicly-brand/.

Version 0.3. Each release is a git tag (`v0.3`); `main` is the latest.

## What is here

- `index.html` and `clinicly-brand-book.html`: the brand book; `clinicly-one-page.html`: the one-page summary; PDFs of both.
- `BRAND.md`: the brand in plain text for people and language models. `brand.json`: every rule as structured data. `tokens.json`: design tokens (DTCG).
- `assets/`: logos, fonts and images, with rights in the book's asset list.
- `records/`: fictional data for screens and flows (`records/clinicly/clinicly-records.json`), with a validator (`node records/<brand>/check-records.mjs`).
- `FABLEBOOK-MAPPING-GUIDE.md`: how the records map to a component catalog's stories, scenarios and journeys.
- `clinicly-brand.zip`: the whole book as one download.

## Using it from another project

Pin a commit instead of copying files in: keep the repository URL, tag and full commit SHA in a lock file, clone into a gitignored cache folder, check out that SHA, and verify it. In CI, cache that folder keyed on the lock file. To take an update, move the pin to the new tag in a pull request.

Fonts are under the SIL Open Font License; photographs carry their own licenses and credits in the book.
