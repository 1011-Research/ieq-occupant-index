# IEQ Occupant Index

A reference prototype of a role-tiered post-occupancy feedback system that channels
anonymous occupant comfort ratings into green building certification decisions under
GRIHA (Green Rating for Integrated Habitat Assessment), India's national green
building rating system.

This repository accompanies the research-through-design case study:

> Abinaya J. and Suseelan A. "The Indoor Environmental Quality Occupant Index: A Role-Tiered Tool for
> Channeling Anonymous Occupant Feedback into Green Building Certification Decisions."
> Manuscript submitted to *Intelligent Buildings International*.

## What this is

A single-page, dependency-free web application implementing the three role-tiered
interfaces described in the paper (reviewers and assessors are assigned by the Council
and work within the Council interface):

- **Occupant** — a five-domain, seven-point comfort survey (acoustic, spatial,
  thermal, visual, indoor air quality), anonymous and pooled.
- **Administrator** — a domain-by-domain dashboard combining pooled occupant
  ratings with an illustrative weighted scoring schema, badge recognition, and a
  "send to Council" action.
- **GRIHA Council** — a portfolio queue of submissions with accept/return actions
  and a drift-check view comparing the schema weighting against pooled evidence.

## What this is not

This is a **reference implementation for research transparency**, not the
production system used in the paper's usability evaluation, and not connected to
any real GRIHA database. All data shown (response counts, building and institution
names, submission records) is illustrative demo data generated for this repository.
State is held in memory only and resets on every page reload; there is no backend,
no database, and no persistence.

## Running it

No build step or dependencies are required.

```bash
git clone <this-repo-url>
cd ieq-occupant-index
python3 -m http.server 8000
# open http://localhost:8000 in a browser
```

Or simply open `index.html` directly in a browser (some browsers restrict local
script loading from `file://` URLs; serving it locally as above avoids that).

## Files

- `index.html` — markup and styling
- `app.js` — application logic and state (vanilla JavaScript, no framework)
- `LICENSE` — MIT License

## Citation

If you use or reference this prototype, please cite the accompanying paper (full
citation to be updated on publication).

## License

MIT License. See `LICENSE`.
