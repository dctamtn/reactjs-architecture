---
name: costing-http
description: Use when implementing POST /api/chat for the costing chatbot.
---

# Chat endpoint

`chatEndpoint` is `POST /api/chat`. This folder is the HTTP entry. It authenticates the user, validates the body, and calls the costing workflow.

## Request

Validate the JSON body with Zod before use. Reject a body that does not parse. The handler requires a user id. A missing user is unauthorized.

Pass `userId` into tool context. Do not trust a user id sent only as a free-text field if the session already has one.

## Response

Stream status from the workflow: `initializing`, `querying`, `streaming`, `completed`, or the tool error. Include validated tables for `features/costing`. Do not stream a provider key, a bearer token, or the raw unparsed techpack payload.

## Not this handler

The browser does not call the techpack RFQ or CM/YY URLs. Those calls stay inside the tools. Do not mount an LLM provider in a Vite client plugin.
