# Cursor-managed hosting

Repository layout: BDK project lives at **`seas-vertiport-prep/`** inside this repo.

## Deploy (team service account)

Requires `CURSOR_SERVICE_ACCOUNT_KEY` on the machine running deploy (never commit it).

```bash
export CURSOR_JULY_VERSION=0.2.22
run_agent_sdk() {
  env -u NODE_OPTIONS -u CURSOR_API_KEY \
    CURSOR_API_KEY_FILE=/dev/null \
    npx --yes "@cursor/bdk@$CURSOR_JULY_VERSION" "$@"
}

cd /path/to/seas-vertiport-prep   # git root of this repo
run_agent_sdk whoami --json
run_agent_sdk validate --dir seas-vertiport-prep
run_agent_sdk deploy \
  --dir seas-vertiport-prep \
  --ref cursor/seas-vertiport-agent-c133 \
  --cursor-events-repo SEAS2025/seas-vertiport-prep \
  --cursor-events-repo SEAS2025/Airline-Management-System
```

## First message after deploy

```text
Start full utilization prep for Phase 1 three-site network: kickoff_utilization,
then delegate to all domain subagents in parallel, then synthesize.
```

## Dashboard

**Deployed Agents** → `seas-vertiport-prep` → Sessions / Playground.
