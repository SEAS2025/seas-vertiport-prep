---
name: full-utilization-prep
description: Run a structured SEAS vertiport business prep cycle using workspace docs, readiness tools, and ECC planner or architect subagents.
---

# Full utilization prep (SEAS)

Use when the user wants launch readiness, gap analysis, or operational prep
for the vertiport network.

## Steps

1. **Baseline** — `get_readiness_snapshot`. Note missing anchor docs.
2. **Inventory** — `list_seas_documents` with filters (`vertiport`, `Submission`, `Part135`, etc.).
3. **Plan** — Invoke `ecc__planner` (or `ecc__architect` for design/regulatory tradeoffs) with:
   - Current snapshot JSON summary
   - User goal (launch date, funding, certification, site, partner)
   - Constraint: only cite paths under `seas-business/`
4. **Execute doc work** — Read/update files in workspace; prefer small, reviewable edits.
5. **Track** — `update_workstream` for each area touched; set `blocked` with reason when external dependency exists.
6. **Close** — Restate weekly checklist and external asks (letters, permits, utility studies).

## ECC picks

| Need | ECC contribution |
| --- | --- |
| Phased roadmap | `ecc__planner` |
| System / ops architecture | `ecc__architect` |
| Manual or HTML doc quality | `ecc__doc-updater` |
| Outreach copy in letters | `ecc__article-writing` or main agent with doc context |
| Research on standards | `ecc__deep-research` skill if available |

## Freeze line

Do not send real emails, post to GitHub, or file regulatory submissions without
explicit user approval after showing draft text.
