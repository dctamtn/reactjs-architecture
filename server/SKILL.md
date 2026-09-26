---
name: costing-server
description: Use when editing server code for the costing chatbot. Points at the skill for the folder being changed.
---

# Costing server

Browser code does not import this tree. Read the folder skill before editing that folder.

| Folder | Skill |
| --- | --- |
| `server/ai/prompts` | `server/ai/prompts/SKILL.md` |
| `server/ai/tools` | `server/ai/tools/SKILL.md` |
| `server/ai/schemas` | `server/ai/schemas/SKILL.md` |
| `server/ai/workflows` | `server/ai/workflows/SKILL.md` |
| `server/ai/agents` | `server/ai/agents/SKILL.md` |
| `server/ai/providers` | `server/ai/providers/SKILL.md` |
| `server/http` | `server/http/SKILL.md` |

Feature behavior for those files is in `skills/costing-chat/SKILL.md`, `skills/costing-rfq/SKILL.md`, `skills/costing-cm-yy/SKILL.md`, and `skills/costing-detail-prices/SKILL.md`.

## Env

Add costing secrets only in `readServerEnv`.

| Variable | Use |
| --- | --- |
| Techpack API base URL | Host for RFQ, CM/YY, and detail-price paths. Server-only. |
| Techpack access token | `Authorization: Bearer` on those calls. Required. A missing token throws. |
| Provider API key | Model call in `server/ai/providers`. No default in source. |

TPM reads the techpack host from `NEXT_PUBLIC_TECHPACK_DOMAIN`. Do not repeat that. A `NEXT_PUBLIC_` or `VITE_` name is visible to the browser. Do not commit token values, and do not copy keys that appear in TPM source.

`server/index.ts` re-exports the registries. Register new costing entries in the folder that owns them, not by constructing them in the composition root.
