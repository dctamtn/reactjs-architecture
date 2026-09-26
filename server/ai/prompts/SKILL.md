---
name: costing-prompts
description: Use when writing or changing the costing system prompt in server/ai/prompts.
---

# Costing prompts

This folder stores prompt text only. No HTTP, no Zod, no provider SDK.

Read `skills/costing-chat/SKILL.md` before editing the prompt. The prompt must tell the model the same tool choice, context reuse, and empty-result rules that skill describes.

## What to add

One system prompt for the costing agent. Keep general cost-factor guidance in that prompt for questions that have no style context. Tool-backed numbers are described as "only repeat values the tool returned."

Name the five tools and the words that select them: RFQ facets, RFQ summary, RFQ details, CM/YY, detail prices. State that a numeric techpack id is `latest_teckpack_style_log_id`.

Do not paste the TPM prompt that also covers orders, techpack search, trend engine, email, or weather.

Register the prompt in the `prompts` array in this folder and update `server/registries.test.ts`.
