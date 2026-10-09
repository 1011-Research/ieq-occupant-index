# IEQ Occupant Index: software, design artifacts, and aggregated study data

Supplementary materials for:

> Abinaya J. and Suseelan A. "The Indoor Environmental Quality Occupant Index: A Role-Tiered Tool for Channeling Anonymous Occupant Feedback into Green Building Certification Decisions." Manuscript submitted to *Intelligent Buildings International*.

This repository contains the reference implementation, the evaluated prototype build, design artifacts, and aggregated (counts-only) results of the usability study. It contains no participant quotations, session notes, or personal data. Sessions were not audio or video recorded.

## Contents

### Software

| File | What it is | Supports |
|---|---|---|
| `index.html`, `app.js` | Static, dependency-free reference implementation of the three role-tiered interfaces: occupant, administrator, and GRIHA Council. Reviewers and assessors are assigned by the Council and work within its interface. | Prototype, Use Cases |
| `IEQ_Occupant_Index_prototype.html` | Single-file build of the post-testing prototype with seeded demonstration data. Names and email addresses in the seeded team lists are placeholders. | Prototype, Discussion (Figures 7-9) |
| `01_occupant_survey.png`, `02_admin_1_results.png` to `02_admin_6_reports.png`, `03_council_1_submissions.png` to `03_council_6_reviewers.png` | Full-page screenshots of every view of the prototype build: the occupant survey, six administrator tabs, and six Council tabs. | Prototype |

### Documents

| File | What it is | Supports |
|---|---|---|
| `08_Study_Protocol.docx` | Study design, measures, severity scale, and role-specific task sets. | Evaluation Methods |
| `09_Personas.docx` | Persona cards and four-role design requirements. | Methods, Table 1 |
| `10_Information_Architecture.docx` | Information architecture, role-tiered screen flows, system architecture, and journey map. | System Design, Figures 1-2 |

### Data

| File | What it is | Supports |
|---|---|---|
| `01_codebook.csv` | The codebook: 28 deductive codes in five thematic groups and 12 inductive codes confirmed in the manual coding pass (40 analytic codes), plus 4 outcome/valence codes, with definitions. | Evaluation Methods |
| `02_code_frequency_by_role.csv` | Applications of each code by role. | Table 5 |
| `03_code_group_by_role.csv` | Applications of each code group by role. | Figures 3 and 5 |
| `04_code_cooccurrence_matrix.csv` | Code-by-code co-occurrence counts across coded segments; the diagonal holds each code's total applications. | Co-occurrence results, Figure 6 |
| `05_coding_summary.csv` | Sessions, coded segments (143), and code applications (255) by role. | Results |
| `06_heuristic_evaluation.csv` | Heuristic evaluation against Nielsen's ten heuristics. | Table 4 |
| `07_findings_disposition_log.csv` | The 64 usability findings with severity, the session codes that raised each, and disposition (shipped, deferred, or out of scope). | Results, Process lens |

### Figures

| File | What it is |
|---|---|
| `Figure1_System_architecture.png` | System architecture (manuscript Figure 1). |
| `Figure3_Sankey_code_group_to_role.png` | Code group to role flow, generated from `03_code_group_by_role.csv` (manuscript Figure 3). |
| `Figure5_Treemap_code_groups.png` | Code applications by code group, generated from `03_code_group_by_role.csv` (manuscript Figure 5). |

## Notes on the data

- **Unit of count.** A coded segment is one coded quotation. A code application is one code attached to one segment; a segment can carry several codes.
- **Co-occurrence.** Two codes co-occur when both are applied to the same segment.
- **Participant identification.** Participants are identified only by session code (OCC, ADM, CNC, and REV, numbered 01 to 05). The participant key is not included.
- **Simulated data.** All institution names, buildings, and submission figures shown in the software and prototype are simulated for design demonstration. They do not represent verified GRIHA submissions or endorsements by the named institutions.
- **Restricted data.** The written session notes (transcripts) and the coded ATLAS.ti project are not shared publicly because they contain participant responses and participants did not consent to public data sharing.

## Running the software

Open `index.html` (reference implementation) or `IEQ_Occupant_Index_prototype.html` (prototype build) directly in a browser. Neither needs a build step, a server, or an internet connection. The reference implementation holds state in memory only and resets on every page reload.

## License

The software is released under the MIT License (see `LICENSE`). The documents and data are released under CC BY 4.0.
