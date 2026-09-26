---
name: costing-cm-yy
description: Use when implementing the CM/YY cost breakdown tool or its four tables.
---

# CM/YY costing

Tool name: `tpDetailCMYY`. One file under `server/ai/tools/`. Register it with `defineTool`.

## When it runs

The user asks for CM/YY, SMV, operation steps, marker, or fabric consumption.

## Input

Required: `latest_teckpack_style_log_id` (non-empty string).

A numeric techpack id is that value. `Id=50355` becomes `"50355"`. Do not ask for a style number when this id is already known.

Optional: `style_no`, used only in table titles.

## Request

`GET /api/techpack-details/{id}/cm-yy-cost`

Read the base URL and bearer token from server env. Parse the JSON with Zod before reading `cm` and `yy`. Missing `cm` or `yy` becomes an empty object, and the four tables are still returned.

Retry a failed GET once.

## Tables

Return four sheets. Title suffix is `style_no` when present, otherwise the techpack id.

| Sheet | Source | Columns |
| --- | --- | --- |
| CM Summary | `cm.costOfMakingSummary` | `cm`, `costPerMinute`, `cutToPackSmv`, `cutToSewingSmv`, `dailyTarget`, `hourlyTarget`, `numberDirectLaborCutToPack`, `numberDirectLaborSewing`, `overhead`, `workingMinutes`, `factoryName`, `garmentType`, `productionComplexity`, `productionQuantity`, `styleNumber` |
| CM Operations | `cm.operationSteps` | `id`, `section`, `operationDescription`, `machine`, `smv`, `second`, `hourlyTarget`, `constructionNote`, `source` |
| YY Summary | `yy.mainFabricConsumption` plus `yy.markerDiagramUrl` | `cuttableFabricWidth`, `grossConsumption`, `grossConsumptionUom`, `grossLength`, `idealMarkerLength`, `markerArea`, `markerEfficiency`, `totalAllowances`, `totalPatternArea`, `markerDiagramUrl` |
| YY Panels | `yy.panels` | `id`, `panelName`, `material`, `quantity`, `height`, `areaPerPanel`, `notes` |

YY Summary is one row when `mainFabricConsumption` exists, otherwise zero rows.

If the payload contains fields outside these columns, add a fifth sheet named Raw JSON for the leftover fields. Do not drop them.

Status query label is `CM/YY`. The chat message states the total row count and points at the tables. `features/costing` renders the sheets.
