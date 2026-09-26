---
name: costing-chat
description: Use when implementing or changing the costing chatbot, including which costing tool runs, how context is reused, and how results are shown.
---

# Costing chat

Read this before editing costing chat behavior. Then read the skill for the tool you touch: `skills/costing-rfq/SKILL.md`, `skills/costing-cm-yy/SKILL.md`, or `skills/costing-detail-prices/SKILL.md`.

The behavior comes from the TPM chatbot. Implement it behind this app's server boundary. Do not copy orders, techpack search, trend engine, email, weather, RFQ creation, or the techpack costing screens.

## Who owns what

`features/chat` owns the conversation and status text. `features/costing` owns the tables. A chat component does not call the techpack API. The server workflow calls it and returns validated rows.

## Which tool

| User intent | Tool |
| --- | --- |
| RFQ filters, suppliers, factories, production countries | `rfqCostQueryParams` |
| RFQ cost grouped by production country | `rfqCosts` |
| Line-level quotations, or details for one grouped row | `rfqCostDetails` |
| CM/YY, SMV, operation steps, marker, fabric consumption | `tpDetailCMYY` |
| Detail prices, market prices, sell-through | `tpDetailPrices` |
| General "what affects cost?" with no style context | No tool. Explain factors. Do not invent a price. |

A number returned to the user must come from a tool result. If the tool returns no rows, say so and still return an empty table.

## Context

Reuse fields already present on the selected techpack or RFQ row. Do not ask the user to type them again.

`latest_teckpack_style_log_id` and a numeric techpack id are the same value. When the user gives `Id=50355` or `techpack ID 50355`, pass `50355`. Do not ask for a style number in that case.

`style_no` is optional on CM/YY and detail prices. It is required on the RFQ tools, together with `customer_name` and `customer_department`. If one of those three is missing and not on the selected row, ask once.

For RFQ details, take `prd_country` from the selected grouped row when the user does not name a country.

## Status

Each tool reports `initializing`, then `querying`, then `streaming` or `completed`. Failures carry the tool name and the error message. The chat shows that status. The full table goes to the costing feature, not into a long chat message.

## Server path

```
POST /api/chat
  -> costing workflow
    -> defineTool
      -> techpack HTTP API with a server-only token
```

The browser sends the chat request through `apiClient`. It does not send the techpack bearer token.
