# IEQ Occupant Index: software, design artifacts, and aggregated study data

Supplementary materials for:

> Abinaya J. and Suseelan A. "The Indoor Environmental Quality Occupant Index: A Role-Tiered Tool for Channeling Anonymous Occupant Feedback into Green Building Certification Decisions." Manuscript submitted to *Intelligent Buildings International*.

This archive contains the reference implementation, the evaluated prototype build, design artifacts, and aggregated (counts-only) results of the usability study. It contains no participant quotations, session notes, or personal data. Sessions were not audio or video recorded.

## Contents

| Path | What it is | Supports |
|---|---|---|
| `reference_implementation/` | Static, dependency-free reference implementation of the three role-tiered interfaces (occupant, administrator, and GRIHA Council; reviewers and assessors are assigned by the Council and work within its interface). MIT License. | Prototype, Use Cases |
| `prototype_build/IEQ_Occupant_Index_prototype.html` | Single-file build of the post-testing prototype with seeded demonstration data. Open in a browser. Names and email addresses in the seeded team lists are placeholders. | Prototype, Discussion (Figures 7-9) |
| `prototype_screens/` | Full-page screenshots of every view of the prototype build: the occupant survey, six administrator tabs, and six Council tabs. | Prototype |
| `documents/08_Study_Protocol.docx` | Study design, measures, severity scale, and role-specific task sets. | Evaluation Methods |
| `documents/09_Personas.docx` | Persona cards and four-role design requirements. | Methods, Table 1 |
| `documents/10_Information_Architecture.docx` | Information architecture, role-tiered screen flows, system architecture, and journey map. | System Design, Figures 1-2 |
| `data/01_codebook.csv` | The codebook: 28 deductive codes in five thematic groups and 12 inductive codes confirmed in the manual coding pass (40 analytic codes), plus 4 outcome/valence codes, with definitions. | Evaluation Methods |
| `data/02_code_frequency_by_role.csv` | Applications of each code by role. | Table 5 |
| `data/03_code_group_by_role.csv` | Applications of each code group by role. | Figures 3 and 5 |
| `data/04_code_cooccurrence_matrix.csv` | Code-by-code co-occurrence counts across coded segments; the diagonal holds each code's total applications. | Co-occurrence results, Figure 6 |
| `data/05_coding_summary.csv` | Sessions, coded segments (143), and code applications (255) by role. | Results |
| `data/06_heuristic_evaluation.csv` | Heuristic evaluation against Nielsen's ten heuristics. | Table 4 |
| `data/07_findings_disposition_log.csv` | The 64 usability findings with severity, the session codes that raised each, and disposition (shipped, deferred, or out of scope). | Results, Process lens |
| `figures/` | Figure 1 (system architecture), and Figures 3 (Sankey) and 5 (treemap) generated from `data/03_code_group_by_role.csv`. | Figures 1, 3 and 5 |

## Notes on the data

- **Unit of count.** A coded segment is one coded quotation. A code application is one code attached to one segment; a segment can carry several codes.
- **Co-occurrence.** Two codes co-occur when both are applied to the same segment.
- **Participant identification.** Participants are identified only by session code (OCC, ADM, CNC, and REV, numbered 01 to 05). The participant key is not included.
- **Simulated data.** All institution names, buildings, and submission figures shown in the prototype are simulated for design demonstration. They do not represent verified GRIHA submissions or endorsements by the named institutions.
- **Restricted data.** The written session notes (transcripts) and the coded ATLAS.ti project are not shared publicly because they contain participant responses and participants did not consent to public data sharing.

## Running the software

Open `reference_implementation/index.html` or `prototype_build/IEQ_Occupant_Index_prototype.html` directly in a browser. You can also serve the folder locally:

```bash
python3 -m http.server 8000
```

## License

The software is released under the MIT License (see `reference_implementation/LICENSE`). The documents and data are released under CC BY 4.0.
