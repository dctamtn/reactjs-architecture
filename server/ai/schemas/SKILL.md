---
name: costing-schemas
description: Use when adding Zod schemas for costing tool inputs, tool outputs, or techpack API payloads.
---

# Costing schemas

Put shared Zod objects here. Tools import them. `parseUntrusted` is for a value the model produced. `defineTool` already parses tool input and output.

Add a schema per boundary, not one schema for a whole feature:

| Schema | Validates |
| --- | --- |
| RFQ identity and filters | Model tool arguments |
| RFQ facet payload | `GET .../rfq-costs/params` |
| RFQ grouped row | `POST .../rfq-costs` before min/max normalization |
| RFQ summary row | Tool output after normalization |
| RFQ detail row | `POST .../rfq-costs/details` |
| CM/YY payload | `GET .../cm-yy-cost`, with `cm` and `yy` optional objects |
| CM/YY sheet rows | The four tool outputs, plus Raw JSON when extra fields exist |
| Detail-price row | `GET .../detail-prices` and the tool output |
| Techpack id | Non-empty `latest_teckpack_style_log_id` |

Cost ranges from RFQ summary accept a two-item array, `{ min, max }`, or a single number. Normalize after the parse. Do not use `z.any()`.

A schema file does not call `fetch`.
