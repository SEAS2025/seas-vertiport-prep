---
name: full-utilization-prep
description: Orchestrate parallel domain subagents for SEAS vertiport full utilization prep using kickoff_utilization and task delegation.
---

# Full utilization prep (SEAS)

## Kickoff

1. `kickoff_utilization` — optional `sprintGoal` from the user
2. For each entry in `delegateInParallel`, spawn a **parallel** `task` to that `subagent` with `taskPrompt`
3. After all complete, `get_readiness_snapshot` and write the executive synthesis

## Subagents

`regulatory`, `engineering`, `business`, `finance`, `partnerships`, `property`, `operations`

## ECC

Use `ecc__planner` for cross-domain sequencing after subagent briefs return.
Use `ecc__architect` for engineering/regulatory tradeoffs.

## Safety

No outbound email or GitHub writes without explicit user approval.
