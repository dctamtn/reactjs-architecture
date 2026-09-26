---
name: costing-detail-prices
description: Use when implementing per-style detail prices, market prices, or sell-through for a techpack.
---

# Detail prices

Tool name: `tpDetailPrices`. One file under `server/ai/tools/`. Register it with `defineTool`.

## When it runs

The user asks for detail prices, market prices, or sell-through.

## Input

Required: `latest_teckpack_style_log_id` (non-empty string).

A numeric techpack id is that value. Do not ask for a style number when the id is already known. Optional `style_no` is for the table title only.

## Request

`GET /api/techpack-details/{id}/detail-prices`

Read the base URL and bearer token from server env. Parse the JSON with Zod. Retry a failed GET once.

## Table

One sheet. Columns, in order:

- `product_name`
- `on_shelf_date`
- `sales_price_usd`
- `sales_volume_30day`
- `sales_volume_total`
- `product_url`
- `pic_url`

Quote a text cell that contains a comma. Zero rows still return the header.

`features/costing` renders the sheet. The chat status uses the label for this fetch and does not paste the full table into the message.
