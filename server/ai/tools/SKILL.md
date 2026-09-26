---
name: costing-tools
description: Use when adding a costing tool under server/ai/tools.
---

# Costing tools

One tool per file. Register it with `defineTool` from this folder and append it to `tools`. Update `server/registries.test.ts` when the list is no longer empty.

Read the matching feature skill before writing the file:

| Tool | Skill |
| --- | --- |
| `rfqCostQueryParams`, `rfqCosts`, `rfqCostDetails` | `skills/costing-rfq/SKILL.md` |
| `tpDetailCMYY` | `skills/costing-cm-yy/SKILL.md` |
| `tpDetailPrices` | `skills/costing-detail-prices/SKILL.md` |

## Rules for every tool

- Input and output schemas live in `server/ai/schemas/`. `defineTool` parses both.
- Parse the techpack JSON with Zod before mapping columns. Do not annotate the payload as `any`.
- Send `prd_country` to the RFQ POST body as `prod_country`.
- Read the API base URL and bearer token from `readServerEnv`. A missing token throws.
- Do not read `import.meta.env` or a `VITE_` variable.
- Do not import this folder from `src/`.

The TPM tools stream CSV through the chat channel and persist documents. Here, return the validated table from `execute`. The chat endpoint streams status. `features/costing` renders the table.
