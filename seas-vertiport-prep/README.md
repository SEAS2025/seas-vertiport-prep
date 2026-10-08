# seas-vertiport-prep

BDK agent that prepares **South East Aerial Systems** vertiport / UAM work for
full operational utilization. It seeds your
[Airline-Management-System](https://github.com/SEAS2025/Airline-Management-System)
modular docs into each session and mounts
[ECC](https://github.com/affaan-m/ECC) (`vendor/ecc`) for planner/architect
and related harness skills.

## Quick start

```bash
cd seas-vertiport-prep
npm run check
npx @cursor/bdk validate --dir .
npx @cursor/bdk info --dir . --json
npx @cursor/bdk serve --dir . --mode single --dev
# http://127.0.0.1:3000/playground
```

Model turns require a Cursor API key (`CURSOR_API_KEY` or `npx @cursor/bdk login`).

## Domain subagents

| Subagent | Domain |
| --- | --- |
| `regulatory` | FAA / Part 135 / certification |
| `engineering` | Vertiport design & drawings |
| `business` | Strategy & launch |
| `finance` | Models & funding |
| `partnerships` | Utilities & municipal outreach |
| `property` | Sites, zoning, airspace |
| `operations` | GOM, training, checklists |

Orchestrator calls `kickoff_utilization`, then delegates to each subagent in
parallel via the `task` tool.

## Tools

| Tool | Purpose |
| --- | --- |
| `kickoff_utilization` | Start sprint; return parallel subagent prompts |
| `get_readiness_snapshot` | Seven workstreams + anchor doc presence + KV status |
| `list_seas_documents` | List/filter `seas-business/` files |
| `update_workstream` | Persist status, notes, next actions |

## Sync business docs from GitHub

```bash
git clone --depth 1 https://github.com/SEAS2025/Airline-Management-System.git /tmp/ams
cp -r "/tmp/ams/South East Aerial Systems Modular System/" bot/sandbox/workspace/seas-business/
```

## Deploy

See `@cursor/bdk` deploy skill. GitHub channel watches `SEAS2025/Airline-Management-System`
and this repo when `cursorAccount` is enabled on hosting.
