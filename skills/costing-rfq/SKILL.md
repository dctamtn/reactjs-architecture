---
name: costing-rfq
description: Use when implementing RFQ facets, the grouped RFQ summary, or line-level RFQ quotations.
---

# RFQ costing

Three tools. One file each under `server/ai/tools/`. Schemas live in `server/ai/schemas/`. Register each tool with `defineTool`.

Call them in this order when the user is filtering: facets, then summary, then details for a chosen country. A direct "show RFQ cost" can call `rfqCosts` immediately when style, customer, and department are already known.

## Shared identity

Required on every RFQ tool:

- `style_no`
- `customer_name`
- `customer_department`

Optional on every RFQ tool: `season`, `style_description`.

## rfqCostQueryParams

`GET /api/v1/techpack-details/rfq-costs/params`

Query string: `style_no`, `customer_name`, `customer_department`, and the optional fields when present.

Response `data` contains:

- `suppliers: string[]`
- `factories: string[]`
- `production_countries: string[]`

Validate that object with Zod. Return the three arrays. The chat may summarize the counts. Do not render a cost table for this tool.

## rfqCosts

`POST /api/v1/techpack-details/rfq-costs`

Optional filters besides the shared fields: `supplier`, `factory`, `prd_country`, `rfq_created_from_date`, `rfq_created_to_date`.

The tool argument is `prd_country`. The JSON body field is `prod_country`. Keep that rename.

Rows are grouped by production country. Normalize each cost and the created date to min and max. A value may arrive as a two-item array, `{ min, max }`, or a single number. A single number is both min and max.

Output columns:

- `style_number`, `customer_name`, `customer_department`, `season` when season was requested
- `production_country`
- `quotation_qty_total` (sum the quantity array)
- `supplier_count`, `factory_count`
- `cm_cost_min`, `cm_cost_max`
- `wash_cost_min`, `wash_cost_max`
- `fabric_cost_min`, `fabric_cost_max`
- `trim_cost_min`, `trim_cost_max`
- `total_fob_cost_min`, `total_fob_cost_max`
- `rfq_created_date_min`, `rfq_created_date_max`

Title: `RFQ Summary – {customer_name} · {style_no}` and ` · {season}` when season is set. Kind is `rfq`, so a row can request details. Zero rows still return the header and an empty row list.

## rfqCostDetails

`POST /api/v1/techpack-details/rfq-costs/details`

Same filters as the summary. `prd_country` is usually the production country of the selected summary row. Send it as `prod_country` in the body.

Return every field present on the quotation rows. When the list is empty, still return the known columns: `rfq_created_date`, `production_country`, `supplier`, `factory`, `quotation_qty`, `cm_cost`, `wash_cost`, `fabric_cost`, `trim_cost`, `total_fob_cost`.

Validate the backend JSON before building the table. A missing access token is an error, not an empty table.
